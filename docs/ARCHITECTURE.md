# TÀI LIỆU KIẾN TRÚC HỆ THỐNG — DỰ ÁN MỘT NGÀY CÓ CHÚA

- **Tên ứng dụng:** MỘT NGÀY CÓ CHÚA
- **Slogan:** Cùng Chúa lớn lên mỗi ngày.
- **Múi giờ chuẩn:** `Asia/Ho_Chi_Minh` (GMT+7)

---

## 1. Kiến Trúc Tổng Thể (Giai Đoạn A)

Ứng dụng được thiết kế theo kiến trúc **Mobile-first Responsive Web App + PWA** trên nền tảng:
- **Frontend & SSR/ISR:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Database, Auth & Row Level Security (RLS):** Supabase (PostgreSQL)
- **Triển khai:** Vercel

### Nguyên tắc an toàn nội dung tôn giáo & bảo mật:
1. **Không tự bịa câu Kinh Thánh / Không giả danh lời trực tiếp của Chúa:** Mọi đoạn Kinh Thánh phải liên kết khóa ngoại tới bảng `bible_sources` đã xác minh (bản dịch Nhóm Phiên Dịch Các Giờ Kinh Phụng Vụ - CGKPV).
2. **Quy trình kiểm duyệt 4 bước bắt buộc:** `Draft → Review → Approved → Published`. Người dùng thường chỉ truy vấn được các bản ghi có `status = 'published'`.
3. **Không suy đoán lịch phụng vụ:** Nếu một ngày chưa có bản ghi `published` đã xác minh, hệ thống hiển thị thông báo trang trọng thay vì tự sinh nội dung giả.
4. **Bảo mật Nhật ký cầu nguyện (`prayer_journals`):** Bật RLS nghiêm ngặt (`auth.uid() = user_id` và `is_private = TRUE`), chỉ chủ sở hữu mới có quyền đọc/ghi.

---

## 2. Cấu Trúc Thư Mục Dự Án

```text
Một ngày có Chúa/
├── docs/
│   └── ARCHITECTURE.md                  # Tài liệu phân tích kiến trúc & CSDL (Giai đoạn A)
├── public/
│   ├── manifest.json                    # Cấu hình PWA trên điện thoại
│   └── images/chibi/                    # Thư viện 10 minh họa Chúa Giêsu Chibi & Các Thánh + Fallback
├── supabase/
│   └── migrations/
│       └── 0001_initial_schema.sql      # Toàn bộ 12 bảng CSDL + Module TNTT + Indexes + RLS Policies
├── src/
│   ├── app/
│   │   ├── globals.css                  # Cấu hình giao diện sáng/tối & chống tràn ngang
│   │   ├── layout.tsx                   # Root Layout, font tiếng Việt, SEO & Navigation
│   │   ├── page.tsx                     # Trang chủ hoàn chỉnh (Giai đoạn B)
│   │   ├── kinh-thanh/page.tsx          # Trang Kinh Thánh & nguồn bản dịch đã xác minh
│   │   ├── thanh-ca/page.tsx            # Thư viện Thánh ca 9 chủ đề hợp pháp
│   │   ├── cau-nguyen/page.tsx          # Góc cầu nguyện (3 kinh căn bản + Nhật ký riêng tư)
│   │   ├── kham-pha/page.tsx            # Thư viện 10 hình Chibi & Kiến trúc Thiếu Nhi Thánh Thể
│   │   └── quan-tri/page.tsx            # Trang quản trị & quy trình duyệt nội dung (RBAC)
│   ├── components/
│   │   ├── app-navigation.tsx           # Thanh điều hướng Desktop + Mobile Bottom Bar + Dark Mode
│   │   ├── chibi-image.tsx              # Component ảnh hỗ trợ lazy loading & fallback tự động
│   │   ├── home-devotional-view.tsx     # Giao diện Trang chủ Lời Chúa Mỗi Ngày
│   │   └── share-card-modal.tsx         # Trình tạo thiệp ảnh PNG Lời Chúa sắc nét
│   ├── data/
│   │   └── verified-demo-data.ts        # Dữ liệu mẫu được đánh dấu rõ ràng, nguyên văn CGKPV
│   ├── lib/
│   │   ├── date-vn.ts                   # Xử lý ngày giờ theo múi giờ Asia/Ho_Chi_Minh
│   │   └── supabase.ts                  # Kết nối Supabase an toàn qua biến môi trường
│   └── types/
│       └── catholic.ts                  # Định nghĩa kiểu dữ liệu TypeScript toàn hệ thống
├── .env.example                         # Mẫu cấu hình biến môi trường (không chứa khóa bí mật)
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 3. Thiết Kế Cơ Sở Dữ Liệu (12 Bảng Chuẩn + Module Mở Rộng TNTT)

File migration đầy đủ tại `supabase/migrations/0001_initial_schema.sql` gồm:
1. `users`: Đồng bộ với `auth.users`, quản lý vai trò (`user`, `catechist`, `reviewer`, `admin`).
2. `user_profiles`: Hồ sơ người dùng, tên Thánh, giáo xứ, cờ xác nhận đồng ý của phụ huynh (`parental_consent_verified`).
3. `bible_sources`: Nguồn bản dịch Kinh Thánh hợp pháp và thông tin chuẩn ấn (`Imprimatur`).
4. `scripture_passages`: Các đoạn Kinh Thánh nguyên văn đã kiểm duyệt.
5. `liturgical_calendar`: Lịch phụng vụ Công giáo Rôma tại Việt Nam.
6. `daily_devotionals`: Bản ghi Lời Chúa mỗi ngày (`UNIQUE(publish_date)`), suy niệm 100–150 từ, lời cầu nguyện 40–80 từ.
7. `devotional_images`: Thư viện 10 chủ đề hình ảnh Chibi kèm metadata quyền sử dụng và `fallback_url`.
8. `hymns`: Thư viện Thánh ca theo 9 chủ đề kèm nguồn phát hợp pháp.
9. `favorite_devotionals`: Danh sách Lời Chúa yêu thích của từng người dùng.
10. `prayer_journals`: Nhật ký cầu nguyện riêng tư (bảo vệ bằng RLS chỉ chủ sở hữu mới đọc/sửa được).
11. `user_preferences`: Tùy chọn giao diện Sáng/Tối, cỡ chữ, giờ nhắc nhở theo `Asia/Ho_Chi_Minh`.
12. `content_audit_logs`: Nhật ký kiểm duyệt chuyển trạng thái (`Draft → Review → Approved → Published`).
- Mở rộng: Bảng `tntt_lessons` chuẩn bị sẵn cho 4 ngành **Ấu Nhi, Thiếu Nhi, Nghĩa Sĩ, Hiệp Sĩ**.


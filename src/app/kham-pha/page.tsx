import React from "react";
import { DEVOTIONAL_IMAGES } from "@/data/verified-demo-data";
import { ChibiImage } from "@/components/chibi-image";
import {
  AlertTriangle,
  Compass,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const TNTT_BRANCHES = [
  {
    code: "au_nhi",
    name: "Ngành Ấu Nhi (6–8 tuổi)",
    motto: "Khẩu hiệu: Ngoan",
    colorClass:
      "border-emerald-300 bg-emerald-50/70 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-200",
    modules: ["Học kinh căn bản", "Hoa thiêng / Việc tốt mỗi ngày", "Truyện tranh Kinh Thánh minh họa"],
  },
  {
    code: "thieu_nhi",
    name: "Ngành Thiếu Nhi (9–12 tuổi)",
    motto: "Khẩu hiệu: Hy Sinh",
    colorClass:
      "border-skysoft-300 bg-skysoft-50/70 text-skysoft-600 dark:border-skysoft-500/30 dark:bg-skysoft-950/30 dark:text-skysoft-200",
    modules: ["Trò chơi giáo lý tương tác", "Suy niệm Lời Chúa ngắn", "Sinh hoạt đội nhóm"],
  },
  {
    code: "nghia_si",
    name: "Ngành Nghĩa Sĩ (13–15 tuổi)",
    motto: "Khẩu hiệu: Chinh Phục",
    colorClass:
      "border-amber-300 bg-amber-50/70 text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200",
    modules: ["Tìm hiểu Kinh Thánh sâu hơn", "Hoạt động bác ái xứ đoàn", "Thực hành nhân đức"],
  },
  {
    code: "hiep_si",
    name: "Ngành Hiệp Sĩ (16–17 tuổi) & Huynh Trưởng",
    motto: "Khẩu hiệu: Dấn Thân • Phụng Sự",
    colorClass:
      "border-rose-300 bg-rose-50/70 text-rose-800 dark:border-rose-500/30 dark:bg-rose-950/30 dark:text-rose-200",
    modules: ["Quản lý bài học của Huynh trưởng", "Kiểm duyệt nội dung giáo lý", "Hoạt động tông đồ"],
  },
];

export default function KhamPhaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Phần 1: Thư viện 10 Hình Ảnh Chibi Công Giáo (Kiểm tra QA) */}
      <section className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sungold-100 text-sungold-600 dark:bg-sungold-500/20 dark:text-sungold-300">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Kiểm Tra Trực Quan 10 File SVG Chibi (Giai Đoạn B)
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đánh giá trung thực chất lượng đồ họa của từng file SVG hiện tại
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 text-xs text-amber-900 dark:border-amber-500/40 dark:bg-slate-800 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p>
            <strong>Đánh giá QA về chất lượng đồ họa SVG hiện tại:</strong> Cả
            10 file SVG dưới đây hiện chỉ là{" "}
            <strong>hình vector hình học cơ bản (SVG Placeholder)</strong> được
            ghép từ các khối tròn, elip và đường cong đơn giản. Tuy có sử dụng
            tông màu pastel nhưng{" "}
            <strong>
              chưa đạt độ tinh xảo, dễ thương và biểu cảm của tranh vẽ Chibi
              Công giáo thực thụ
            </strong>
            .
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEVOTIONAL_IMAGES.map((img, index) => (
            <article
              key={img.id}
              className="flex flex-col justify-between rounded-2xl border border-cream-200 bg-cream-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div>
                <div className="overflow-hidden rounded-xl border border-cream-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-950">
                  <ChibiImage
                    src={img.imageUrl}
                    fallbackSrc={img.fallbackUrl}
                    alt={img.description}
                    className="h-44 w-full object-contain"
                  />
                </div>
                <span className="mt-3 inline-block rounded-full bg-sage-100 px-2.5 py-0.5 text-[11px] font-bold text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
                  #{index + 1} • Chủ đề: {img.theme}
                </span>
                <h2 className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                  {img.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                  <strong>Nhận xét QA:</strong> {img.artStyleAssessment}
                </p>
              </div>

              <div className="mt-3 border-t border-cream-200 pt-2.5 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <p>
                  <strong>Quyền sử dụng:</strong> {img.usageRights}
                </p>
                <p className="truncate">
                  <strong>File:</strong> <code>{img.imageUrl}</code>
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Phần 2: Kiến trúc Module Mở Rộng Thiếu Nhi Thánh Thể (TNTT) */}
      <section className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
            <Compass className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Kiến Trúc Mở Rộng: Phong Trào Thiếu Nhi Thánh Thể (TNTT)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Đã chuẩn bị sẵn bảng CSDL <code>tntt_lessons</code> (Chưa triển
              khai tính năng ở MVP)
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          {TNTT_BRANCHES.map((branch) => (
            <div
              key={branch.code}
              className={`rounded-2xl border p-5 ${branch.colorClass}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold">{branch.name}</h3>
                <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-bold dark:bg-slate-900/80">
                  {branch.motto}
                </span>
              </div>
              <ul className="mt-3 list-inside list-disc space-y-1 text-xs font-medium">
                {branch.modules.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sage-200 bg-sage-50/70 p-4 text-xs text-slate-700 dark:border-sage-500/30 dark:bg-slate-800 dark:text-slate-200">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" />
          <div>
            <p className="font-bold">
              Chính Sách Bảo Vệ Trẻ Em & Kiểm Duyệt Giáo Lý (Bắt Buộc):
            </p>
            <p className="mt-1 leading-relaxed">
              1. Hệ thống <strong>không tạo tài khoản trẻ em</strong> hoặc thu
              thập thông tin cá nhân của trẻ khi chưa có cơ chế bảo vệ dữ liệu
              và sự đồng ý xác thực của phụ huynh.
              <br />
              2. Mọi bài học TNTT đều phải được{" "}
              <strong>Giáo lý viên hoặc Người phụ trách kiểm duyệt</strong>{" "}
              trước khi hiển thị.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

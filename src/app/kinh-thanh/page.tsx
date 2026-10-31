import React from "react";
import {
  PUBLISHED_DEMO_DEVOTIONALS,
  VERIFIED_BIBLE_SOURCE,
} from "@/data/verified-demo-data";
import { AlertTriangle, BookOpen, ShieldAlert } from "lucide-react";

export default function KinhThanhPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sungold-100 text-sungold-600 dark:bg-sungold-500/20 dark:text-sungold-300">
            <BookOpen className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Kinh Thánh & Kiểm Kê Tình Trạng Xác Minh Bản Quyền
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Báo cáo trung thực tình trạng bản dịch, chuẩn ấn (Imprimatur) và
              quyền sử dụng hiện tại
            </p>
          </div>
        </div>

        {/* Cảnh báo rõ trạng thái CHƯA XÁC MINH */}
        <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50/90 p-4 dark:border-amber-500/40 dark:bg-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            <span>
              Tình Trạng Nguồn Bản Dịch Hiện Tại:{" "}
              {VERIFIED_BIBLE_SOURCE.isVerified
                ? "ĐÃ XÁC MINH"
                : "CHƯA XÁC MINH (UNVERIFIED DEMO)"}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-700 dark:text-slate-300">
            <strong>Tên nguồn tham chiếu:</strong> {VERIFIED_BIBLE_SOURCE.name}
          </p>
          <p className="mt-1 text-xs text-slate-700 dark:text-slate-300">
            <strong>Tình trạng chuẩn ấn (Imprimatur):</strong>{" "}
            {VERIFIED_BIBLE_SOURCE.imprimaturInfo}
          </p>
          <p className="mt-1 text-xs text-amber-800 dark:text-amber-300">
            <strong>Tình trạng quyền sử dụng:</strong>{" "}
            {VERIFIED_BIBLE_SOURCE.copyrightNotice}
          </p>
        </div>

        {/* Danh sách các đoạn Kinh Thánh mẫu và phân loại trạng thái */}
        <div className="mt-6 space-y-4">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">
            Bảng Đối Chiếu 3 Bản Ghi Mẫu (Phân Biệt Demo / Chờ Duyệt / Xuất Bản)
          </h2>

          {PUBLISHED_DEMO_DEVOTIONALS.map((item) => (
            <article
              key={item.scripture.id}
              className="rounded-2xl border border-cream-200 bg-cream-50/60 p-5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm font-bold text-sungold-600 dark:text-sungold-300">
                  {item.scripture.bookName} ({item.scripture.referenceLabel}) —
                  Ngày: {item.publishDate}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-amber-100 px-3 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                    Nguồn gốc: {item.dataOrigin} (Chưa xác minh bản quyền)
                  </span>
                  <span className="rounded-full bg-slate-200 px-3 py-0.5 text-[11px] font-bold text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                    Workflow: {item.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <blockquote className="mt-3 font-serif text-base italic leading-relaxed text-slate-800 dark:text-slate-100">
                {item.scripture.passageText}
              </blockquote>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Tình trạng xác minh: <code>{item.verificationState}</code> •{" "}
                {item.scripture.verifiedBy}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-xs text-slate-700 dark:border-rose-500/30 dark:bg-slate-800 dark:text-slate-300">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
          <p>
            <strong>Quy tắc bắt buộc trước khi lên Production:</strong> Không sử
            dụng các bản văn mẫu chưa xác minh ở trên làm nội dung chính thức.
            Chỉ các bản văn đã được nhập từ nguồn có phép chuẩn ấn (Imprimatur)
            và xác nhận quyền sử dụng hợp pháp mới được gán{" "}
            <code>is_verified = true</code> trong CSDL.
          </p>
        </div>
      </div>
    </div>
  );
}

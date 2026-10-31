"use client";

import React from "react";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import { AlertTriangle, Lock, ShieldAlert } from "lucide-react";

export default function QuanTriPage() {
  // Bảo mật bắt buộc: Khi chưa kết nối Supabase Auth & RBAC thực tế từ Server,
  // TUYỆT ĐỐI KHÔNG cho phép bất kỳ thao tác quản trị hay chuyển đổi vai trò giả lập nào trên Client.
  const hasVerifiedAdminSession = false;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <section
        aria-labelledby="admin-lock-heading"
        className="rounded-3xl border border-rose-300 bg-white p-8 shadow-card dark:border-rose-500/40 dark:bg-slate-900"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300">
          <Lock className="h-8 w-8" />
        </div>

        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
            <ShieldAlert className="h-4 w-4" />
            Đã Khóa Thao Tác Quản Trị (Chưa Xác Thực Supabase Auth)
          </span>

          <h1
            id="admin-lock-heading"
            className="mt-3 text-xl font-extrabold text-slate-800 dark:text-slate-100 sm:text-2xl"
          >
            Khu Vực Quản Trị & Kiểm Duyệt Nội Dung (`/quan-tri`)
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Theo yêu cầu bảo mật nghiêm ngặt: khi ứng dụng{" "}
            <strong>chưa kết nối Supabase Auth và phân quyền RBAC thực tế</strong>
            , hệ thống{" "}
            <strong>
              vô hiệu hóa hoàn toàn mọi thao tác thêm, sửa, xóa, duyệt và xuất
              bản
            </strong>{" "}
            và không cho phép chuyển đổi quyền giả lập phía trình duyệt (Client
            Bypass).
          </p>
        </div>

        {/* Trạng thái kiểm tra hệ thống xác thực */}
        <div className="mt-6 rounded-2xl border border-cream-200 bg-cream-50/80 p-5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
          <h2 className="font-bold text-slate-800 dark:text-slate-100">
            Trạng Thái Kiểm Tra Bảo Mật Hiện Tại:
          </h2>
          <ul className="mt-2.5 space-y-1.5">
            <li>
              • <strong>Kết nối biến môi trường Supabase:</strong>{" "}
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                {isSupabaseConfigured
                  ? "Đã cấu hình URL/Key"
                  : "CHƯA CẤU HÌNH (isSupabaseConfigured = false)"}
              </span>
            </li>
            <li>
              • <strong>Phiên đăng nhập Supabase Auth (`auth.uid()`):</strong>{" "}
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                {hasVerifiedAdminSession
                  ? "Đã xác thực"
                  : "CHƯA XÁC THỰC (Không có JWT Session)"}
              </span>
            </li>
            <li>
              • <strong>Quyền thao tác Quản trị (CRUD / Publish):</strong>{" "}
              <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                BỊ CHẶN HOÀN TOÀN (Read/Write Locked)
              </span>
            </li>
          </ul>
        </div>

        {/* Các nút chức năng bị khóa hoàn toàn (disabled) */}
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-5 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span>
              Các thao tác quản trị dưới đây đang bị khóa cứng (`disabled`) cho
              đến khi triển khai Supabase Auth ở Giai đoạn C:
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2.5">
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-600"
            >
              + Tạo bản nháp mới (Đã khóa)
            </button>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-600"
            >
              Chuyển trạng thái Review / Approved (Đã khóa)
            </button>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-400 dark:bg-slate-800 dark:text-slate-600"
            >
              Xuất bản Published (Đã khóa)
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="rounded-2xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sage-700"
          >
            Quay Về Trang Chủ
          </Link>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { HYMN_LIBRARY } from "@/data/verified-demo-data";
import { HymnCategory } from "@/types/catholic";
import { ChibiImage } from "@/components/chibi-image";
import { ExternalLink, Music, ShieldCheck } from "lucide-react";

const CATEGORIES: { key: "all" | HymnCategory; label: string }[] = [
  { key: "all", label: "Tất cả (9 chủ đề)" },
  { key: "ta_on", label: "Tạ ơn" },
  { key: "cau_nguyen", label: "Cầu nguyện" },
  { key: "binh_an", label: "Bình an" },
  { key: "gia_dinh", label: "Gia đình" },
  { key: "duc_me", label: "Đức Mẹ" },
  { key: "giang_sinh", label: "Giáng Sinh" },
  { key: "mua_chay", label: "Mùa Chay" },
  { key: "phuc_sinh", label: "Phục Sinh" },
  { key: "thieu_nhi", label: "Thiếu nhi" },
];

export default function ThanhCaPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | HymnCategory
  >("all");

  const filteredHymns =
    selectedCategory === "all"
      ? HYMN_LIBRARY
      : HYMN_LIBRARY.filter((item) => item.category === selectedCategory);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-skysoft-100 text-skysoft-600 dark:bg-skysoft-500/20 dark:text-skysoft-300">
              <Music className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
                Thư Viện Thánh Ca Công Giáo Hợp Pháp
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Không tự tải lại hoặc sao chép bản thu âm, lời bài hát có bản
                quyền — kết nối nguồn nghe chính thức
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
            <ShieldCheck className="h-4 w-4" />
            Bản quyền minh bạch
          </span>
        </div>

        {/* Bộ lọc 9 chủ đề */}
        <div className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`rounded-2xl px-3.5 py-2 text-xs font-semibold transition ${
                selectedCategory === cat.key
                  ? "bg-skysoft-600 text-white shadow-sm"
                  : "bg-cream-100 text-slate-700 hover:bg-cream-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Danh sách bài hát */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredHymns.map((hymn) => (
            <article
              key={hymn.id}
              className="flex flex-col justify-between rounded-2xl border border-cream-200 bg-cream-50/50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div>
                <div className="flex items-center gap-3">
                  <ChibiImage
                    src={hymn.thumbnailUrl}
                    alt={hymn.title}
                    className="h-16 w-16 shrink-0 rounded-2xl bg-white object-contain p-1.5 shadow-sm dark:bg-slate-900"
                  />
                  <div>
                    <span className="inline-block rounded-full bg-skysoft-100 px-2.5 py-0.5 text-[11px] font-bold text-skysoft-600 dark:bg-skysoft-500/20 dark:text-skysoft-300">
                      {hymn.categoryLabelVi}
                    </span>
                    <h2 className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">
                      {hymn.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  <p>
                    <strong>Tác giả:</strong> {hymn.composer}
                  </p>
                  <p>
                    <strong>Nguồn phát:</strong> {hymn.legalSourceName}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    <strong>Quyền sử dụng:</strong> {hymn.usageRights}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-cream-200 pt-3 dark:border-slate-700">
                <span className="text-xs font-medium text-slate-500">
                  Thời lượng: {hymn.durationLabel}
                </span>
                <a
                  href={hymn.listenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-skysoft-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-skysoft-500"
                >
                  <span>Mở Liên Kết Nghe</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}


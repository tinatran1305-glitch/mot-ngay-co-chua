"use client";

import React, { useEffect, useState } from "react";
import { TRADITIONAL_PRAYERS } from "@/data/verified-demo-data";
import { PrayerJournalEntry } from "@/types/catholic";
import { getVietnamDateIso } from "@/lib/date-vn";
import {
  AlertTriangle,
  HeartHandshake,
  Lock,
  PlusCircle,
  Trash2,
} from "lucide-react";

const STORAGE_KEY = "mncc_private_prayer_journal";

export default function CauNguyenPage() {
  const [title, setTitle] = useState("");
  const [intentionTag, setIntentionTag] = useState("Xin ơn bình an");
  const [prayerContent, setPrayerContent] = useState("");
  const [entries, setEntries] = useState<PrayerJournalEntry[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setEntries(JSON.parse(saved));
      }
    } catch {
      setEntries([]);
    }
  }, []);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !prayerContent.trim()) return;

    const newEntry: PrayerJournalEntry = {
      id: `pj-${Date.now()}`,
      title: title.trim(),
      prayerContent: prayerContent.trim(),
      intentionTag,
      prayerDate: getVietnamDateIso(),
      isPrivate: true,
      isTemporaryLocal: true,
      createdAt: new Date().toISOString(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota errors
    }
    setTitle("");
    setPrayerContent("");
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((item) => item.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* Phần 1: Các Kinh Truyền Thống Đã Kiểm Duyệt */}
      <section className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
            <HeartHandshake className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-slate-100">
              Góc Cầu Nguyện & Kinh Căn Bản Công Giáo
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Bản kinh Phụng vụ chuẩn đã kiểm duyệt nội dung và quyền sử dụng
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TRADITIONAL_PRAYERS.map((prayer) => (
            <article
              key={prayer.id}
              className="flex flex-col justify-between rounded-2xl border border-cream-200 bg-cream-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-sage-700 dark:text-sage-300">
                    {prayer.title}
                  </h2>
                  <span className="text-xs italic text-slate-500">
                    {prayer.latinTitle}
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-line font-serif text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                  {prayer.content}
                </p>
              </div>
              <div className="mt-4 border-t border-cream-200 pt-3 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-400">
                <p>
                  <strong>Nguồn:</strong> {prayer.sourceVerification}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Phần 2: Nhật Ký Cầu Nguyện Riêng Tư */}
      <section className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
              Nhật Ký Cầu Nguyện Riêng Tư
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mọi lời cầu nguyện cá nhân đều bảo mật riêng tư mặc định (Row
              Level Security) — không công khai dưới bất kỳ hình thức nào.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-3 py-1 text-xs font-bold text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
            <Lock className="h-3.5 w-3.5" />
            Riêng tư 100%
          </span>
        </div>

        {/* Thông báo rõ khi chưa đăng nhập tài khoản */}
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-slate-700 dark:border-amber-500/30 dark:bg-slate-800 dark:text-slate-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <p>
            <strong>Lưu ý trạng thái chưa đăng nhập:</strong> Hiện bạn chưa đăng
            nhập tài khoản đồng bộ đám mây. Các lời cầu nguyện bạn viết dưới đây{" "}
            <strong>
              chỉ được lưu tạm cục bộ trên trình duyệt của thiết bị này
            </strong>{" "}
            và sẽ mất nếu bạn xóa dữ liệu trình duyệt.
          </p>
        </div>

        <form onSubmit={handleSaveEntry} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="prayer-title"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Tiêu đề lời cầu nguyện
              </label>
              <input
                id="prayer-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Cầu nguyện cho gia đình bình an..."
                className="mt-1.5 w-full rounded-2xl border border-cream-300 bg-cream-50/50 px-4 py-2.5 text-sm text-slate-800 focus:border-sage-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label
                htmlFor="prayer-intention"
                className="block text-xs font-bold text-slate-700 dark:text-slate-300"
              >
                Ý chỉ cầu nguyện
              </label>
              <select
                id="prayer-intention"
                value={intentionTag}
                onChange={(e) => setIntentionTag(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-cream-300 bg-cream-50/50 px-4 py-2.5 text-sm text-slate-800 focus:border-sage-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="Xin ơn bình an">Xin ơn bình an</option>
                <option value="Tạ ơn Chúa">Tạ ơn Chúa</option>
                <option value="Cầu cho Gia đình">Cầu cho Gia đình</option>
                <option value="Phó thác công việc & học tập">
                  Phó thác công việc & học tập
                </option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="prayer-body"
              className="block text-xs font-bold text-slate-700 dark:text-slate-300"
            >
              Tâm tình cầu nguyện với Chúa
            </label>
            <textarea
              id="prayer-body"
              rows={3}
              required
              value={prayerContent}
              onChange={(e) => setPrayerContent(e.target.value)}
              placeholder="Lạy Chúa Giêsu, hôm nay con xin dâng lên Chúa..."
              className="mt-1.5 w-full rounded-2xl border border-cream-300 bg-cream-50/50 p-4 text-sm text-slate-800 focus:border-sage-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sage-700"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Lưu Vào Nhật Ký Riêng Tư (Lưu Tạm Thiết Bị)</span>
          </button>
        </form>

        {/* Danh sách các lời cầu nguyện đã lưu */}
        <div className="mt-6 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Lời cầu nguyện đã lưu trên thiết bị ({entries.length})
          </h3>
          {entries.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-cream-300 p-6 text-center text-xs text-slate-500 dark:border-slate-700">
              Bạn chưa có ghi chép cầu nguyện nào. Hãy viết tâm tình đầu tiên
              của bạn ở trên.
            </p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-cream-200 bg-cream-50/60 p-4 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {entry.title}
                    </span>
                    <span className="rounded-full bg-sage-100 px-2.5 py-0.5 text-[11px] font-semibold text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
                      {entry.intentionTag}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Ngày: {entry.prayerDate} • Lưu tạm riêng tư
                    </span>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-700 dark:text-slate-200">
                    {entry.prayerContent}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="rounded-xl p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-slate-700"
                  aria-label="Xóa lời cầu nguyện này"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}


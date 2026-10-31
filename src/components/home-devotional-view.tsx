"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DEVOTIONAL_IMAGES,
  PUBLISHED_DEMO_DEVOTIONALS,
  getPublishedDevotionalForDate,
} from "@/data/verified-demo-data";
import {
  formatVietnamFullDate,
  getVietnamDateIso,
} from "@/lib/date-vn";
import { ChibiImage } from "@/components/chibi-image";
import { ShareCardModal } from "@/components/share-card-modal";
import {
  AlertCircle,
  AlertTriangle,
  Bookmark,
  BookOpen,
  Calendar,
  Compass,
  ExternalLink,
  Heart,
  HeartHandshake,
  Info,
  Music,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
} from "lucide-react";

export function HomeDevotionalView() {
  const [currentVnDate, setCurrentVnDate] = useState<string>(() =>
    getVietnamDateIso()
  );
  const [strictOfficialOnly, setStrictOfficialOnly] = useState<boolean>(false);
  const [isSavedFavorite, setIsSavedFavorite] = useState<boolean>(false);
  const [amenCounted, setAmenCounted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Kiểm tra bản ghi gốc trong kho dữ liệu cho ngày đang chọn để phân biệt rõ:
  // - Bản ghi Demo đang ở trạng thái 'published' (chỉ hiển thị khi bật chế độ Demo)
  // - Bản ghi đang ở trạng thái 'approved' hoặc 'review' (bị chặn xuất bản)
  const rawRecordForDate = PUBLISHED_DEMO_DEVOTIONALS.find(
    (item) => item.publishDate === currentVnDate
  );

  // Chỉ lấy bản ghi được phép hiển thị
  const activeDevotional =
    rawRecordForDate && rawRecordForDate.status !== "published"
      ? null
      : getPublishedDevotionalForDate(currentVnDate, !strictOfficialOnly);

  useEffect(() => {
    if (!activeDevotional) return;
    try {
      const raw = localStorage.getItem("mncc_favorite_ids");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      setIsSavedFavorite(ids.includes(activeDevotional.id));
    } catch {
      setIsSavedFavorite(false);
    }
  }, [activeDevotional]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentVnDate]);

  const showToast = (msg: string) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  const handleToggleFavorite = () => {
    if (!activeDevotional) return;
    try {
      const raw = localStorage.getItem("mncc_favorite_ids");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      let updated: string[];
      if (ids.includes(activeDevotional.id)) {
        updated = ids.filter((id) => id !== activeDevotional.id);
        setIsSavedFavorite(false);
        showToast("Đã bỏ lưu khỏi danh sách Lời Chúa yêu thích.");
      } else {
        updated = [...ids, activeDevotional.id];
        setIsSavedFavorite(true);
        showToast(
          "Đã lưu tạm Lời Chúa vào danh sách yêu thích trên thiết bị này!"
        );
      }
      localStorage.setItem("mncc_favorite_ids", JSON.stringify(updated));
    } catch {
      showToast("Không thể lưu trạng thái trên trình duyệt hiện tại.");
    }
  };

  const handleSpeakDevotional = () => {
    if (!activeDevotional) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      showToast(
        "Trình duyệt của bạn chưa hỗ trợ đọc giọng nói trực tiếp."
      );
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `Lời Chúa hôm nay. Chủ đề: ${activeDevotional.themeTitle}. Trích ${activeDevotional.scripture.bookName}, ${activeDevotional.scripture.referenceLabel}. ${activeDevotional.scripture.passageText}. Suy niệm: ${activeDevotional.reflectionBody}. Lời cầu nguyện: ${activeDevotional.prayerText}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "vi-VN";
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-24 pt-5 sm:px-6 md:pb-16">
      {toastNotice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 right-4 z-50 max-w-sm rounded-2xl border border-sage-300 bg-sage-700 px-4 py-3 text-sm font-medium text-white shadow-lg md:bottom-6"
        >
          {toastNotice}
        </div>
      )}

      {/* Băng rôn phân biệt rõ: Dữ liệu Demo vs Dữ liệu Đã Kiểm Duyệt vs Dữ liệu Đã Xuất Bản */}
      <div className="mb-5 flex flex-col justify-between gap-3 rounded-2xl border border-amber-300 bg-amber-50/95 p-4 text-xs text-slate-800 shadow-sm dark:border-amber-500/40 dark:bg-slate-800/95 dark:text-slate-200 lg:flex-row lg:items-center">
        <div className="flex flex-col items-start gap-2">
          <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-900 dark:text-amber-300">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              Dữ Liệu Demo — Chưa Xác Minh Bản Quyền
            </span>
          </span>
          <p className="leading-relaxed">
            Nội dung đang hiển thị là{" "}
            <strong>Dữ liệu Demo phục vụ kiểm thử giao diện Giai đoạn B</strong>.
            Các trích dẫn Kinh Thánh và Thánh ca hiện{" "}
            <strong>chưa qua xác minh giấy phép bản quyền/chuẩn ấn chính thức</strong>{" "}
            và không được sử dụng làm nội dung Production.
          </p>
        </div>

        {/* Bộ chọn ngày & Kiểm tra phân tách 3 trạng thái dữ liệu */}
        <div className="flex flex-wrap items-center gap-2">
          <label
            htmlFor="vn-date-picker"
            className="text-[11px] font-semibold text-slate-700 dark:text-slate-300"
          >
            Ngày (VN):
          </label>
          <input
            id="vn-date-picker"
            type="date"
            value={currentVnDate}
            onChange={(e) => {
              if (e.target.value) setCurrentVnDate(e.target.value);
            }}
            className="rounded-xl border border-cream-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <button
            type="button"
            onClick={() => setStrictOfficialOnly((prev) => !prev)}
            className={`rounded-xl border px-2.5 py-1 text-[11px] font-semibold transition ${
              strictOfficialOnly
                ? "border-rose-600 bg-rose-600 text-white"
                : "border-cream-300 bg-white text-slate-700 hover:bg-cream-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            {strictOfficialOnly
              ? "Chế độ: Chỉ nhận dữ liệu Chính thức"
              : "Chế độ: Cho phép hiển thị Demo"}
          </button>
        </div>
      </div>

      {/* 2. Thanh thông tin Ngày hiện tại theo múi giờ Asia/Ho_Chi_Minh & Bộ lọc kiểm thử trạng thái */}
      <section
        aria-label="Thông tin ngày phụng vụ theo múi giờ Việt Nam"
        className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-cream-200 bg-white/90 px-5 py-4 shadow-card dark:border-slate-800 dark:bg-slate-900/90"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage-100 text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base font-bold text-slate-800 dark:text-slate-100 sm:text-lg">
                {formatVietnamFullDate(currentVnDate)}
              </h1>
              <span className="rounded-full bg-skysoft-100 px-2.5 py-0.5 text-[11px] font-semibold text-skysoft-600 dark:bg-skysoft-500/20 dark:text-skysoft-300">
                Múi giờ: Asia/Ho_Chi_Minh (GMT+7)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {activeDevotional?.liturgicalDay
                ? `${activeDevotional.liturgicalDay.title}`
                : "Chưa có dữ liệu lịch phụng vụ đã xuất bản cho ngày này"}
            </p>
          </div>
        </div>

        {/* Nút kiểm thử 3 trạng thái dữ liệu khác nhau: Demo Published vs Approved (Chưa xuất bản) vs Review (Chờ duyệt) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-medium text-slate-500 dark:text-slate-400">
            Kiểm thử trạng thái:
          </span>
          <button
            type="button"
            onClick={() => {
              setStrictOfficialOnly(false);
              setCurrentVnDate("2026-10-31");
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              currentVnDate === "2026-10-31" && !strictOfficialOnly
                ? "bg-sage-600 text-white shadow-sm"
                : "bg-cream-100 text-slate-700 hover:bg-cream-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            31/10 (Demo Published)
          </button>
          <button
            type="button"
            onClick={() => {
              setStrictOfficialOnly(false);
              setCurrentVnDate("2026-11-01");
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              currentVnDate === "2026-11-01"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-cream-100 text-slate-700 hover:bg-cream-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            01/11 (Approved • Chưa xuất bản)
          </button>
          <button
            type="button"
            onClick={() => {
              setStrictOfficialOnly(false);
              setCurrentVnDate("2026-11-02");
            }}
            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
              currentVnDate === "2026-11-02"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-cream-100 text-slate-700 hover:bg-cream-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            02/11 (Review • Chờ duyệt)
          </button>
        </div>
      </section>

      {/* TRƯỜNG HỢP CHẶN HIỂN THỊ: Bản ghi chưa Published hoặc đang bật chế độ chỉ nhận dữ liệu Chính thức */}
      {!activeDevotional ? (
        <section
          aria-live="polite"
          className="rounded-3xl border border-amber-300 bg-amber-50/80 p-8 text-center shadow-card dark:border-amber-500/40 dark:bg-slate-900"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
            <AlertCircle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {rawRecordForDate
              ? `Bản Ghi Ngày ${currentVnDate} Đang Ở Trạng Thái "${rawRecordForDate.status.toUpperCase()}" (Chưa Xuất Bản)`
              : `Chưa Có Dữ Liệu Chính Thức Đã Xác Minh Cho Ngày ${currentVnDate}`}
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {rawRecordForDate ? (
              <>
                Hệ thống phân biệt nghiêm ngặt giữa{" "}
                <strong>Dữ liệu đang chờ kiểm duyệt (`review`)</strong>,{" "}
                <strong>Dữ liệu đã duyệt nội bộ (`approved`)</strong> và{" "}
                <strong>Dữ liệu đã xuất bản (`published`)</strong>. Bản ghi ngày{" "}
                {currentVnDate} hiện ở trạng thái{" "}
                <code>{rawRecordForDate.status}</code> nên tuyệt đối không được
                hiển thị công khai cho người dùng.
              </>
            ) : (
              <>
                Khi tắt chế độ dữ liệu Demo (`strictOfficialOnly = true`), hệ
                thống từ chối dùng dữ liệu mẫu chưa xác minh và hiển thị thông
                báo minh bạch này thay vì tự tạo nội dung tôn giáo giả.
              </>
            )}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStrictOfficialOnly(false);
                setCurrentVnDate("2026-10-31");
              }}
              className="rounded-2xl bg-sage-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sage-700"
            >
              Quay Lại Bản Ghi Mẫu UI (31/10/2026)
            </button>
          </div>
        </section>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Cột trái (5/12): 3. Banner Chúa Giêsu Chibi & 8. Cụm nút Lưu, Chia sẻ, Nghe */}
            <div className="flex flex-col gap-5 lg:col-span-5">
              <article className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="relative bg-gradient-to-b from-cream-50 to-skysoft-50 p-4 dark:from-slate-800 dark:to-slate-900">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-1.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-sage-700 shadow-sm dark:bg-slate-900/90 dark:text-sage-300">
                      <Sparkles className="h-3.5 w-3.5 text-sungold-500" />
                      Chủ đề: {activeDevotional.chibiImage.theme}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                      Dữ liệu Demo • Chưa xác minh
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-cream-200/60 bg-white shadow-inner dark:border-slate-700 dark:bg-slate-950">
                    <ChibiImage
                      src={activeDevotional.chibiImage.imageUrl}
                      fallbackSrc={activeDevotional.chibiImage.fallbackUrl}
                      alt={activeDevotional.chibiImage.description}
                      priority={true}
                      className="h-64 w-full object-contain sm:h-72"
                    />
                  </div>
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-extrabold text-slate-800 dark:text-slate-100">
                    {activeDevotional.themeTitle}
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Minh họa: <strong>{activeDevotional.chibiImage.title}</strong>{" "}
                    — {activeDevotional.chibiImage.usageRights}
                  </p>

                  {/* 8. Cụm nút Lưu, Chia sẻ, Nghe */}
                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={handleToggleFavorite}
                      className={`flex flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-2.5 text-xs font-semibold transition ${
                        isSavedFavorite
                          ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/40 dark:bg-rose-500/20 dark:text-rose-200"
                          : "border-cream-200 bg-cream-50 text-slate-700 hover:bg-cream-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          isSavedFavorite ? "fill-rose-600 text-rose-600" : ""
                        }`}
                      />
                      <span>{isSavedFavorite ? "Đã lưu" : "Lưu lại"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsShareModalOpen(true)}
                      className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-sage-200 bg-sage-50 px-3 py-2.5 text-xs font-semibold text-sage-700 transition hover:bg-sage-100 dark:border-sage-500/30 dark:bg-sage-500/20 dark:text-sage-200"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Chia sẻ thiệp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSpeakDevotional}
                      className={`flex flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-2.5 text-xs font-semibold transition ${
                        isSpeaking
                          ? "border-sungold-400 bg-sungold-100 text-sungold-600 dark:bg-sungold-500/20 dark:text-sungold-300"
                          : "border-skysoft-200 bg-skysoft-50 text-skysoft-600 hover:bg-skysoft-100 dark:border-skysoft-500/30 dark:bg-skysoft-500/20 dark:text-skysoft-200"
                      }`}
                    >
                      {isSpeaking ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                      <span>{isSpeaking ? "Dừng đọc" : "Nghe đọc"}</span>
                    </button>
                  </div>
                </div>
              </article>

              {/* 7. Card Thánh Ca Gợi Ý Trong Ngày */}
              <article
                aria-labelledby="daily-hymn-heading"
                className="rounded-3xl border border-cream-200 bg-gradient-to-br from-skysoft-50 via-white to-cream-50 p-5 shadow-card dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-skysoft-100 text-skysoft-600 dark:bg-skysoft-500/20 dark:text-skysoft-300">
                      <Music className="h-4 w-4" />
                    </span>
                    <div>
                      <h3
                        id="daily-hymn-heading"
                        className="text-sm font-bold text-slate-800 dark:text-slate-100"
                      >
                        Thánh Ca Gợi Ý Hôm Nay
                      </h3>
                      <span className="text-[11px] font-medium text-skysoft-600 dark:text-skysoft-300">
                        Chủ đề: {activeDevotional.suggestedHymn.categoryLabelVi} •{" "}
                        {activeDevotional.suggestedHymn.durationLabel}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/thanh-ca"
                    className="text-xs font-semibold text-skysoft-600 hover:underline dark:text-skysoft-300"
                  >
                    Thư viện (9 chủ đề) →
                  </Link>
                </div>

                <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-cream-200 bg-white p-3.5 dark:border-slate-700 dark:bg-slate-800/80">
                  <ChibiImage
                    src={activeDevotional.suggestedHymn.thumbnailUrl}
                    alt={activeDevotional.suggestedHymn.title}
                    className="h-14 w-14 shrink-0 rounded-xl bg-cream-50 object-contain p-1"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                      {activeDevotional.suggestedHymn.title}
                    </h4>
                    <p className="truncate text-xs text-slate-600 dark:text-slate-300">
                      Tác giả: {activeDevotional.suggestedHymn.composer}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                      Nguồn: {activeDevotional.suggestedHymn.legalSourceName}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-amber-700 dark:text-amber-300">
                    {activeDevotional.suggestedHymn.usageRights}
                  </span>
                  <a
                    href={activeDevotional.suggestedHymn.listenUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-skysoft-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-skysoft-500"
                  >
                    <span>Tìm trên YouTube</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </div>

            {/* Cột phải (7/12): 4. Lời Chúa Hôm Nay, 5. Suy Niệm & Lời Khuyên, 6. Lời Cầu Nguyện */}
            <div className="flex flex-col gap-5 lg:col-span-7">
              {/* 4. Card Lời Chúa Hôm Nay */}
              <article
                aria-labelledby="scripture-heading"
                className="rounded-3xl border border-sungold-200 bg-gradient-to-br from-cream-50 via-white to-sungold-50/50 p-6 shadow-soft dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/90"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cream-200 pb-3.5 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sungold-100 text-sungold-600 dark:bg-sungold-500/20 dark:text-sungold-300">
                      <BookOpen className="h-4 w-4" />
                    </span>
                    <div>
                      <h2
                        id="scripture-heading"
                        className="text-base font-bold text-slate-800 dark:text-slate-100"
                      >
                        Lời Chúa Hôm Nay (Bản Mẫu Demo)
                      </h2>
                      <p className="text-xs font-semibold text-sungold-600 dark:text-sungold-300">
                        {activeDevotional.scripture.bookName} —{" "}
                        {activeDevotional.scripture.referenceLabel}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Chưa xác minh bản quyền chính thức
                  </span>
                </div>

                <blockquote className="mt-4 rounded-2xl border-l-4 border-sungold-500 bg-white/90 p-4 font-serif text-base italic leading-relaxed text-slate-800 shadow-sm dark:bg-slate-950/70 dark:text-slate-100 sm:text-lg">
                  {activeDevotional.scripture.passageText}
                </blockquote>

                <div className="mt-3.5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span>
                      <strong>Nguồn tham khảo:</strong>{" "}
                      {activeDevotional.scripture.bibleSource.name}
                    </span>
                    <span>
                      Sách: <strong>{activeDevotional.scripture.bookAbbr}</strong>{" "}
                      • Chương{" "}
                      <strong>{activeDevotional.scripture.chapter}</strong>, Câu{" "}
                      <strong>
                        {activeDevotional.scripture.verseStart}
                        {activeDevotional.scripture.verseEnd
                          ? `-${activeDevotional.scripture.verseEnd}`
                          : ""}
                      </strong>
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-700 dark:text-amber-300">
                    <strong>Tình trạng xác minh:</strong>{" "}
                    {activeDevotional.scripture.bibleSource.copyrightNotice}
                  </p>
                </div>
              </article>

              {/* 5. Card Lời Nhắn Nhủ, Suy Niệm (100-150 từ) & Thực Hành */}
              <article
                aria-labelledby="reflection-heading"
                className="rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2
                    id="reflection-heading"
                    className="text-base font-bold text-slate-800 dark:text-slate-100"
                  >
                    Lời Nhắn Nhủ & Suy Niệm (Bản Mẫu Demo)
                  </h2>
                  <span className="rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    Độ dài: {activeDevotional.reflectionWordCount} từ (Chuẩn
                    100–150 từ)
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-200 sm:text-base">
                  {activeDevotional.reflectionBody}
                </p>

                <div className="mt-4 rounded-2xl border border-sage-200 bg-sage-50/80 p-4 dark:border-sage-500/30 dark:bg-slate-800/90">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sage-700 dark:text-sage-300">
                    <Sparkles className="h-4 w-4" />
                    <span>Lời khuyên thực hành hôm nay</span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                    {activeDevotional.practicalAction}
                  </p>
                </div>
              </article>

              {/* 6. Card Lời Cầu Nguyện (40-80 từ) */}
              <article
                aria-labelledby="prayer-heading"
                className="rounded-3xl border border-cream-200 bg-gradient-to-br from-cream-50 to-sage-50/60 p-6 shadow-card dark:border-slate-800 dark:from-slate-900 dark:to-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
                      <HeartHandshake className="h-4 w-4" />
                    </span>
                    <div>
                      <h2
                        id="prayer-heading"
                        className="text-base font-bold text-slate-800 dark:text-slate-100"
                      >
                        Lời Cầu Nguyện Trong Ngày
                      </h2>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Độ dài: {activeDevotional.prayerWordCount} từ (Chuẩn
                        40–80 từ)
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/cau-nguyen"
                    className="text-xs font-semibold text-sage-700 hover:underline dark:text-sage-300"
                  >
                    Mở Nhật ký cầu nguyện →
                  </Link>
                </div>

                <p className="mt-3.5 rounded-2xl bg-white/90 p-4 font-serif text-sm italic leading-relaxed text-slate-800 shadow-sm dark:bg-slate-950/60 dark:text-slate-100 sm:text-base">
                  “{activeDevotional.prayerText}”
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAmenCounted(true);
                      showToast(
                        "Amen! Nguyện xin bình an của Chúa ở cùng bạn suốt ngày hôm nay."
                      );
                    }}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition ${
                      amenCounted
                        ? "bg-sage-700 text-white"
                        : "bg-sage-600 text-white hover:bg-sage-700"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${amenCounted ? "fill-white" : ""}`}
                    />
                    <span>
                      {amenCounted
                        ? "Đã hiệp lời: Amen!"
                        : "Cùng thưa: Amen!"}
                    </span>
                  </button>

                  <span className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-300">
                    <Info className="h-3.5 w-3.5" />
                    Trạng thái: {activeDevotional.reviewedBy}
                  </span>
                </div>
              </article>
            </div>
          </div>

          {/* 9. Điều hướng đến các chức năng khác & Thư viện Chibi 10 chủ đề */}
          <section
            aria-labelledby="quick-explore-heading"
            className="mt-8 rounded-3xl border border-cream-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h2
                  id="quick-explore-heading"
                  className="text-lg font-extrabold text-slate-800 dark:text-slate-100"
                >
                  Không Gian Đức Tin & Điều Hướng Chức Năng
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Khám phá các phân trang trong ứng dụng
                </p>
              </div>
              <Link
                href="/kham-pha"
                className="inline-flex items-center gap-1 text-xs font-bold text-sage-600 hover:underline dark:text-sage-300"
              >
                <Compass className="h-4 w-4" />
                <span>Xem toàn bộ 10 hình SVG & Module TNTT →</span>
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/kinh-thanh"
                className="group rounded-2xl border border-cream-200 bg-cream-50/70 p-4 transition hover:-translate-y-0.5 hover:border-sungold-400 hover:bg-sungold-50/60 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <BookOpen className="h-6 w-6 text-sungold-600 dark:text-sungold-400" />
                <h3 className="mt-2.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                  Kinh Thánh & Tình Trạng Xác Minh
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Xem rõ trạng thái bản dịch tham khảo, cảnh báo bản quyền và
                  quy trình chuẩn ấn.
                </p>
              </Link>

              <Link
                href="/thanh-ca"
                className="group rounded-2xl border border-cream-200 bg-cream-50/70 p-4 transition hover:-translate-y-0.5 hover:border-skysoft-400 hover:bg-skysoft-50/60 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <Music className="h-6 w-6 text-skysoft-600 dark:text-skysoft-400" />
                <h3 className="mt-2.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                  Thánh Ca Công Giáo (9 Chủ Đề)
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Tạ ơn, Cầu nguyện, Bình an, Gia đình, Đức Mẹ, Giáng Sinh, Mùa
                  Chay, Phục Sinh, Thiếu nhi.
                </p>
              </Link>

              <Link
                href="/cau-nguyen"
                className="group rounded-2xl border border-cream-200 bg-cream-50/70 p-4 transition hover:-translate-y-0.5 hover:border-sage-400 hover:bg-sage-50/60 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <HeartHandshake className="h-6 w-6 text-sage-600 dark:text-sage-400" />
                <h3 className="mt-2.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                  Góc Cầu Nguyện & Nhật Ký
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Kinh Lạy Cha, Kính Mừng, Sáng Danh và sổ tay cầu nguyện lưu
                  tạm cục bộ.
                </p>
              </Link>

              <Link
                href="/kham-pha"
                className="group rounded-2xl border border-cream-200 bg-cream-50/70 p-4 transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50/60 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <Compass className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <h3 className="mt-2.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                  Khám Phá & Thiếu Nhi Thánh Thể
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Kiểm tra toàn bộ 10 hình SVG Placeholder & kiến trúc Ấu Nhi,
                  Thiếu Nhi, Nghĩa Sĩ, Hiệp Sĩ.
                </p>
              </Link>
            </div>

            {/* Xem nhanh 5 hình đầu tiên */}
            <div className="mt-6 border-t border-cream-200 pt-5 dark:border-slate-800">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Xem Nhanh 5/10 Hình SVG Placeholder (Xem đầy đủ 10 hình tại
                  trang Khám Phá)
                </h3>
                <Link
                  href="/kham-pha"
                  className="text-xs font-semibold text-sage-600 hover:underline dark:text-sage-300"
                >
                  Đối chiếu cả 10 hình SVG →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {DEVOTIONAL_IMAGES.slice(0, 5).map((img) => (
                  <div
                    key={img.id}
                    className="rounded-2xl border border-cream-200 bg-cream-50/50 p-2.5 text-center dark:border-slate-800 dark:bg-slate-800/40"
                  >
                    <ChibiImage
                      src={img.imageUrl}
                      fallbackSrc={img.fallbackUrl}
                      alt={img.description}
                      className="mx-auto h-24 w-full object-contain"
                    />
                    <p className="mt-1.5 truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                      {img.theme}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ShareCardModal
            devotional={activeDevotional}
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
          />
        </>
      )}
    </div>
  );
}

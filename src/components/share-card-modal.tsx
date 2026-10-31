"use client";

import React, { useEffect, useRef, useState } from "react";
import { DailyDevotional } from "@/types/catholic";
import {
  Check,
  Copy,
  Download,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

interface ShareCardModalProps {
  devotional: DailyDevotional;
  isOpen: boolean;
  onClose: () => void;
}

type PastelThemeKey = "cream" | "sage" | "sky" | "gold";

const PASTEL_THEMES: Record<
  PastelThemeKey,
  {
    label: string;
    bgStart: string;
    bgEnd: string;
    border: string;
    accent: string;
    textMain: string;
    textMuted: string;
  }
> = {
  cream: {
    label: "Kem Ấm Áp",
    bgStart: "#FDFBF7",
    bgEnd: "#F3E9D2",
    border: "#D99B16",
    accent: "#B47B0E",
    textMain: "#2C221E",
    textMuted: "#6B574E",
  },
  sage: {
    label: "Xanh Lá Bình An",
    bgStart: "#F2F7F4",
    bgEnd: "#C5E0CF",
    border: "#4F8A6B",
    accent: "#2F5642",
    textMain: "#1D3328",
    textMuted: "#3D6F55",
  },
  sky: {
    label: "Xanh Trời Hy Vọng",
    bgStart: "#F0F7FC",
    bgEnd: "#BAE0F5",
    border: "#3B8AC4",
    accent: "#2B6EA0",
    textMain: "#1B364B",
    textMuted: "#2B6EA0",
  },
  gold: {
    label: "Vàng Nắng Dịu",
    bgStart: "#FFFBEB",
    bgEnd: "#FDE68A",
    border: "#D99B16",
    accent: "#926109",
    textMain: "#362507",
    textMuted: "#78520D",
  },
};

function wrapVietnameseText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

export function ShareCardModal({
  devotional,
  isOpen,
  onClose,
}: ShareCardModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<PastelThemeKey>("cream");
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const theme = PASTEL_THEMES[selectedTheme];
    const width = 1080;
    const height = 1350;
    canvas.width = width;
    canvas.height = height;

    const drawCard = (imgElement?: HTMLImageElement) => {
      // 1. Nền Pastel Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, theme.bgStart);
      grad.addColorStop(1, theme.bgEnd);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Khung viền trang nhã
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 4;
      ctx.strokeRect(48, 48, width - 96, height - 96);

      // 3. Header: Tên ứng dụng & Slogan
      ctx.fillStyle = theme.accent;
      ctx.font = "700 32px system-ui, -apple-system, 'Segoe UI', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("✠ MỘT NGÀY CÓ CHÚA", width / 2, 118);

      ctx.fillStyle = theme.textMuted;
      ctx.font = "500 22px system-ui, -apple-system, 'Segoe UI', sans-serif";
      ctx.fillText(
        `Cùng Chúa lớn lên mỗi ngày • Ngày ${devotional.publishDate}`,
        width / 2,
        158
      );

      // 4. Khung hình Chúa Giêsu Chibi
      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(140, 195, 800, 440, 32);
      ctx.fill();
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 2;
      ctx.stroke();

      if (imgElement) {
        ctx.clip();
        ctx.drawImage(imgElement, 140, 195, 800, 440);
      }
      ctx.restore();

      // 5. Chủ đề ngày
      ctx.fillStyle = theme.accent;
      ctx.font = "700 28px 'Segoe UI', Arial, sans-serif";
      const titleLines = wrapVietnameseText(
        ctx,
        devotional.themeTitle.normalize("NFC"),
        width - 200
      );
      let curY = 695;
      titleLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, width / 2, curY);
        curY += 38;
      });

      // 6. Nội dung Câu Kinh Thánh (Tự động xuống dòng không cắt chữ, chuẩn Unicode NFC)
      ctx.fillStyle = theme.textMain;
      ctx.font = "italic 600 32px 'Segoe UI', Arial, sans-serif";
      const passageLines = wrapVietnameseText(
        ctx,
        devotional.scripture.passageText.normalize("NFC"),
        width - 220
      );

      const lineHeight = 50;
      let startY = curY + 30;
      passageLines.slice(0, 7).forEach((line) => {
        ctx.fillText(line, width / 2, startY);
        startY += lineHeight;
      });

      // 7. Tham chiếu Kinh Thánh & Nguồn bản dịch
      const refY = Math.max(startY + 20, 1135);
      ctx.fillStyle = theme.accent;
      ctx.font = "700 30px 'Segoe UI', Arial, sans-serif";
      ctx.fillText(
        `— ${devotional.scripture.bookName} (${devotional.scripture.referenceLabel}) —`.normalize("NFC"),
        width / 2,
        refY
      );

      ctx.fillStyle = theme.textMuted;
      ctx.font = "500 20px 'Segoe UI', Arial, sans-serif";
      const sourceLines = wrapVietnameseText(
        ctx,
        `Nguồn: ${devotional.scripture.bibleSource.name}`.normalize("NFC"),
        width - 200
      );
      let srcY = refY + 38;
      sourceLines.slice(0, 2).forEach((line) => {
        ctx.fillText(line, width / 2, srcY);
        srcY += 28;
      });

      // 8. Footer bản quyền & xác minh
      ctx.fillStyle = theme.textMuted;
      ctx.font = "600 19px 'Segoe UI', Arial, sans-serif";
      ctx.fillText(
        "Thiệp Lời Chúa (Bản mẫu Demo) • motngaycochua.vn".normalize("NFC"),
        width / 2,
        height - 72
      );
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => drawCard(img);
    img.onerror = () => drawCard(undefined);
    img.src = devotional.chibiImage.imageUrl;
  }, [isOpen, devotional, selectedTheme]);

  if (!isOpen) return null;

  const shareText = `✠ LỜI CHÚA HÔM NAY (${devotional.publishDate})\nChủ đề: ${devotional.themeTitle}\n\n${devotional.scripture.passageText}\n— ${devotional.scripture.bookName} (${devotional.scripture.referenceLabel})\nNguồn: ${devotional.scripture.bibleSource.name}\n\nSuy niệm & Cầu nguyện tại: Một Ngày Có Chúa (Cùng Chúa lớn lên mỗi ngày)`;

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `mot-ngay-co-chua-${devotional.publishDate}.png`;
    link.href = dataUrl;
    link.click();
    setStatusMessage("Đã tải xuống thiệp ảnh PNG độ nét cao!");
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setStatusMessage("Đã sao chép nguyên văn Lời Chúa & nguồn trích dẫn!");
      setTimeout(() => {
        setCopied(false);
        setStatusMessage(null);
      }, 3000);
    } catch {
      setStatusMessage("Không thể tự động sao chép trên trình duyệt này.");
    }
  };

  const handleWebShare = async () => {
    const canvas = canvasRef.current;
    if (navigator.share) {
      try {
        if (canvas) {
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png")
          );
          if (blob) {
            const file = new File(
              [blob],
              `mot-ngay-co-chua-${devotional.publishDate}.png`,
              { type: "image/png" }
            );
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: `Một Ngày Có Chúa — ${devotional.themeTitle}`,
                text: shareText,
                files: [file],
              });
              return;
            }
          }
        }
        await navigator.share({
          title: `Một Ngày Có Chúa — ${devotional.themeTitle}`,
          text: shareText,
        });
      } catch {
        // Người dùng hủy hộp thoại chia sẻ
      }
    } else {
      await handleCopyText();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cream-200 bg-cream-50 p-5 shadow-2xl dark:border-slate-700 dark:bg-slate-900 sm:p-6">
        <div className="flex items-center justify-between border-b border-cream-200 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sungold-100 text-sungold-600 dark:bg-sungold-500/20 dark:text-sungold-300">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="share-modal-title"
                className="text-lg font-bold text-slate-800 dark:text-slate-100"
              >
                Tạo & Chia Sẻ Thiệp Lời Chúa
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Hình ảnh rõ nét, nguyên văn Kinh Thánh đã xác minh, không cắt chữ
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-cream-200 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
            aria-label="Đóng cửa sổ tạo thiệp"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chọn màu nền Pastel */}
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Chọn màu nền Pastel:
          </span>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {(Object.keys(PASTEL_THEMES) as PastelThemeKey[]).map((key) => {
              const item = PASTEL_THEMES[key];
              const isSelected = selectedTheme === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedTheme(key)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                    isSelected
                      ? "border-sage-600 bg-sage-50 text-sage-700 ring-2 ring-sage-500/30 dark:border-sage-400 dark:bg-slate-800 dark:text-sage-200"
                      : "border-cream-200 bg-white text-slate-700 hover:bg-cream-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-slate-300"
                    style={{ background: item.bgEnd }}
                  />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Khung xem trước Canvas */}
        <div className="mt-4 flex justify-center rounded-2xl border border-cream-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
          <canvas
            ref={canvasRef}
            className="h-auto max-h-[420px] w-auto max-w-full rounded-xl shadow-md"
          />
        </div>

        {statusMessage && (
          <div className="mt-3 rounded-xl bg-sage-100 px-4 py-2.5 text-center text-xs font-medium text-sage-700 dark:bg-sage-700/30 dark:text-sage-200">
            {statusMessage}
          </div>
        )}

        {/* Các nút thao tác */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <button
            type="button"
            onClick={handleDownloadPng}
            className="flex items-center justify-center gap-2 rounded-2xl bg-sage-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sage-700"
          >
            <Download className="h-4 w-4" />
            Tải Thiệp PNG
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            className="flex items-center justify-center gap-2 rounded-2xl border border-cream-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-cream-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {copied ? (
              <Check className="h-4 w-4 text-sage-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            {copied ? "Đã Sao Chép" : "Sao Chép Nội Dung"}
          </button>

          <button
            type="button"
            onClick={handleWebShare}
            className="flex items-center justify-center gap-2 rounded-2xl bg-skysoft-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-skysoft-500"
          >
            <Share2 className="h-4 w-4" />
            Chia Sẻ Nhanh
          </button>
        </div>
      </div>
    </div>
  );
}


export const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

/**
 * Trả về chuỗi ngày YYYY-MM-DD chuẩn theo múi giờ Asia/Ho_Chi_Minh
 */
export function getVietnamDateIso(date: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: VIETNAM_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date); // YYYY-MM-DD
}

/**
 * Định dạng ngày tiếng Việt trang trọng theo múi giờ Asia/Ho_Chi_Minh
 * Ví dụ: "Thứ Bảy, ngày 31 tháng 10 năm 2026"
 */
export function formatVietnamFullDate(dateInput?: string | Date): string {
  const dateObj =
    typeof dateInput === "string"
      ? new Date(`${dateInput}T07:00:00+07:00`)
      : dateInput ?? new Date();

  const formatted = new Intl.DateTimeFormat("vi-VN", {
    timeZone: VIETNAM_TIMEZONE,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dateObj);

  // Viết hoa chữ cái đầu
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

/**
 * Tính số ngày trong năm (deterministic index) theo múi giờ Việt Nam
 * Đảm bảo trong cùng 1 ngày (Asia/Ho_Chi_Minh), người dùng mở lại luôn thấy cùng 1 nội dung đã xuất bản.
 */
export function getDeterministicDaySeed(isoDateVn: string): number {
  const [year, month, day] = isoDateVn.split("-").map(Number);
  return year * 10000 + month * 100 + day;
}


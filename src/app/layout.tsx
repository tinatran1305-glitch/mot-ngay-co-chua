import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Merriweather } from "next/font/google";
import "./globals.css";
import { AppNavigation } from "@/components/app-navigation";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MỘT NGÀY CÓ CHÚA — Cùng Chúa lớn lên mỗi ngày.",
  description:
    "Không gian đức tin nhẹ nhàng, giúp người Công giáo Việt Nam bắt đầu mỗi ngày bằng Lời Chúa, suy niệm, cầu nguyện và thánh ca hợp pháp.",
  manifest: "/manifest.json",
  keywords: [
    "Một Ngày Có Chúa",
    "Cùng Chúa lớn lên mỗi ngày",
    "Lời Chúa mỗi ngày",
    "Suy niệm Công giáo",
    "Thánh ca Công giáo",
    "Cầu nguyện",
    "Thiếu Nhi Thánh Thể",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F8A6B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${beVietnamPro.variable} ${merriweather.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans overflow-x-hidden">
        <AppNavigation />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-cream-200 bg-cream-100/70 py-8 pb-24 text-center text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400 md:pb-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="font-bold text-slate-800 dark:text-slate-200">
              ✠ MỘT NGÀY CÓ CHÚA — Cùng Chúa lớn lên mỗi ngày.
            </p>
            <p className="mt-1">
              Mọi trích dẫn Kinh Thánh đều ghi rõ nguồn bản dịch chính thức và
              tuân thủ quy trình kiểm duyệt trước khi xuất bản.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}


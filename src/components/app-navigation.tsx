"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Compass,
  HeartHandshake,
  Home,
  Moon,
  Music,
  ShieldCheck,
  Sun,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Trang chủ",
    icon: Home,
  },
  {
    href: "/kinh-thanh",
    label: "Kinh Thánh",
    icon: BookOpen,
  },
  {
    href: "/thanh-ca",
    label: "Thánh ca",
    icon: Music,
  },
  {
    href: "/cau-nguyen",
    label: "Cầu nguyện",
    icon: HeartHandshake,
  },
  {
    href: "/kham-pha",
    label: "Khám phá",
    icon: Compass,
  },
];

export function AppNavigation() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("mncc_theme_mode");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("mncc_theme_mode", nextDark ? "dark" : "light");
  };

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-cream-200/80 bg-cream-50/90 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          {/* 1. Logo & Tên ứng dụng */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sungold-300 via-sungold-400 to-sungold-500 text-white shadow-sm transition-transform group-hover:scale-105">
              <span className="text-xl font-bold leading-none" aria-hidden="true">
                ✠
              </span>
            </div>
            <div>
              <span className="block text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100 sm:text-lg">
                MỘT NGÀY CÓ CHÚA
              </span>
              <span className="block text-xs font-medium text-sage-600 dark:text-sage-300">
                Cùng Chúa lớn lên mỗi ngày.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Điều hướng chính trên máy tính"
            className="hidden items-center gap-1.5 md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-2xl px-3.5 py-2 text-sm font-semibold transition ${
                    isActive
                      ? "bg-sage-600 text-white shadow-sm dark:bg-sage-500"
                      : "text-slate-700 hover:bg-cream-200/70 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Admin & Dark Mode Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/quan-tri"
              className={`flex items-center gap-1.5 rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                pathname.startsWith("/quan-tri")
                  ? "border-sungold-500 bg-sungold-100 text-sungold-600 dark:bg-sungold-500/20 dark:text-sungold-300"
                  : "border-cream-200 bg-white text-slate-700 hover:bg-cream-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
              title="Trang quản trị & kiểm duyệt nội dung"
            >
              <ShieldCheck className="h-4 w-4 text-sungold-600 dark:text-sungold-400" />
              <span className="hidden sm:inline">Kiểm duyệt</span>
            </Link>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={
                darkMode ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"
              }
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cream-200 bg-white text-slate-700 transition hover:bg-cream-100 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-300"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar for Mobile & Tablet */}
      <nav
        aria-label="Thanh điều hướng di động"
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-cream-200 bg-cream-50/95 px-2 py-1.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center rounded-xl py-1.5 text-[11px] font-semibold transition ${
                  isActive
                    ? "bg-sage-100 text-sage-700 dark:bg-sage-500/20 dark:text-sage-300"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="mb-0.5 h-4 w-4" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}


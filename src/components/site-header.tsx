"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { mainNav } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Đóng menu điện thoại khi chuyển trang
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-reu/10 bg-kem/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-reu/5 ${
                  active ? "text-reu underline decoration-vang decoration-2 underline-offset-8" : "text-reu/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/dang-nhap" className="rounded-full px-4 py-2 text-sm font-medium text-reu hover:bg-reu/5">
            Đăng nhập
          </Link>
          <Link
            href="/dang-ky"
            className="rounded-full bg-reu px-4 py-2 text-sm font-medium text-kem transition-colors hover:bg-reu-nhat"
          >
            Tạo tài khoản miễn phí
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-reu hover:bg-reu/5 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-dien-thoai"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div id="menu-dien-thoai" className="border-t border-reu/10 bg-kem lg:hidden">
          <nav aria-label="Menu điện thoại" className="mx-auto flex max-w-6xl flex-col px-4 py-3">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg px-3 py-3 text-base font-medium text-reu hover:bg-reu/5">
                {item.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-reu/10 pt-4">
              <Link href="/dang-nhap" className="rounded-full border border-reu/20 px-4 py-2.5 text-center text-sm font-medium">
                Đăng nhập
              </Link>
              <Link href="/dang-ky" className="rounded-full bg-reu px-4 py-2.5 text-center text-sm font-medium text-kem">
                Tạo tài khoản
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

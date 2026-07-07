"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PUBLIC_ROUTES } from "@/lib/routes";

export function PublicNavbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
      <header className="pointer-events-auto flex items-center justify-between h-14 w-full max-w-5xl px-5 sm:px-6 rounded-full bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.1)] transition-all">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <span className="text-[13px] font-bold tracking-tight text-[#0B1F3A]">
            RoadTierbers
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {PUBLIC_ROUTES.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "px-4 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-colors",
                pathname === route.path
                  ? "text-white bg-[#0B1F3A]"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/login"
          className="hidden sm:inline-flex items-center justify-center h-8 px-4 rounded-full text-[13px] font-semibold bg-[#1D4ED8] text-white hover:bg-[#1e40af] transition-colors shadow-sm"
        >
          Command Center
        </Link>
      </header>
    </div>
  );
}

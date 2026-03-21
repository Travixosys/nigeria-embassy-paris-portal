"use client";

import Link from "next/link";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <div>
              <div className="text-sm font-semibold leading-tight">Embassy of Nigeria, Paris</div>
              <div className="text-xs text-white/70">Consular Services Portal</div>
            </div>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/apply" className="hover:text-white/80 transition-colors">
              Apply
            </Link>
            <Link href="/track" className="hover:text-white/80 transition-colors">
              Track Application
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

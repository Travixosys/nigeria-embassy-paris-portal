"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, LogOut, RotateCcw } from "lucide-react";
import { resetDemo } from "@/lib/demo-store";

export function AdminHeader() {
  const router = useRouter();

  function handleLogout() {
    router.push("/admin/login");
  }

  function handleReset() {
    resetDemo();
    router.push("/admin");
  }

  return (
    <header className="bg-primary-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Shield className="h-6 w-6" />
            <div className="text-sm font-semibold">Staff Portal</div>
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="hover:text-white/80 transition-colors">
              Dashboard
            </Link>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer"
              title="Restore the 20 demo applications"
            >
              <RotateCcw className="h-4 w-4" />
              Reset demo
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 hover:text-white/80 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

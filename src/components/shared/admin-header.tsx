"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminHeader() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
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

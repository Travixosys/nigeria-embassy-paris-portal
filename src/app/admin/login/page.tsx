"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { DEMO_OFFICER } from "@/lib/demo-store";

// Demo mode: the staff portal is open. Fields are prefilled and any value is accepted.
export default function AdminLoginPage() {
  const [email, setEmail] = useState(DEMO_OFFICER.email);
  const [password, setPassword] = useState("demo-access");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-accent flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-surface rounded-lg border border-border shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-primary rounded-full p-3 mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-text">Staff Portal</h1>
            <p className="text-sm text-text-muted mt-1">Embassy of Nigeria, Paris</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="staff@embassy.gov.ng"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <p className="text-xs text-text-muted text-center">Demo access: no credentials required.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

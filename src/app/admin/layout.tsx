import { AdminHeader } from "@/components/shared/admin-header";

export const metadata = {
  title: "Staff Portal — Embassy of Nigeria, Paris",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-accent">
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

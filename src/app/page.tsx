import Link from "next/link";
import { Header } from "@/components/shared/header";
import { FileUp, Search, Bell, ChevronRight, Shield, Clock, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              Consular Services Portal
            </h1>
            <p className="mt-4 text-lg text-white/80">
              Submit your passport application documents, track your case status, and receive updates from the Consular Section of the Embassy of Nigeria in Paris.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary font-medium px-6 py-3 rounded-md hover:bg-white/90 transition-colors"
              >
                <FileUp className="h-5 w-5" />
                Start Application
              </Link>
              <Link
                href="/track"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-medium px-6 py-3 rounded-md hover:bg-white/10 transition-colors"
              >
                <Search className="h-5 w-5" />
                Track Your Case
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileUp,
                title: "1. Submit Documents",
                description: "Complete the application form and upload your required documents securely through our portal.",
              },
              {
                icon: Clock,
                title: "2. Track Progress",
                description: "Use your reference number to check the status of your application at any time.",
              },
              {
                icon: Bell,
                title: "3. Receive Updates",
                description: "Get notified by email when your application status changes or if additional documents are needed.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-medium text-text mb-2">{title}</h3>
                <p className="text-sm text-text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-accent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-text text-center mb-12">Available Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { label: "New Passport Application", href: "/apply" },
              { label: "Passport Renewal", href: "/apply" },
              { label: "Replacement (Lost/Damaged)", href: "/apply" },
              { label: "Child Passport", href: "/apply" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-between bg-surface border border-border rounded-lg px-5 py-4 hover:shadow-md transition-shadow"
              >
                <span className="text-sm font-medium text-text">{label}</span>
                <ChevronRight className="h-4 w-4 text-text-muted" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-12 bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-text">Secure Document Handling</p>
              <p className="text-xs text-text-muted mt-1">Your documents are encrypted and stored securely</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-text">Real-time Status Updates</p>
              <p className="text-xs text-text-muted mt-1">Track your application progress at any time</p>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm font-medium text-text">Official Embassy Service</p>
              <p className="text-xs text-text-muted mt-1">Operated by the Consular Section, Paris</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white/70 py-8 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>Embassy of Nigeria &middot; 173 Avenue Victor Hugo, 75116 Paris, France</p>
          <p className="mt-1">Consular Section &middot; Tel: +33 1 47 04 68 65</p>
          <p className="mt-3 text-white/50 text-xs">&copy; 2026 Embassy of Nigeria, Paris. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

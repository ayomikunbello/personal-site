import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-paper px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white mx-auto">
            {siteConfig.monogram}
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-ink">Admin</h1>
          <p className="mt-1 text-sm text-ink/50">Sign in to manage the site</p>
        </div>

        <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-sm">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm text-ink/40">
          <Link href="/" className="hover:text-violet-700">
            ← Back to site
          </Link>
        </p>
      </div>
    </div>
  );
}

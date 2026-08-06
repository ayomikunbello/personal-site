"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";

const navItems = [
  { label: "Overview", href: "/admin" },
  { label: "Page content", href: "/admin/content" },
  { label: "Publications", href: "/admin/publications" },
  { label: "Featured news", href: "/admin/highlights" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Subscribers", href: "/admin/subscribers" },
  { label: "Messages", href: "/admin/messages" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-full flex-col justify-between">
      <div className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-violet-100 text-violet-800" : "text-ink/60 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-1 border-t border-ink/10 pt-4">
        <Link
          href="/"
          target="_blank"
          className="block rounded-xl px-4 py-2.5 text-sm font-medium text-ink/60 hover:bg-ink/5 hover:text-ink"
        >
          View site ↗
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium text-ink/60 hover:bg-red-50 hover:text-red-700"
          >
            Log out
          </button>
        </form>
      </div>
    </nav>
  );
}

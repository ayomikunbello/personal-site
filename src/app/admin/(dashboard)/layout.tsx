import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";
import { siteConfig } from "@/lib/data";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-paper">
      <div className="mx-auto flex max-w-[100rem] gap-8 px-6 py-10">
        <aside className="hidden w-56 shrink-0 sm:block">
          <div className="sticky top-24 rounded-3xl border border-ink/10 bg-white p-4">
            <div className="mb-2 flex items-center gap-2 px-2 py-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-bold text-white">
                {siteConfig.monogram}
              </span>
              <div>
                <p className="text-xs font-semibold text-ink">Admin</p>
                <p className="truncate text-[11px] text-ink/40">{user.email}</p>
              </div>
            </div>
            <AdminNav />
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

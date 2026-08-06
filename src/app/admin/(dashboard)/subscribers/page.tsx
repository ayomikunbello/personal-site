import { createClient } from "@/lib/supabase/server";
import SubscribersManager from "@/components/admin/SubscribersManager";

export default async function AdminSubscribersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Subscribers</h1>
      <p className="mt-1 text-sm text-ink/50">Everyone who signed up for your newsletter.</p>

      <div className="mt-8">
        <SubscribersManager subscribers={data ?? []} />
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import SubscribersManager from "@/components/admin/SubscribersManager";

export default async function AdminSubscribersPage() {
  const supabase = await createClient();
  const [{ data: subscribers }, { data: groups }, { data: memberships }] = await Promise.all([
    supabase.from("subscribers").select("*").order("subscribed_at", { ascending: false }),
    supabase.from("subscriber_groups").select("*").order("name"),
    supabase.from("subscriber_group_members").select("*"),
  ]);

  const withGroups = (subscribers ?? []).map((s) => ({
    ...s,
    groupIds: (memberships ?? []).filter((m) => m.subscriber_id === s.id).map((m) => m.group_id),
  }));

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Subscribers</h1>
      <p className="mt-1 text-sm text-ink/50">Everyone who signed up for your newsletter, organized into groups.</p>

      <div className="mt-8">
        <SubscribersManager subscribers={withGroups} groups={groups ?? []} />
      </div>
    </div>
  );
}

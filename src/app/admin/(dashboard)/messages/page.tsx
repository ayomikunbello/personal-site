import { createClient } from "@/lib/supabase/server";
import MessagesManager from "@/components/admin/MessagesManager";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Messages</h1>
      <p className="mt-1 text-sm text-ink/50">Submissions from the contact form on your Home page.</p>

      <div className="mt-8">
        <MessagesManager messages={data ?? []} />
      </div>
    </div>
  );
}

import { getHighlights } from "@/lib/queries";
import HighlightsManager from "@/components/admin/HighlightsManager";

export default async function AdminHighlightsPage() {
  const items = await getHighlights();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Featured news</h1>
      <p className="mt-1 text-sm text-ink/50">
        Shown live in the Home page&rsquo;s &ldquo;Featured news&rdquo; section.
      </p>

      <div className="mt-8">
        <HighlightsManager items={items} />
      </div>
    </div>
  );
}

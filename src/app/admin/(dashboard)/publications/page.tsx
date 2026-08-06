import { getPublications } from "@/lib/queries";
import PublicationsManager from "@/components/admin/PublicationsManager";

export default async function AdminPublicationsPage() {
  const [journal, conference, project] = await Promise.all([
    getPublications("journal"),
    getPublications("conference"),
    getPublications("project"),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Publications</h1>
      <p className="mt-1 text-sm text-ink/50">
        Managed here, shown live on the public Portfolio page.
      </p>

      <div className="mt-8 space-y-10">
        <section>
          <h2 className="text-lg font-semibold text-ink">Journal Publications ({journal.length})</h2>
          <div className="mt-4">
            <PublicationsManager type="journal" items={journal} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Conference Proceedings ({conference.length})</h2>
          <div className="mt-4">
            <PublicationsManager type="conference" items={conference} />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink">Research Projects ({project.length})</h2>
          <div className="mt-4">
            <PublicationsManager type="project" items={project} />
          </div>
        </section>
      </div>
    </div>
  );
}

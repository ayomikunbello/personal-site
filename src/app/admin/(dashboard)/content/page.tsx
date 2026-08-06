import { getHeroSubheading, getAboutParagraphs, getResearchParagraphs } from "@/lib/queries";
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import { saveHeroContent, saveParagraphSection } from "./actions";

export default async function AdminContentPage() {
  const [subheading, aboutParagraphs, researchParagraphs] = await Promise.all([
    getHeroSubheading(),
    getAboutParagraphs(),
    getResearchParagraphs(),
  ]);

  const saveAbout = saveParagraphSection.bind(null, "about");
  const saveResearch = saveParagraphSection.bind(null, "researchInterests");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-ink">Page content</h1>
      <p className="mt-1 text-sm text-ink/50">
        Edits here appear live on the Home page. For multi-paragraph fields, separate
        paragraphs with a blank line.
      </p>

      <div className="mt-8 space-y-6">
        <ContentEditorForm
          label="Hero subheading"
          hint="The line under your name in the hero section."
          fieldName="subheading"
          defaultValue={subheading}
          action={saveHeroContent}
        />
        <ContentEditorForm
          label="About me"
          hint="Each paragraph separated by a blank line."
          fieldName="paragraphs"
          defaultValue={aboutParagraphs.join("\n\n")}
          multiline
          action={saveAbout}
        />
        <ContentEditorForm
          label="Research interests"
          hint="Each paragraph separated by a blank line."
          fieldName="paragraphs"
          defaultValue={researchParagraphs.join("\n\n")}
          multiline
          action={saveResearch}
        />
      </div>
    </div>
  );
}

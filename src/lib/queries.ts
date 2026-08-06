import { createClient } from "@/lib/supabase/server";
import {
  hero as staticHero,
  about as staticAbout,
  researchInterests as staticResearchInterests,
  highlights as staticHighlights,
  journalPublications as staticJournal,
  conferenceProceedings as staticConference,
  researchProjects as staticProjects,
} from "@/lib/data";

// Every getter here falls back to the static content in lib/data.ts if the
// database table is empty or unreachable, so the site never breaks — it
// just stops reflecting dashboard edits until content/rows are added.

export async function getSiteContent<T>(section: string, fallback: T): Promise<T> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_content")
      .select("content")
      .eq("section", section)
      .maybeSingle();
    if (data?.content) return data.content as T;
  } catch {
    // fall through to static fallback
  }
  return fallback;
}

export async function getHeroSubheading() {
  const content = await getSiteContent<{ subheading: string }>("hero", {
    subheading: staticHero.subheading,
  });
  return content.subheading;
}

export async function getAboutParagraphs() {
  const content = await getSiteContent<{ paragraphs: string[] }>("about", {
    paragraphs: staticAbout.paragraphs,
  });
  return content.paragraphs;
}

export async function getResearchParagraphs() {
  const content = await getSiteContent<{ paragraphs: string[] }>("researchInterests", {
    paragraphs: staticResearchInterests.paragraphs,
  });
  return content.paragraphs;
}

export type Publication = {
  id: string;
  type: "journal" | "conference" | "project";
  text: string;
  href: string | null;
  sort_order: number;
};

export async function getPublications(type: Publication["type"]): Promise<Publication[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("type", type)
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data as Publication[];
  } catch {
    // fall through
  }
  const fallbackMap = {
    journal: staticJournal.map((p, i) => ({ id: `s-j-${i}`, type: "journal" as const, text: p.text, href: p.href, sort_order: i })),
    conference: staticConference.map((p, i) => ({ id: `s-c-${i}`, type: "conference" as const, text: p.text, href: p.href, sort_order: i })),
    project: staticProjects.map((text, i) => ({ id: `s-p-${i}`, type: "project" as const, text, href: null, sort_order: i })),
  };
  return fallbackMap[type];
}

export type Highlight = {
  id: string;
  date_label: string;
  text: string;
  href: string | null;
  image_url: string | null;
  sort_order: number;
};

export async function getHighlights(): Promise<Highlight[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("highlights")
      .select("*")
      .order("sort_order", { ascending: true });
    if (!error && data && data.length > 0) return data as Highlight[];
  } catch {
    // fall through
  }
  return staticHighlights.map((h, i) => ({
    id: `s-h-${i}`,
    date_label: h.date,
    text: h.text,
    href: h.href,
    image_url: h.image,
    sort_order: i,
  }));
}

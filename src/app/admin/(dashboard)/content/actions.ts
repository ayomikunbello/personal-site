"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveHeroContent(formData: FormData) {
  const subheading = String(formData.get("subheading") ?? "").trim();
  if (!subheading) return { error: "Subheading can't be empty." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert({ section: "hero", content: { subheading }, updated_at: new Date().toISOString() }, { onConflict: "section" });

  if (error) return { error: error.message };
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { error: null };
}

export async function saveParagraphSection(section: "about" | "researchInterests", formData: FormData) {
  const raw = String(formData.get("paragraphs") ?? "");
  const paragraphs = raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return { error: "Add at least one paragraph." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .upsert(
      { section, content: { paragraphs }, updated_at: new Date().toISOString() },
      { onConflict: "section" }
    );

  if (error) return { error: error.message };
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { error: null };
}

"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadNewsletterImage(formData: FormData) {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file provided.", url: null };

  if (!file.type.startsWith("image/")) return { error: "File must be an image.", url: null };
  if (file.size > 5 * 1024 * 1024) return { error: "Image must be under 5MB.", url: null };

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("newsletter-images").upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) return { error: error.message, url: null };

  const { data } = supabase.storage.from("newsletter-images").getPublicUrl(path);
  return { error: null, url: data.publicUrl };
}

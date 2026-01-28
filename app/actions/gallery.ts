"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getGallery() {
    const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching gallery:", error);
        return [];
    }

    return data;
}

export async function addImage(formData: FormData) {
    const title = formData.get("title") as string;
    const image_url = formData.get("image_url") as string;
    const category = formData.get("category") as string;

    const { error } = await supabase.from("gallery").insert({
        title,
        image_url,
        category,
    });

    if (error) {
        console.error("Error adding image:", error);
        return { error: "Failed to add image" };
    }

    revalidatePath("/admin/galeri");
    revalidatePath("/galeri");
    redirect("/admin/galeri");
}

export async function deleteImage(id: string) {
    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
        console.error("Error deleting image:", error);
        return { error: "Failed to delete image" };
    }

    revalidatePath("/admin/galeri");
    revalidatePath("/galeri");
}

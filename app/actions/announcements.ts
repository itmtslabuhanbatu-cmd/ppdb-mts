"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAnnouncements() {
    const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_active", true)
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching announcements:", error);
        return [];
    }

    return data;
}

export async function getAllAnnouncements() {
    const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching all announcements:", error);
        return [];
    }

    return data;
}

export async function getAnnouncement(id: string) {
    const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching announcement:", error);
        return null;
    }

    return data;
}

export async function createAnnouncement(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const is_active = formData.get("is_active") === "on";

    const { error } = await supabase.from("announcements").insert({
        title,
        content,
        date,
        is_active,
    });

    if (error) {
        console.error("Error creating announcement:", error);
        return { error: "Failed to create announcement" };
    }

    revalidatePath("/admin/pengumuman");
    revalidatePath("/");
    redirect("/admin/pengumuman");
}

export async function updateAnnouncement(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const is_active = formData.get("is_active") === "on";

    const { error } = await supabase
        .from("announcements")
        .update({
            title,
            content,
            date,
            is_active,
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating announcement:", error);
        return { error: "Failed to update announcement" };
    }

    revalidatePath("/admin/pengumuman");
    revalidatePath("/");
    redirect("/admin/pengumuman");
}

export async function deleteAnnouncement(id: string) {
    const { error } = await supabase.from("announcements").delete().eq("id", id);

    if (error) {
        console.error("Error deleting announcement:", error);
        return { error: "Failed to delete announcement" };
    }

    revalidatePath("/admin/pengumuman");
    revalidatePath("/");
}

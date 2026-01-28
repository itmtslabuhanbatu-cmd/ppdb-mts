"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getPosts() {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error);
        return [];
    }

    return data;
}

export async function getPost(id: string) {
    const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching post:", error);
        return null;
    }

    return data;
}

export async function createPost(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const image_url = formData.get("image_url") as string;

    // Simple slug generation
    const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const { error } = await supabase.from("posts").insert({
        title,
        slug,
        content,
        excerpt,
        image_url,
    });

    if (error) {
        console.error("Error creating post:", error);
        return { error: "Failed to create post" };
    }

    revalidatePath("/admin/berita");
    revalidatePath("/berita");
    redirect("/admin/berita");
}

export async function deletePost(id: string) {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
        console.error("Error deleting post:", error);
        return { error: "Failed to delete post" };
    }

    revalidatePath("/admin/berita");
    revalidatePath("/berita");
}

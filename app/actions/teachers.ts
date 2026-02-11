"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getTeachers() {
    const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching teachers:", error);
        return [];
    }

    return data;
}

export async function getTeacher(id: string) {
    const { data, error } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching teacher:", error);
        return null;
    }

    return data;
}

export async function createTeacher(formData: FormData) {
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !position) {
        return { error: "Nama dan Jabatan wajib diisi" };
    }

    let imageUrl = null;

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from("teacher-photos")
            .upload(fileName, imageFile);

        if (error) {
            return { error: "Gagal upload gambar: " + error.message };
        }

        const { data: publicUrl } = supabase.storage
            .from("teacher-photos")
            .getPublicUrl(fileName);

        imageUrl = publicUrl.publicUrl;
    }

    const { error } = await supabase.from("teachers").insert({
        name,
        nip,
        position,
        image_url: imageUrl,
    });

    if (error) {
        return { error: "Gagal menyimpan data guru: " + error.message };
    }

    revalidatePath("/guru");
    revalidatePath("/admin/guru");
    redirect("/admin/guru");
}

export async function updateTeacher(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const nip = formData.get("nip") as string;
    const position = formData.get("position") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !position) {
        return { error: "Nama dan Jabatan wajib diisi" };
    }

    const updates: any = {
        name,
        nip,
        position,
        updated_at: new Date().toISOString(),
    };

    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
            .from("teacher-photos")
            .upload(fileName, imageFile);

        if (error) {
            return { error: "Gagal upload gambar: " + error.message };
        }

        const { data: publicUrl } = supabase.storage
            .from("teacher-photos")
            .getPublicUrl(fileName);

        updates.image_url = publicUrl.publicUrl;
    }

    const { error } = await supabase
        .from("teachers")
        .update(updates)
        .eq("id", id);

    if (error) {
        return { error: "Gagal update data guru: " + error.message };
    }

    revalidatePath("/guru");
    revalidatePath("/admin/guru");
    redirect("/admin/guru");
}

export async function deleteTeacher(id: string) {
    const { error } = await supabase.from("teachers").delete().eq("id", id);

    if (error) {
        return { error: "Gagal menghapus data guru" };
    }

    revalidatePath("/guru");
    revalidatePath("/admin/guru");
}

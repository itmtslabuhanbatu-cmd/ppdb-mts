"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getRegistrants() {
    const { data, error } = await supabase
        .from("ppdb_registrations")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching registrants:", error);
        return [];
    }

    return data;
}

export async function updateStatus(id: string, status: string) {
    const { error } = await supabase
        .from("ppdb_registrations")
        .update({ status })
        .eq("id", id);

    if (error) {
        console.error("Error updating status:", error);
        return { error: "Failed to update status" };
    }

    revalidatePath("/admin/ppdb");
}

"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function registerStudent(formData: FormData) {
    const nisn = formData.get("nisn") as string;
    const full_name = formData.get("full_name") as string;
    const birth_place = formData.get("birth_place") as string;
    const birth_date = formData.get("birth_date") as string;
    const gender = formData.get("gender") as string;
    const address = formData.get("address") as string;
    const parent_name = formData.get("parent_name") as string;
    const parent_phone = formData.get("parent_phone") as string;
    const school_origin = formData.get("school_origin") as string;
    const registration_path = formData.get("registration_path") as string;

    const { error } = await supabase.from("ppdb_registrations").insert({
        nisn,
        full_name,
        birth_place,
        birth_date,
        gender,
        address,
        parent_name,
        parent_phone,
        school_origin,
        registration_path,
        status: "pending",
    });

    if (error) {
        console.error("Error registering student:", error);
        return { error: "Gagal mendaftar. NISN mungkin sudah terdaftar." };
    }

    redirect("/ppdb/success?nisn=" + nisn);
}

export async function checkStatus(formData: FormData) {
    const nisn = formData.get("nisn") as string;

    const { data, error } = await supabase
        .from("ppdb_registrations")
        .select("full_name, status, registration_path")
        .eq("nisn", nisn)
        .single();

    if (error || !data) {
        return { error: "Data tidak ditemukan." };
    }

    return { data };
}

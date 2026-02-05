"use server";

import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export async function saveRegistrationData(prevState: any, formData: FormData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return { error: "Anda harus login terlebih dahulu!" };
    }

    const userId = session.user.id;

    // Helper to get allowed strings or null
    const get = (key: string) => {
        const value = formData.get(key);
        return value ? (value as string) : null;
    };

    // Extract specific fields directly for upsert
    const full_name = get("fullname"); // Mapped to DB column 'full_name'
    const nisn = get("nisn");
    const nik = get("nik");
    const gender = get("gender");
    const birth_place = get("birth_place");
    const birth_date = get("birth_date");
    const religion = get("religion");
    const phone = get("phone"); // Assuming phone is also directly extracted for upsert
    const photo_url = get("photo_url");

    const data = {
        user_id: userId,
        // Data Pribadi
        full_name: full_name,
        ...(nisn ? { nisn } : {}), // Only update NISN if provided
        nik: nik,
        kk: get("kk"),
        gender: gender,
        birth_place: birth_place,
        birth_date: birth_date,
        religion: religion,
        child_order: get("child_order") ? parseInt(get("child_order") as string) : null,
        siblings_count: get("siblings_count") ? parseInt(get("siblings_count") as string) : null,
        hobby: get("hobby"),
        ambition: get("ambition"),

        // Alamat
        address: get("address"),
        village: get("village"),
        district: get("district"),
        city: get("city"),
        postal_code: get("postal_code"),
        distance_to_school: get("distance_to_school"),
        transport: get("transport"),
        travel_time: get("travel_time"),
        phone: get("phone"),

        // KIP
        kip_status: get("kip_status") === "true",
        kip_number: get("kip_number"),

        // Sekolah Asal
        school_origin: get("school_origin"),

        // Data Ayah
        father_name: get("father_name"),
        father_nik: get("father_nik"),
        father_birth_place: get("father_birth_place"),
        father_birth_date: get("father_birth_date"),
        father_education: get("father_education"),
        father_job: get("father_job"),
        father_income: get("father_income"),
        father_phone: get("father_phone"),

        // Data Ibu
        mother_name: get("mother_name"),
        mother_nik: get("mother_nik"),
        mother_birth_place: get("mother_birth_place"),
        mother_birth_date: get("mother_birth_date"),
        mother_education: get("mother_education"),
        mother_job: get("mother_job"),
        mother_income: get("mother_income"),
        mother_phone: get("mother_phone"),

        // Wali (Optional)
        guardian_name: get("guardian_name"),
        guardian_phone: get("guardian_phone"),

        // Photo URL (handled by client upload usually, but if passed hidden)
        photo_url: get("photo_url"),

        // Status awal selalu pending jika baru submit
        // status: "pending" // Jangan update status biar gak reset verifikasi
    };

    // Upsert (Insert or Update) based on user_id? 
    // user_id is foreign key, but ppdb_registrations primary key is 'id'.
    // We should check if exists first or use upsert on a unique constraint.
    // Assuming user_id is unique in registratons table or we query by it.

    // Check existing
    const { data: existing } = await supabase
        .from("ppdb_registrations")
        .select("id")
        .eq("user_id", userId)
        .single();

    let error;

    if (existing) {
        const { error: updateError } = await supabase
            .from("ppdb_registrations")
            .update(data)
            .eq("id", existing.id);
        error = updateError;
    } else {
        const { error: insertError } = await supabase
            .from("ppdb_registrations")
            .insert([data]);
        error = insertError;
    }

    if (error) {
        console.error("Save error:", error);
        return { error: `Gagal menyimpan data: ${error.message}` };
    }

    revalidatePath("/siswa/dashboard");
    revalidatePath("/siswa/formulir");
    return { success: true, message: "Data berhasil disimpan!" };
}

"use server";

import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function registerStudent(prevState: any, formData: FormData) {
    const nisn = formData.get("nisn") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!nisn || !password || !confirmPassword) {
        return { error: "Semua kolom wajib diisi!" };
    }

    if (password !== confirmPassword) {
        return { error: "Password konfirmasi tidak cocok!" };
    }

    if (password.length < 6) {
        return { error: "Password minimal 6 karakter!" };
    }

    // 1. Check if NISN already exists
    const { data: existingUser, error: checkError } = await supabase
        .from("ppdb_users")
        .select("id")
        .eq("nisn", nisn)
        .single();

    if (existingUser) {
        return { error: "NISN sudah terdaftar! Silakan login." };
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create User
    const { data: newUser, error: insertError } = await supabase
        .from("ppdb_users")
        .insert([
            {
                nisn,
                password: hashedPassword,
                role: "student",
            },
        ])
        .select()
        .single();

    if (insertError) {
        console.error("Registration error:", insertError);
        return { error: `Gagal mendaftar: ${insertError.message} (Code: ${insertError.code})` };
    }

    return { success: true, message: "Pendaftaran berhasil! Silakan login." };
}

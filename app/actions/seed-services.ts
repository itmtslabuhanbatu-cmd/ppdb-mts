"use server";

import { createAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

const SERVICES_LIST = [
    "Permohonan legalisasi ijazah",
    "Pelayanan surat keterangan kehilangan ijazah",
    "Pelayanan surat keterangan kerusakan ijazah",
    "Pelayanan kesalahan penulisan ijazah",
    "Pelayanan surat keterangan rekomendasi siswa",
    "Pelayanan surat keterangan kelakuan baik siswa",
    "Penerimaan mutasi siswa keluar",
    "Pelayanan izin penelitian mahasiswa",
    "Pelayanan orang tua/wali siswa",
    "Pelayanan mahasiswa magang/PLP/PKL",
    "Pelayanan informasi madrasah",
    "Pelayanan surat keterangan keaktifan siswa"
];

export async function seedPtspServices() {
    const supabase = createAdminClient();

    try {
        // 1. Get existing services
        const { data: existing, error } = await supabase.from("ptsp_services").select("name");

        if (error) throw error;

        const existingNames = existing.map((s: any) => s.name?.toLowerCase().trim());

        // 2. Find missing services
        const missingServices = SERVICES_LIST.filter(s => !existingNames.includes(s.toLowerCase().trim()));

        if (missingServices.length === 0) {
            return { success: true, message: "Semua layanan sudah tersedia." };
        }

        // 3. Insert missing
        const newServices = missingServices.map(name => ({
            name: name,
            description: "Silahkan lengkapi persyaratan pada form.",
            estimated_days: 3, // Default estimation
            requirements: ["Surat Permohonan", "Identitas Diri"] // Default requirements
        }));

        const { error: insertError } = await supabase.from("ptsp_services").insert(newServices);

        if (insertError) throw insertError;

        revalidatePath("/ptsp");
        revalidatePath("/admin/ptsp");

        return { success: true, message: `Berhasil menambahkan ${missingServices.length} layanan baru.` };
    } catch (err: any) {
        console.error("Error seeding services:", err);
        return { error: "Gagal menyinkronkan layanan database." };
    }
}

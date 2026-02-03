"use server";

import { createClient, createAdminClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { sendTelegramNotification } from "@/lib/telegram";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getPtspServices() {
    // Services are public, standard client is fine
    const supabase = createClient();
    const { data, error } = await supabase
        .from("ptsp_services")
        .select("*")
        .order("name");

    if (error) {
        console.error("Error fetching services:", error);
        return [];
    }
    return data;
}

export async function createPtspRequest(prevState: any, formData: FormData) {
    // Use Admin Client to bypass RLS since we auth via NextAuth
    const supabase = createAdminClient();

    // Get current user from NextAuth
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return { error: "Anda harus login untuk mengajukan permohonan." };
    }

    const serviceId = formData.get("serviceId") as string;
    const fullName = formData.get("fullName") as string;
    const details = formData.get("details") as string;
    const serviceName = formData.get("serviceName") as string;

    if (!serviceId || !fullName) {
        return { error: "Mohon lengkapi formulir." };
    }

    try {
        const { error } = await supabase.from("ptsp_requests").insert({
            user_id: user.id,
            service_id: serviceId,
            full_name: fullName,
            details: details,
            status: "PENDING"
        });

        if (error) throw error;

        // Send Telegram Notification
        const message = `
🔔 <b>Request PTSP Baru!</b>

👤 <b>Nama:</b> ${fullName}
Pg <b>Layanan:</b> ${serviceName}
📝 <b>Detail:</b> ${details || "-"}

<i>Segera cek dashboard admin!</i>
    `.trim();

        await sendTelegramNotification(message);

        revalidatePath("/ptsp");
        revalidatePath("/admin/ptsp");

        return { success: true, message: "Permohonan berhasil dikirim!" };
    } catch (err: any) {
        console.error("Error submit PTSP:", err);
        return { error: "Gagal mengirim permohonan. Silahkan coba lagi." };
    }
}

export async function getUserRequests() {
    const supabase = createAdminClient();
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) return [];

    // Filter manually by user.id since we are admin
    const { data, error } = await supabase
        .from("ptsp_requests")
        .select(`
      *,
      ptsp_services (name)
    `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching user requests:", error);
        return [];
    }

    return data;
}

export async function getAllRequests() {
    const supabase = createAdminClient();

    // Check credentials if needed, but assuming middleware/layout protects this route
    // Ideally we check session role here too

    const { data, error } = await supabase
        .from("ptsp_requests")
        .select(`
        *,
        ptsp_services (name)
      `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching all requests:", error);
        return [];
    }

    return data;
}

export async function updateRequestStatus(requestId: string, newStatus: string, adminNotes: string) {
    const supabase = createAdminClient();

    try {
        const { error } = await supabase
            .from("ptsp_requests")
            .update({
                status: newStatus,
                admin_notes: adminNotes,
                updated_at: new Date().toISOString()
            })
            .eq("id", requestId);

        if (error) throw error;

        revalidatePath("/admin/ptsp");
        revalidatePath("/ptsp");

        return { success: true, message: "Status berhasil diperbarui" };
    } catch (err: any) {
        console.error("Error updating status:", err);
        return { error: "Gagal update status" };
    }
}

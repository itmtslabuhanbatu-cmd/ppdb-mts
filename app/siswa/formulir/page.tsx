import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PPDBForm from "./form";

export default async function FormulirPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
        redirect("/ppdb/login");
    }

    // Fetch existing registration data
    const { data: registration } = await supabase
        .from("ppdb_registrations")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="bg-green-700 p-6 text-white text-center">
                    <h1 className="text-2xl font-bold">Formulir Pendaftaran PPDB</h1>
                    <p className="opacity-90">Lengkapi data di bawah ini dengan benar dan jujur.</p>
                </div>

                <div className="p-6">
                    <PPDBForm initialData={registration || {}} userId={session.user.id} />
                </div>
            </div>
        </div>
    );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Printer, User } from "lucide-react";

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
        redirect("/ppdb/login");
    }

    // Check if registration exists
    const { data: registration } = await supabase
        .from("ppdb_registrations")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

    // Determine status
    const hasFilledForm = !!registration;
    const isVerified = registration?.status === "verified";

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-6">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard Siswa</h1>
                        <p className="text-gray-500">Selamat datang, <span className="font-semibold text-green-700">{session.user.name}</span></p>
                    </div>
                    {/* Logout button would be here usually, or handled in navbar */}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status Card */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Status Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${hasFilledForm ? 'bg-blue-100 text-blue-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        {hasFilledForm ? "Formulir Terisi" : "Belum Mengisi Formulir"}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        {hasFilledForm
                                            ? "Data Anda sudah tersimpan. Silakan cetak bukti pendaftaran."
                                            : "Silakan lengkapi formulir pendaftaran untuk melanjutkan."}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action: Isi Formulir */}
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User size={20} />
                                Biodata & Formulir
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500 text-sm mb-4">
                                Lengkapi data diri, data orang tua, dan asal sekolah sesuai format PPDB.
                            </p>
                            <Button asChild className="w-full" variant={hasFilledForm ? "outline" : "default"}>
                                <Link href="/siswa/formulir">
                                    {hasFilledForm ? "Edit Data" : "Isi Formulir Sekarang"}
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Action: Cetak Kartu */}
                    <Card className={`hover:shadow-md transition-shadow ${!hasFilledForm ? 'opacity-75' : ''}`}>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Printer size={20} />
                                Cetak Kartu
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-500 text-sm mb-4">
                                Download Kartu Ujian dan Bukti Pendaftaran (Hanya jika data sudah lengkap).
                            </p>
                            <Button asChild className="w-full" disabled={!hasFilledForm} variant="secondary">
                                <Link href="/siswa/cetak">
                                    Cetak Dokumen
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

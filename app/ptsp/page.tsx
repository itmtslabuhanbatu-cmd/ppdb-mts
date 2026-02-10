import { createClient } from "@/lib/supabase";
import { getPtspServices, getUserRequests } from "@/app/actions/ptsp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, PlusCircle } from "lucide-react";
import PtspRequestForm from "./form";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function PtspPage() {
    // Determine user session via NextAuth, which is what the login page uses
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const services = await getPtspServices();
    const myRequests = await getUserRequests();

    return (
        <div className="min-h-screen bg-white pb-12">
            {/* Header / Banner area matching the image somewhat */}
            <div className="bg-sky-50 pt-8 pb-8 px-4 text-center border-b border-sky-100 mb-8">
                <div className="inline-block bg-blue-900 text-white px-8 py-2 rounded-full border-4 border-yellow-400 shadow-lg mb-4">
                    <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider">Pengajuan Layanan</h1>
                </div>

            </div>

            <div className="container px-4 md:px-8 max-w-4xl mx-auto space-y-8">
                {/* Info Text Section */}
                <div className="space-y-6 text-slate-700">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-bold text-sky-800 mb-2">Selamat Datang di PTSP Online</h2>
                            <p className="leading-relaxed">
                                Pelayanan merupakan salah satu yang wajib menjadi prioritas dalam sebuah lembaga pendidikan. Pelayanan juga dapat menjadi cermin kualitas dari sebuah kelembagaan. Dengan adanya inovasi dan kualitas pelayanan yang baik, maka kualitas kelembagaan tersebut juga menjadi semakin baik. Saat ini harapan dari masyarakat adalah kemudahan dalam mengakses layanan dari sebuah kelembagaan.
                            </p>
                        </div>
                        <div className="bg-sky-50 p-6 rounded-xl border border-sky-100">
                            <h2 className="text-xl font-bold text-sky-800 mb-2">Memberikan Kemudahan</h2>
                            <p className="leading-relaxed">
                                Dengan adanya Digitalisasi Layanan/ PTSP Online MTsN 1 Labuhanbatu ini, maka masyarakat/ pemohon layanan akan mendapatkan kemudahan karena bisa diakses darimana saja dan kapan saja.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                            <h2 className="text-xl font-bold text-emerald-800 mb-2">Kepastian Layanan</h2>
                            <p className="leading-relaxed">
                                Dengan adanya Digitalisasi Layanan/ PTSP Online MTsN 1 Labuhanbatu ini, maka masyarakat/ pemohon layanan akan mendapatkan kepastian layanan karena progress bisa dipantau secara realtime.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-blue-800 mb-2">Terintegrasi dan Transparan</h2>
                            <p className="leading-relaxed">
                                Semua layanan yang disediakan melalui PTSP Online MTsN 1 Labuhanbatu ini bersifat transparan dan kedepannya akan terintegrasi dengan sistem PTSP Kankemenag Kab/ Kota dan Kanwil Kemenag Provinsi.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-200 my-8"></div>

                <p className="text-slate-600 text-center max-w-xl mx-auto text-sm md:text-base mb-8">
                    Untuk mengajukan layanan pada PTSP Online MTsN 1 Labuhanbatu, Silakan pilih terlebih dahulu daftar layanan yang tersedia di bawah ini:
                </p>

                <Tabs defaultValue="services" className="space-y-8">
                    <div className="flex justify-center">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="services">Daftar Layanan</TabsTrigger>
                            {user ? (
                                <TabsTrigger value="history">Riwayat Permohonan</TabsTrigger>
                            ) : (
                                <TabsTrigger value="history" disabled className="opacity-50 cursor-not-allowed" title="Login untuk melihat riwayat">Riwayat (Login)</TabsTrigger>
                            )}
                        </TabsList>
                    </div>

                    <TabsContent value="services" className="animate-in fade-in slide-in-from-left-4">
                        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
                            <ul className="space-y-4">
                                {SERVICES_LIST.map((itemName, index) => {
                                    // Find matching service from DB
                                    const service = services.find((s: any) => s.name?.toLowerCase().trim() === itemName.toLowerCase().trim());
                                    const isAvailable = !!service;
                                    const rowNumber = index + 1; // 1, 2, 3...

                                    return (
                                        <li key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                                            <span className="text-purple-700 font-bold text-lg min-w-[2rem] text-right">
                                                {rowNumber < 10 ? `0${rowNumber}` : rowNumber}.
                                            </span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between flex-wrap gap-2">
                                                    <span className="text-slate-700 font-medium text-lg">{itemName}</span>
                                                    {isAvailable ? (
                                                        <PtspRequestForm service={service} user={user} />
                                                    ) : (
                                                        <Badge variant="outline" className="text-slate-400 border-slate-200">
                                                            Belum Tersedia
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </TabsContent>

                    {user && (
                        <TabsContent value="history" className="animate-in fade-in slide-in-from-left-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Riwayat Permohonan Anda</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {myRequests.length === 0 ? (
                                        <div className="text-center py-8 text-muted-foreground">
                                            Belum ada permohonan yang diajukan.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {myRequests.map((req: any) => (
                                                <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors gap-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="mt-1">
                                                            {getStatusIcon(req.status)}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-slate-800">{req.ptsp_services?.name || "Layanan Dihapus"}</h4>
                                                            <p className="text-sm text-slate-500">
                                                                Diajukan: {new Date(req.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                                                            </p>
                                                            {/* Details are now structured text, showing simple preview or hiding it is better */}
                                                            {req.admin_notes && (
                                                                <div className="text-sm text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                                                                    <span className="font-semibold">Catatan Admin:</span> {req.admin_notes}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Badge className={`${getStatusColor(req.status)} px-3 py-1`}>
                                                            {getStatusLabel(req.status)}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
}

// Hardcoded list from the image (excluding #1 which was "Pelayanan pengaduan masyarakat")
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

function getStatusIcon(status: string) {
    switch (status) {
        case "COMPLETED": return <CheckCircle className="h-5 w-5 text-green-500" />;
        case "PROCESSED": return <Clock className="h-5 w-5 text-blue-500" />;
        case "REJECTED": return <XCircle className="h-5 w-5 text-red-500" />;
        default: return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
}

function getStatusColor(status: string) {
    switch (status) {
        case "COMPLETED": return "bg-green-100 text-green-800 hover:bg-green-200";
        case "PROCESSED": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
        case "REJECTED": return "bg-red-100 text-red-800 hover:bg-red-200";
        default: return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
    }
}

function getStatusLabel(status: string) {
    switch (status) {
        case "COMPLETED": return "Selesai (Siap Diambil)";
        case "PROCESSED": return "Sedang Diproses";
        case "REJECTED": return "Ditolak";
        default: return "Menunggu";
    }
}

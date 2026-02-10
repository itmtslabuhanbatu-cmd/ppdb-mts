// PTSP & Telegram Integration Added
import { getSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, UserPlus, Calendar, FileText, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
// import { checkStatus } from "@/app/actions/ppdb-public"; // Unused in this view
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PPDBPage() {
    let ppdbInfo: any = {};
    try {
        ppdbInfo = await getSettings("ppdb_info") || {};
    } catch (e) {
        console.error("Failed to fetch ppdb info", e);
    }

    // Defaults / Fallbacks
    const academicYear = ppdbInfo.academic_year || "2025/2026";
    const scheduleItems = ppdbInfo.schedule_items || [
        { label: "Pendaftaran Online", value: "22 - 27 Mei 2025" },
        { label: "Pengantaran Berkas", value: "22 - 28 Mei 2025" },
        { label: "Simulasi Tes Potensi Akademik", value: "02 Juni 2025" },
        { label: "Tes Potensi Akademik", value: "05 Juni 2025" },
        { label: "Tes Praktek", value: "10 - 14 Juni 2025" },
        { label: "Pengumuman Kelulusan", value: "19 Juni 2025" },
        { label: "Daftar Ulang", value: "20 - 21 Juni 2025" }
    ];
    const scheduleNote = ppdbInfo.schedule_note || "Untuk informasi waktu simulasi tes potensi akademik, tes potensi akademik, dan tes praktek akan disampaikan dilaman: https://mtsnegeri1labuhanbatu.sch.id";

    const requirements = ppdbInfo.requirements && ppdbInfo.requirements.length > 0 ? ppdbInfo.requirements : [
        "Berusia maksimal 15 tahun pada tanggal 01 Juli 2025.",
        "Memiliki Surat Keterangan Aktif Bersekolah duduk dikelas VI (Enam) di SD/MI pada saat mendaftar.",
        "Memiliki Akta Kelahiran/Surat Keterangan Lahir yang dikeluarkan oleh pihak yang berwenang."
    ];

    const documents = ppdbInfo.documents && ppdbInfo.documents.length > 0 ? ppdbInfo.documents : [
        "Surat Keterangan Aktif Sekolah dari SD/MI asal.",
        "Pas Foto ukuran 3x4: 1 Lembar (Latar Belakang Merah) dan diupload pada saat pendaftaran.",
        "Foto Copy Kartu Keluarga 1 Lembar.",
        "Foto Copy Akta Kelahiran 1 Lembar.",
        "Foto Copy Sertifikat Prestasi Akademik / Non Akademik Juara 1, 2 atau 3 Minimal Tingkat Kabupaten Jika Ada.",
        "Foto Copy KIP/PKH/KKS/SKTM (Memiliki ID BDT) yang diterbitkan oleh Pemerintah Daerah Jika Ada (Jalur Afirmasi)."
    ];

    const procedures = ppdbInfo.procedures && ppdbInfo.procedures.length > 0 ? ppdbInfo.procedures : [
        "Lengkapi berkas pendaftaran.",
        "Kunjungi situs https://mtsnegeri1labuhanbatu.sch.id/ppdb untuk melakukan pendaftaran online.",
        "Buat akun dan isi formulir isian yang ada sesuai data yang benar (Ingat User dan Password).",
        "Cetak Kartu Tanda Pendaftaran dan Formulir yang sudah diisi lengkap dan benar.",
        "Kartu Tanda Pendaftaran, Formulir dan Berkas Pendaftaran disampaikan ke Panitia PPDB MTsN 1 Labuhanbatu paling lama pada tanggal 28 Mei 2025 Pukul 12.00 WIB."
    ];

    const contact = ppdbInfo.contact || {
        address: "Jl. Kampung Baru Gg. Tsanawiyah No 150, Rantau Prapat",
        phone1: "0823 7027 2116",
        phone2: "0851 2206 4243",
        work_hours: "08.00 - 14.00 WIB"
    };


    return (
        <div className="container py-12">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Penerimaan Murid Baru Madrasah (PMBM)
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Tahun Pelajaran {academicYear}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column: Info & Schedule */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Jadwal Pendaftaran */}
                    <Card className="border-l-4 border-l-primary shadow-md">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-6 w-6 text-primary" />
                                <CardTitle>Waktu Pendaftaran</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {scheduleItems.map((item: any, idx: number) => (
                                    <div key={idx} className={`space-y-1 ${idx === scheduleItems.length - 1 && scheduleItems.length % 2 !== 0 ? "sm:col-span-2" : ""}`}>
                                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                        <p className="font-semibold">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                            {scheduleNote && (
                                <div className="mt-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 border border-yellow-200">
                                    <p className="flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                        <span>{scheduleNote}</span>
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Syarat & Berkas */}
                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-6 w-6 text-primary" />
                                    <CardTitle>Syarat Pendaftaran</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                                    {requirements.map((req: string, idx: number) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-primary" />
                                    <CardTitle>Berkas Pendaftaran</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
                                    {documents.map((doc: string, idx: number) => (
                                        <li key={idx}>{doc}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tata Cara */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Tata Cara Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
                                {procedures.map((proc: string, idx: number) => (
                                    <li key={idx}>{proc}</li>
                                ))}
                            </ol>

                            <div className="mt-6">
                                <p className="font-semibold mb-2 text-sm">Menggunakan Map Plastik dengan Ketentuan:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-green-100 border border-green-200 p-3 rounded-md text-center">
                                        <span className="block font-bold text-green-800">JALUR UMUM</span>
                                        <span className="text-xs text-green-700">Map Hijau</span>
                                    </div>
                                    <div className="bg-yellow-100 border border-yellow-200 p-3 rounded-md text-center">
                                        <span className="block font-bold text-yellow-800">JALUR PRESTASI</span>
                                        <span className="text-xs text-yellow-700">Map Kuning</span>
                                    </div>
                                    <div className="bg-red-100 border border-red-200 p-3 rounded-md text-center">
                                        <span className="block font-bold text-red-800">JALUR AFIRMASI</span>
                                        <span className="text-xs text-red-700">Map Merah</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Form & Check Status */}
                <div className="space-y-8">
                    {/* Status Check */}
                    <Card className="bg-slate-50 border-slate-200">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Search className="h-6 w-6 text-primary" />
                                <CardTitle>Cek Status Pendaftaran</CardTitle>
                            </div>
                            <CardDescription>
                                Masukkan NISN untuk melihat status.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <p className="text-sm text-gray-500">Sudah mendaftar? Silakan login untuk melihat status & cetak kartu.</p>
                                <Button asChild variant="outline" className="w-full">
                                    <Link href="/ppdb/login">Login Siswa</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Registration Form Preview */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <UserPlus className="h-6 w-6 text-primary" />
                                <CardTitle>Formulir Pendaftaran</CardTitle>
                            </div>
                            <CardDescription>
                                Silahkan isi formulir pendaftaran secara online.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button asChild className="w-full bg-primary hover:bg-primary/90">
                                <Link href="/ppdb/register-account">Buat Akun & Daftar</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                            <CardTitle className="text-white">Informasi Pendaftaran</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <p>
                                <strong>Alamat:</strong><br />
                                {contact.address}
                            </p>
                            <p>
                                <strong>Kontak Panitia (WA):</strong><br />
                                {contact.phone1}<br />
                                {contact.phone2}
                            </p>
                            <p className="text-xs opacity-80 mt-4">
                                *Pelayanan informasi pada jam kerja ({contact.work_hours})
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

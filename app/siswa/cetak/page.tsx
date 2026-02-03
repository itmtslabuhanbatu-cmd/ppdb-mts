import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Printer, CreditCard } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function HalamanCetak() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/ppdb/login");

    // Helper to check if data is filled
    const { data: reg } = await supabase
        .from("ppdb_registrations")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

    const isDataFilled = !!reg;

    return (
        <div className="container py-10 px-4 md:px-8">
            <h1 className="text-3xl font-bold text-green-800 mb-8">Cetak Dokumen</h1>

            {!isDataFilled && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                    <p className="text-yellow-700">
                        ⚠️ Anda belum melengkapi data pendaftaran. Silakan <Link href="/siswa/formulir" className="underline font-bold">isi formulir</Link> terlebih dahulu.
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kartu Pendaftaran */}
                <Card className={!isDataFilled ? "opacity-60 pointer-events-none" : ""}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                <CreditCard size={32} />
                            </div>
                            <div>
                                <CardTitle>Kartu Tanda Pendaftaran</CardTitle>
                                <CardDescription>Bukti pendaftaran yang sah.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 text-sm text-gray-600">
                            Kartu ini wajib dibawa saat melakukan verifikasi berkas fisik di sekolah.
                        </div>
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                            <Link href="/siswa/cetak/kartu" target="_blank">
                                <Printer className="mr-2 h-4 w-4" />
                                Cetak Kartu
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* Formulir Pendaftaran */}
                <Card className={!isDataFilled ? "opacity-60 pointer-events-none" : ""}>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-green-100 rounded-lg text-green-600">
                                <FileText size={32} />
                            </div>
                            <div>
                                <CardTitle>Formulir Pendaftaran</CardTitle>
                                <CardDescription>Lembar isian data siswa lengkap.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 text-sm text-gray-600">
                            Cetak formulir ini, tempel pas foto, dan tanda tangani oleh Siswa & Orang Tua.
                        </div>
                        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                            <Link href="/siswa/cetak/formulir" target="_blank">
                                <Printer className="mr-2 h-4 w-4" />
                                Cetak Formulir
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

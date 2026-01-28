import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Clock, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StatusPage({ searchParams }: { searchParams: { nisn?: string; error?: string } }) {
    let studentData = null;

    if (searchParams.nisn) {
        const { data } = await supabase
            .from("ppdb_registrations")
            .select("*")
            .eq("nisn", searchParams.nisn)
            .single();
        studentData = data;
    }

    return (
        <div className="container py-20 flex justify-center">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle className="text-center">Status Pendaftaran</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {searchParams.error === "not_found" && (
                        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-3 text-red-800">
                            <AlertCircle className="h-6 w-6 shrink-0" />
                            <div>
                                <p className="font-bold">Data Tidak Ditemukan</p>
                                <p className="text-sm">NISN tidak terdaftar dalam sistem kami.</p>
                            </div>
                        </div>
                    )}

                    {studentData && (
                        <div className="space-y-4">
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">Nama Calon Siswa</p>
                                <p className="text-xl font-bold text-primary">{studentData.full_name}</p>
                                <p className="text-sm font-mono mt-1">{studentData.nisn}</p>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-lg border">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-muted-foreground">Jalur</span>
                                    <span className="font-medium capitalize">{studentData.registration_path}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-bold capitalize ${studentData.status === "verified" ? "bg-green-100 text-green-800" :
                                        studentData.status === "rejected" ? "bg-red-100 text-red-800" :
                                            "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {studentData.status === "verified" && <CheckCircle className="h-3.5 w-3.5" />}
                                        {studentData.status === "rejected" && <XCircle className="h-3.5 w-3.5" />}
                                        {studentData.status === "pending" && <Clock className="h-3.5 w-3.5" />}
                                        {studentData.status}
                                    </span>
                                </div>
                            </div>

                            {studentData.status === "verified" && (
                                <div className="bg-green-50 p-4 rounded-lg text-sm text-green-800">
                                    Selamat! Berkas Anda telah diverifikasi. Silahkan cetak kartu ujian dan tunggu jadwal tes selanjutnya.
                                </div>
                            )}
                        </div>
                    )}

                    <Button asChild className="w-full" variant="outline">
                        <Link href="/ppdb">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke PPDB
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Printer } from "lucide-react";
import Link from "next/link";

export default function SuccessPage({ searchParams }: { searchParams: { nisn: string } }) {
    return (
        <div className="container py-20 flex justify-center">
            <Card className="max-w-md w-full text-center">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    <CardTitle className="text-2xl text-green-600">Pendaftaran Berhasil!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-muted-foreground">
                        Data pendaftaran Anda telah kami terima. Silahkan simpan NISN Anda untuk mengecek status kelulusan secara berkala.
                    </p>

                    <div className="bg-slate-100 p-4 rounded-lg">
                        <p className="text-sm text-slate-500 mb-1">NISN Terdaftar:</p>
                        <p className="text-2xl font-mono font-bold tracking-wider">{searchParams.nisn}</p>
                    </div>

                    <div className="space-y-3">
                        <Button className="w-full" variant="outline">
                            <Printer className="mr-2 h-4 w-4" />
                            Cetak Bukti Pendaftaran
                        </Button>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                            <Link href="/ppdb">Kembali ke Halaman PPDB</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

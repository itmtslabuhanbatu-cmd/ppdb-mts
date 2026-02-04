import Link from "next/link";
import { getRegistrants, updateStatus } from "@/app/actions/ppdb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X, FileText, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPPDBPage() {
    let registrants = [];
    try {
        registrants = await getRegistrants();
    } catch (error) {
        console.error("Failed to fetch registrants:", error);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Data PPDB</h1>
                <Button variant="outline">Export Excel</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Pendaftar Masuk</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">NISN</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Nama Lengkap</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Asal Sekolah</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Jalur</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {registrants.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                            Belum ada pendaftar.
                                        </td>
                                    </tr>
                                ) : (
                                    registrants.map((reg: any) => (
                                        <tr key={reg.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-mono">{reg.nisn}</td>
                                            <td className="p-4 align-middle font-medium">{reg.full_name}</td>
                                            <td className="p-4 align-middle">{reg.school_origin}</td>
                                            <td className="p-4 align-middle capitalize">{reg.registration_path}</td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${reg.status === "verified" ? "bg-green-100 text-green-800" :
                                                    reg.status === "rejected" ? "bg-red-100 text-red-800" :
                                                        "bg-yellow-100 text-yellow-800"
                                                    }`}>
                                                    {reg.status}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <form action={updateStatus.bind(null, reg.id, "verified")}>
                                                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-green-600" title="Verifikasi">
                                                            <Check className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                    <form action={updateStatus.bind(null, reg.id, "rejected")}>
                                                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-600" title="Tolak">
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

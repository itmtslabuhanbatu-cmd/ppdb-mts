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
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container px-4 md:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Layanan Terpadu Satu Pintu (PTSP)</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Ajukan permohonan surat menyurat dan administrasi madrasah secara online.
                        Hemat waktu, pantau status dari rumah.
                    </p>
                </div>

                {!user ? (
                    <Card className="max-w-md mx-auto text-center py-8">
                        <CardContent>
                            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Login Diperlukan</h3>
                            <p className="text-slate-500 mb-6">Silahkan login terlebih dahulu untuk mengajukan permohonan.</p>
                            <Button asChild>
                                <Link href="/ppdb/login?callbackUrl=/ptsp">Login / Register</Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Tabs defaultValue="services" className="space-y-8">
                        <div className="flex justify-center">
                            <TabsList className="grid w-full max-w-md grid-cols-2">
                                <TabsTrigger value="services">Daftar Layanan</TabsTrigger>
                                <TabsTrigger value="history">Riwayat Permohonan</TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="services" className="animate-in fade-in slide-in-from-bottom-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {services.length === 0 ? (
                                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed">
                                        <p className="text-muted-foreground">Belum ada jenis layanan yang tersedia. Hubungi admin.</p>
                                    </div>
                                ) : (
                                    services.map((service: any) => (
                                        <Card key={service.id} className="flex flex-col h-full hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
                                            <CardHeader>
                                                <CardTitle className="flex items-start justify-between gap-2">
                                                    <span>{service.name}</span>
                                                    <Badge variant="outline" className="shrink-0">{service.estimated_days} Hari</Badge>
                                                </CardTitle>
                                                <CardDescription>{service.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="flex-1">
                                                <h4 className="font-semibold text-sm mb-2 text-slate-700">Persyaratan:</h4>
                                                <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                                                    {service.requirements?.map((req: string, i: number) => (
                                                        <li key={i}>{req}</li>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardFooter className="pt-4 border-t bg-slate-50/50">
                                                <PtspRequestForm service={service} user={user} />
                                            </CardFooter>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="history" className="animate-in fade-in slide-in-from-bottom-4">
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
                                                            {req.details && (
                                                                <p className="text-xs text-slate-400 mt-1 italic">"{req.details}"</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        {req.admin_notes && (
                                                            <div className="text-right text-sm">
                                                                <span className="font-semibold text-slate-700 block">Catatan Admin:</span>
                                                                <span className="text-slate-600">{req.admin_notes}</span>
                                                            </div>
                                                        )}
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
                    </Tabs>
                )}
            </div>
        </div>
    );
}

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

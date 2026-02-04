import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllRequests } from "@/app/actions/ptsp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle, AlertCircle, Phone, User, ArrowLeft } from "lucide-react";
import AdminPtspCard from "./card";
import SeedButton from "./seed-button";

export const dynamic = "force-dynamic";

export default async function AdminPtspPage() {
    const requests = await getAllRequests();

    const pendingRequests = requests.filter((r: any) => r.status === "PENDING");
    const processedRequests = requests.filter((r: any) => r.status === "PROCESSED");
    const completedRequests = requests.filter((r: any) => r.status === "COMPLETED" || r.status === "REJECTED");

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard PTSP</h1>
                    <p className="text-slate-500">Kelola permohonan layanan surat & administrasi.</p>
                </div>
                <SeedButton />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Permohonan Baru</CardTitle>
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingRequests.length}</div>
                        <p className="text-xs text-muted-foreground">Perlu segera diproses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sedang Diproses</CardTitle>
                        <Clock className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{processedRequests.length}</div>
                        <p className="text-xs text-muted-foreground">Dalam pengerjaan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Selesai (Bulan Ini)</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedRequests.length}</div>
                        <p className="text-xs text-muted-foreground">Arsip layanan selesai</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="pending" className="relative">
                        Masuk
                        {pendingRequests.length > 0 && (
                            <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingRequests.length}</span>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="processed">Diproses</TabsTrigger>
                    <TabsTrigger value="history">Riwayat Selesai</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                    {pendingRequests.length === 0 ? (
                        <EmptyState message="Tidak ada permohonan baru." />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {pendingRequests.map((req: any) => (
                                <AdminPtspCard key={req.id} request={req} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="processed" className="space-y-4">
                    {processedRequests.length === 0 ? (
                        <EmptyState message="Tidak ada yang sedang diproses." />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {processedRequests.map((req: any) => (
                                <AdminPtspCard key={req.id} request={req} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    {completedRequests.length === 0 ? (
                        <EmptyState message="Belum ada riwayat selesai." />
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {completedRequests.map((req: any) => (
                                <AdminPtspCard key={req.id} request={req} />
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}

function EmptyState({ message }: { message: string }) {
    return (
        <div className="flex h-[200px] shrink-0 items-center justify-center rounded-md border border-dashed text-slate-400">
            {message}
        </div>
    )
}

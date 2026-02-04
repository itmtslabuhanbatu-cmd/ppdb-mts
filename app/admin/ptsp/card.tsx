"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateRequestStatus } from "@/app/actions/ptsp";
import { toast } from "sonner";
import { Loader2, Check, X, ArrowRight, Clock } from "lucide-react";

export default function AdminPtspCard({ request }: { request: any }) {
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [targetStatus, setTargetStatus] = useState("");
    const [notes, setNotes] = useState(request.admin_notes || "");

    const handleAction = (status: string) => {
        setTargetStatus(status);
        setDialogOpen(true);
    };

    const confirmUpdate = async () => {
        setLoading(true);
        try {
            const res = await updateRequestStatus(request.id, targetStatus, notes);
            if (res.success) {
                toast.success("Status berhasil diperbarui");
                setDialogOpen(false);
            } else {
                toast.error("Gagal update status");
            }
        } catch (e) {
            toast.error("Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className={`h-1 w-full ${getStatusColor(request.status)}`} />
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h3 className="font-bold text-slate-800 line-clamp-1">{request.full_name}</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                {new Date(request.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        <Badge variant="outline" className="shrink-0">{request.status}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                    <div className="bg-slate-50 p-2 rounded-md mb-3 border border-slate-100">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Layanan</p>
                        <p className="font-medium text-sm text-slate-900">{request.ptsp_services?.name}</p>
                    </div>
                    {request.details && (
                        <div className="text-sm text-slate-600 italic whitespace-pre-wrap bg-slate-50 p-2 rounded border border-slate-100 mt-2">
                            {request.details}
                        </div>
                    )}
                    {request.admin_notes && (
                        <div className="mt-3 pt-3 border-t text-xs">
                            <span className="font-semibold text-slate-700 block mb-1">Catatan Anda:</span>
                            <span className="text-slate-500">{request.admin_notes}</span>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="pt-0 gap-2">
                    {request.status === "PENDING" && (
                        <>
                            <Button size="sm" variant="outline" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200" onClick={() => handleAction("REJECTED")}>
                                <X className="h-4 w-4 mr-1" /> Tolak
                            </Button>
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleAction("PROCESSED")}>
                                <ArrowRight className="h-4 w-4 mr-1" /> Proses
                            </Button>
                        </>
                    )}
                    {request.status === "PROCESSED" && (
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleAction("COMPLETED")}>
                            <Check className="h-4 w-4 mr-1" /> Selesai (Siap Ambil)
                        </Button>
                    )}
                    {(request.status === "COMPLETED" || request.status === "REJECTED") && (
                        <Button size="sm" variant="ghost" className="w-full text-muted-foreground" disabled>
                            Arsip
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Status: {targetStatus}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Catatan untuk Pemohon (Opsional)</Label>
                            <Textarea
                                placeholder="Contoh: Silahkan diambil hari Senin jam 09.00"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setDialogOpen(false)} disabled={loading}>Batal</Button>
                        <Button onClick={confirmUpdate} disabled={loading} className={targetStatus === "REJECTED" ? "bg-red-600 hover:bg-red-700" : "bg-primary"}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Konfirmasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

function getStatusColor(status: string) {
    switch (status) {
        case "COMPLETED": return "bg-green-500";
        case "PROCESSED": return "bg-blue-500";
        case "REJECTED": return "bg-red-500";
        default: return "bg-yellow-500";
    }
}

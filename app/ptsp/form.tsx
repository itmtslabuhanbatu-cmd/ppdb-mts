"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPtspRequest } from "@/app/actions/ptsp";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function PtspRequestForm({ service, user }: { service: any, user: any }) {
    const [open, setOpen] = useState(false);

    async function onSubmit(formData: FormData) {
        const res = await createPtspRequest(null, formData);
        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success(res?.message || "Permohonan berhasil!");
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-green-600 hover:bg-green-700">Ajukan Permohonan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Ajukan {service.name}</DialogTitle>
                    <DialogDescription>
                        Pastikan data yang anda masukkan benar.
                    </DialogDescription>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4">
                    <input type="hidden" name="serviceId" value={service.id} />
                    <input type="hidden" name="serviceName" value={service.name} />

                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nama Lengkap (Sesuai Ijazah/Dokumen)</Label>
                        <Input id="fullName" name="fullName" defaultValue={user.user_metadata?.full_name || user.email} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="details">Keterangan Tambahan / Detail Kebutuhan</Label>
                        <Textarea
                            id="details"
                            name="details"
                            placeholder="Contoh: Untuk keperluan pendaftaran TNI, butuh legalisir 5 lembar."
                            className="h-24"
                        />
                    </div>

                    <DialogFooter>
                        <SubmitButton />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengirim...</> : "Kirim Permohonan"}
        </Button>
    );
}

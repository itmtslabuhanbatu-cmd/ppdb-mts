"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createPtspRequest } from "@/app/actions/ptsp";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import FileUpload from "@/components/FileUpload";

export default function PtspRequestForm({ service, user }: { service: any, user: any }) {
    const [open, setOpen] = useState(false);
    const [attachmentUrl, setAttachmentUrl] = useState("");

    async function onSubmit(formData: FormData) {
        // Append manual file url if needed or just let the action handle logic? 
        // The file upload component handles the upload and gives us a URL.
        // We need to pass this URL to the action.
        formData.append("attachmentUrl", attachmentUrl);

        const res = await createPtspRequest(null, formData);
        if (res?.error) {
            toast.error(res.error);
        } else {
            toast.success(res?.message || "Permohonan berhasil!");
            setOpen(false);
            setAttachmentUrl(""); // Reset
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Ajukan Permohonan</Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Ajukan {service.name}</SheetTitle>
                    <SheetDescription>
                        Isi form berikut dengan data siswa yang valid.
                    </SheetDescription>
                </SheetHeader>
                <form action={onSubmit} className="space-y-4 mt-6">
                    <input type="hidden" name="serviceId" value={service.id} />
                    <input type="hidden" name="serviceName" value={service.name} />

                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nama Siswa</Label>
                        <Input id="fullName" name="fullName" placeholder="Nama Lengkap Siswa" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nisn">NISN</Label>
                            <Input id="nisn" name="nisn" placeholder="Nomor NISN" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="kelas">Kelas</Label>
                            <Input id="kelas" name="kelas" placeholder="Contoh: IX-B" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ttl">Tempat, Tanggal Lahir</Label>
                        <Input id="ttl" name="ttl" placeholder="Contoh: Rantauprapat, 01 Januari 2010" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="parentsName">Nama Orang Tua</Label>
                        <Input id="parentsName" name="parentsName" placeholder="Nama Ayah / Ibu" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Textarea id="address" name="address" placeholder="Alamat lengkap siswa..." className="h-20" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">Nomor WhatsApp (Aktif)</Label>
                        <Input id="whatsapp" name="whatsapp" type="tel" placeholder="08..." required />
                        <p className="text-[10px] text-muted-foreground">Notifikasi status akan diperbarui via web, pastikan nomor aktif untuk konfirmasi jika perlu.</p>
                    </div>

                    <div className="space-y-2">
                        <Label>Lampiran Surat / Dokumen Pendukung</Label>
                        <FileUpload onUpload={setAttachmentUrl} bucket="images" label="Upload File (Scan/Foto)" />
                        <input type="hidden" name="hasAttachment" value={attachmentUrl ? "true" : "false"} />
                    </div>

                    <SheetFooter className="pt-4 pb-20 md:pb-0">
                        <SubmitButton />
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
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

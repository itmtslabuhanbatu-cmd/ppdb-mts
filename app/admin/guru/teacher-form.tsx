"use client";

import { createTeacher, updateTeacher } from "@/app/actions/teachers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface TeacherFormProps {
    initialData?: {
        id: string;
        name: string;
        nip: string | null;
        position: string;
        image_url: string | null;
    };
}

export function TeacherForm({ initialData }: TeacherFormProps) {
    const [preview, setPreview] = useState<string | null>(initialData?.image_url || null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);

        if (initialData) {
            await updateTeacher(initialData.id, formData);
        } else {
            await createTeacher(formData);
        }
        // Redirect handled in action
    };

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="image">Foto Profil</Label>
                        <div className="flex items-center gap-4">
                            <div className="relative h-24 w-24 overflow-hidden rounded-full border bg-slate-100 flex items-center justify-center">
                                {preview ? (
                                    <Image src={preview} alt="Preview" fill className="object-cover" />
                                ) : (
                                    <ImageIcon className="h-8 w-8 text-slate-400" />
                                )}
                            </div>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full max-w-xs"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap & Gelar</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Contoh: Drs. H. Ahmad Fauzi, M.Pd"
                                defaultValue={initialData?.name}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nip">NIP (Opsional)</Label>
                            <Input
                                id="nip"
                                name="nip"
                                placeholder="Contoh: 19800101 200501 1 001"
                                defaultValue={initialData?.nip || ""}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="position">Jabatan / Mata Pelajaran</Label>
                        <Input
                            id="position"
                            name="position"
                            placeholder="Contoh: Kepala Madrasah atau Guru Matematika"
                            defaultValue={initialData?.position}
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? "Simpan Perubahan" : "Simpan Data"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

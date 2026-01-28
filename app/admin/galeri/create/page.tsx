"use client";

import { addImage } from "@/app/actions/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={pending}>
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Menyimpan..." : "Simpan Foto"}
        </Button>
    );
}

export default function CreateGaleriPage() {
    const [imageUrl, setImageUrl] = useState("");

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/galeri">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-slate-800">Tambah Foto Baru</h1>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Form Galeri</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={addImage} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Foto</Label>
                            <Input id="title" name="title" placeholder="Kegiatan Upacara..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Kategori</Label>
                            <select
                                id="category"
                                name="category"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="kegiatan">Kegiatan</option>
                                <option value="prestasi">Prestasi</option>
                                <option value="fasilitas">Fasilitas</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Foto</Label>
                            <ImageUpload onUpload={setImageUrl} bucket="images" />
                            <input type="hidden" name="image_url" value={imageUrl} required />
                        </div>

                        <div className="flex justify-end">
                            <SubmitButton />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

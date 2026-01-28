"use client";

import { createPost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={pending}>
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Menyimpan..." : "Simpan Berita"}
        </Button>
    );
}

export default function CreateBeritaPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/berita">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-slate-800">Tambah Berita Baru</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Form Berita</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createPost} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Berita</Label>
                            <Input id="title" name="title" placeholder="Masukkan judul berita..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
                            <Input id="excerpt" name="excerpt" placeholder="Ringkasan singkat untuk tampilan depan..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image_url">URL Gambar (Cover)</Label>
                            <Input id="image_url" name="image_url" placeholder="https://example.com/image.jpg" required />
                            <p className="text-xs text-muted-foreground">
                                *Sementara gunakan URL gambar eksternal (misal: Unsplash) sampai fitur upload siap.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Berita</Label>
                            <textarea
                                id="content"
                                name="content"
                                className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tulis isi berita disini..."
                                required
                            />
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

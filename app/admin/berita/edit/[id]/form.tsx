"use client";

import { updatePost } from "@/app/actions/posts";
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
            {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
    );
}

export default function EditBeritaForm({ post }: { post: any }) {
    const [imageUrl, setImageUrl] = useState(post.image_url || "");
    const updatePostWithId = updatePost.bind(null, post.id);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/berita">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-slate-800">Edit Berita</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Form Edit Berita</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updatePostWithId} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Berita</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={post.title}
                                placeholder="Masukkan judul berita..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="excerpt">Ringkasan (Excerpt)</Label>
                            <Input
                                id="excerpt"
                                name="excerpt"
                                defaultValue={post.excerpt}
                                placeholder="Ringkasan singkat..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Gambar Cover</Label>
                            <ImageUpload
                                onUpload={setImageUrl}
                                defaultValue={post.image_url}
                            />
                            <input type="hidden" name="image_url" value={imageUrl} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Berita</Label>
                            <textarea
                                id="content"
                                name="content"
                                defaultValue={post.content}
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

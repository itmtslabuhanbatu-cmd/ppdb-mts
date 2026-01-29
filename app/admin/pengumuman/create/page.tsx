"use client";

import { createAnnouncement } from "@/app/actions/announcements";
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
            {pending ? "Menyimpan..." : "Simpan Pengumuman"}
        </Button>
    );
}

export default function CreateAnnouncementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/pengumuman">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-slate-800">Tambah Pengumuman Baru</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Form Pengumuman</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createAnnouncement} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Pengumuman</Label>
                            <Input id="title" name="title" placeholder="Contoh: Jadwal Ujian Semester..." required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Tanggal</Label>
                            <Input id="date" name="date" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="is_active" name="is_active" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                            <Label htmlFor="is_active">Aktifkan Pengumuman</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Pengumuman</Label>
                            <textarea
                                id="content"
                                name="content"
                                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tulis detail pengumuman disini..."
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

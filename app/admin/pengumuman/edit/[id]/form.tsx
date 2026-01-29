"use client";

import { updateAnnouncement } from "@/app/actions/announcements";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
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

export default function EditAnnouncementForm({ announcement }: { announcement: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="outline" size="icon">
                    <Link href="/admin/pengumuman">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-slate-800">Edit Pengumuman</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Form Edit Pengumuman</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={updateAnnouncement.bind(null, announcement.id)} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Judul Pengumuman</Label>
                            <Input id="title" name="title" defaultValue={announcement.title} required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="date">Tanggal</Label>
                            <Input id="date" name="date" type="date" defaultValue={announcement.date} required />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                name="is_active"
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                defaultChecked={announcement.is_active}
                            />
                            <Label htmlFor="is_active">Aktifkan Pengumuman</Label>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Isi Pengumuman</Label>
                            <textarea
                                id="content"
                                name="content"
                                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue={announcement.content}
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

"use client";

import { updateSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";

export default function PPDBConfigForm({ initialData }: { initialData: any }) {
    const [isPending, startTransition] = useTransition();

    // Default structure if empty
    const defaultData = {
        academic_year: "",
        schedule_items: [{ label: "", value: "" }],
        schedule_note: "",
        requirements: [""],
        documents: [""],
        procedures: [""],
        contact: {
            address: "",
            phone1: "",
            phone2: "",
            work_hours: ""
        },
        ...initialData
    };

    const [data, setData] = useState(defaultData);

    const handleChange = (field: string, value: any) => {
        setData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleContactChange = (field: string, value: string) => {
        setData((prev: any) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
    };

    // Array helpers
    const addArrayItem = (field: string, defaultVal: any = "") => {
        setData((prev: any) => ({ ...prev, [field]: [...prev[field], defaultVal] }));
    };

    const removeArrayItem = (field: string, index: number) => {
        setData((prev: any) => ({ ...prev, [field]: prev[field].filter((_: any, i: number) => i !== index) }));
    };

    const updateArrayItem = (field: string, index: number, value: any) => {
        const newArr = [...data[field]];
        newArr[index] = value;
        setData((prev: any) => ({ ...prev, [field]: newArr }));
    };

    // Specific for schedule items (objects)
    const updateScheduleItem = (index: number, key: string, value: string) => {
        const newArr = [...data.schedule_items];
        newArr[index] = { ...newArr[index], [key]: value };
        setData((prev: any) => ({ ...prev, schedule_items: newArr }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            const formData = new FormData();
            formData.append("ppdb_info", JSON.stringify(data));

            await updateSettings(formData);
            toast.success("Pengaturan PPDB berhasil disimpan!");
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                    <Link href="/admin/settings">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Link>
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Pengaturan Halaman PPDB</h1>
                    <p className="text-slate-500">Edit informasi yang tampil di halaman depan PPDB.</p>
                </div>
                <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90">
                    {isPending ? "Menyimpan..." : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Simpan Perubahan
                        </>
                    )}
                </Button>
            </div>

            {/* General Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Umum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Tahun Pelajaran</Label>
                        <Input
                            value={data.academic_year}
                            onChange={(e) => handleChange("academic_year", e.target.value)}
                            placeholder="Contoh: 2025/2026"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Jadwal Pendaftaran</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("schedule_items", { label: "", value: "" })}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Jadwal
                        </Button>
                    </div>
                    <CardDescription>Daftar kegiatan dan tanggal pelaksanaan.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {data.schedule_items.map((item: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start">
                            <div className="flex-1 space-y-2">
                                <Label className="text-xs text-muted-foreground">Kegiatan</Label>
                                <Input
                                    value={item.label}
                                    onChange={(e) => updateScheduleItem(idx, "label", e.target.value)}
                                    placeholder="Contoh: Pendaftaran Online"
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label className="text-xs text-muted-foreground">Waktu / Tanggal</Label>
                                <Input
                                    value={item.value}
                                    onChange={(e) => updateScheduleItem(idx, "value", e.target.value)}
                                    placeholder="Contoh: 22 - 27 Mei 2025"
                                />
                            </div>
                            <div className="pt-8">
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeArrayItem("schedule_items", idx)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="pt-4">
                        <Label>Catatan Tambahan (Info Link, dll)</Label>
                        <Textarea
                            value={data.schedule_note}
                            onChange={(e) => handleChange("schedule_note", e.target.value)}
                            placeholder="Info tambahan di bawah jadwal..."
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Requirements & Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Syarat Pendaftaran</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("requirements")}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {data.requirements.map((req: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <Input
                                    value={req}
                                    onChange={(e) => updateArrayItem("requirements", idx, e.target.value)}
                                />
                                <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => removeArrayItem("requirements", idx)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Berkas Pendaftaran</CardTitle>
                            <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("documents")}>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {data.documents.map((doc: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <Input
                                    value={doc}
                                    onChange={(e) => updateArrayItem("documents", idx, e.target.value)}
                                />
                                <Button type="button" variant="ghost" size="icon" className="text-red-500" onClick={() => removeArrayItem("documents", idx)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Procedures */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Tata Cara Pendaftaran</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("procedures")}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {data.procedures.map((proc: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                            <span className="py-2 text-sm font-bold text-muted-foreground w-6 text-center">{idx + 1}.</span>
                            <Textarea
                                value={proc}
                                onChange={(e) => updateArrayItem("procedures", idx, e.target.value)}
                                className="min-h-[60px]"
                            />
                            <Button type="button" variant="ghost" size="icon" className="text-red-500 self-center" onClick={() => removeArrayItem("procedures", idx)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Contact */}
            <Card>
                <CardHeader>
                    <CardTitle>Informasi Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Nomor HP/WA 1</Label>
                            <Input
                                value={data.contact.phone1}
                                onChange={(e) => handleContactChange("phone1", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Nomor HP/WA 2</Label>
                            <Input
                                value={data.contact.phone2}
                                onChange={(e) => handleContactChange("phone2", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Alamat Lengkap</Label>
                        <Textarea
                            value={data.contact.address}
                            onChange={(e) => handleContactChange("address", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Jam Pelayanan</Label>
                        <Input
                            value={data.contact.work_hours}
                            onChange={(e) => handleContactChange("work_hours", e.target.value)}
                            placeholder="Contoh: 08.00 - 14.00 WIB"
                        />
                    </div>
                </CardContent>
            </Card>

        </form>
    );
}

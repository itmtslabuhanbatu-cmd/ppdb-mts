"use client";

import { registerStudent } from "@/app/actions/ppdb-public";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={pending}>
            {pending ? "Mengirim Data..." : "Kirim Pendaftaran"}
        </Button>
    );
}

export default function RegisterPPDBPage() {
    return (
        <div className="container py-12 max-w-3xl">
            <Button asChild variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/ppdb">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Info PPDB
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl text-primary">Formulir Pendaftaran Siswa Baru</CardTitle>
                    <CardDescription>
                        Isi data diri dengan benar sesuai dokumen resmi (Ijazah/Akte).
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={registerStudent} className="space-y-6">

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Data Pribadi</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nisn">NISN</Label>
                                    <Input id="nisn" name="nisn" placeholder="Nomor Induk Siswa Nasional" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Nama Lengkap</Label>
                                    <Input id="full_name" name="full_name" placeholder="Sesuai Ijazah/Akte" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="birth_place">Tempat Lahir</Label>
                                    <Input id="birth_place" name="birth_place" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="birth_date">Tanggal Lahir</Label>
                                    <Input id="birth_date" name="birth_date" type="date" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="gender">Jenis Kelamin</Label>
                                <select id="gender" name="gender" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required>
                                    <option value="">Pilih Jenis Kelamin</option>
                                    <option value="L">Laki-laki</option>
                                    <option value="P">Perempuan</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat Lengkap</Label>
                                <textarea id="address" name="address" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Data Sekolah & Orang Tua</h3>

                            <div className="space-y-2">
                                <Label htmlFor="school_origin">Asal Sekolah (SD/MI)</Label>
                                <Input id="school_origin" name="school_origin" required />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="parent_name">Nama Orang Tua/Wali</Label>
                                    <Input id="parent_name" name="parent_name" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parent_phone">No. HP / WA</Label>
                                    <Input id="parent_phone" name="parent_phone" type="tel" required />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Jalur Pendaftaran</h3>
                            <div className="space-y-2">
                                <Label htmlFor="registration_path">Pilih Jalur</Label>
                                <select id="registration_path" name="registration_path" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" required>
                                    <option value="umum">Jalur Umum</option>
                                    <option value="prestasi">Jalur Prestasi</option>
                                    <option value="afirmasi">Jalur Afirmasi</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4">
                            <SubmitButton />
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

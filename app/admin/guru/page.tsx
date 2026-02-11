import Link from "next/link";
import { getTeachers, deleteTeacher } from "@/app/actions/teachers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, ArrowLeft, User } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminGuruPage() {
    let teachers = [];
    try {
        teachers = await getTeachers();
    } catch (error) {
        console.error("Failed to fetch teachers:", error);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Manajemen Guru & Staf</h1>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/admin/guru/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Guru/Staf
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Guru & Staf Pengajar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Foto</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Nama</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">NIP</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Jabatan</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {teachers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                            Belum ada data guru. Silahkan tambah guru baru.
                                        </td>
                                    </tr>
                                ) : (
                                    teachers.map((teacher: any) => (
                                        <tr key={teacher.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">
                                                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                                                    {teacher.image_url ? (
                                                        <Image
                                                            src={teacher.image_url}
                                                            alt={teacher.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <User className="h-6 w-6 m-2 text-slate-400" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle font-medium">{teacher.name}</td>
                                            <td className="p-4 align-middle">{teacher.nip || "-"}</td>
                                            <td className="p-4 align-middle">{teacher.position}</td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-orange-600">
                                                        <Link href={`/admin/guru/edit/${teacher.id}`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <form action={async () => {
                                                        "use server";
                                                        await deleteTeacher(teacher.id);
                                                    }}>
                                                        <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

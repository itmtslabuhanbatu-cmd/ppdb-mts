import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Calendar } from "lucide-react";
import { getAllAnnouncements, deleteAnnouncement } from "@/app/actions/announcements";

export const dynamic = "force-dynamic";

export default async function AdminAnnouncementsPage() {
    const announcements = await getAllAnnouncements();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Manajemen Pengumuman</h1>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/admin/pengumuman/create">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Pengumuman
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {announcements.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                            <p>Belum ada pengumuman.</p>
                        </CardContent>
                    </Card>
                ) : (
                    announcements.map((item: any) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-6 flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${item.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                                            {item.is_active ? "Aktif" : "Non-Aktif"}
                                        </span>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(item.date).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
                                    <p className="text-sm text-slate-600 line-clamp-2">{item.content}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button asChild variant="outline" size="icon">
                                        <Link href={`/admin/pengumuman/edit/${item.id}`}>
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <form action={deleteAnnouncement.bind(null, item.id)}>
                                        <Button type="submit" variant="destructive" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

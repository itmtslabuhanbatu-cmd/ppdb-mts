import Link from "next/link";
import { getPosts, deletePost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminBeritaPage() {
    let posts = [];
    try {
        posts = await getPosts();
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Manajemen Berita</h1>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/admin/berita/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Berita
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Daftar Berita & Artikel</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Judul</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Tanggal</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-muted-foreground">
                                            Belum ada berita. Silahkan tambah berita baru.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post: any) => (
                                        <tr key={post.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle font-medium">{post.title}</td>
                                            <td className="p-4 align-middle">
                                                {new Date(post.created_at).toLocaleDateString("id-ID", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${post.is_published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                    }`}>
                                                    {post.is_published ? "Published" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                        <Link href={`/berita/${post.id}`} target="_blank">
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-orange-600">
                                                        <Link href={`/admin/berita/edit/${post.id}`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <form action={deletePost.bind(null, post.id)}>
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

import Link from "next/link";
import { getGallery, deleteImage } from "@/app/actions/gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminGaleriPage() {
    let gallery = [];
    try {
        gallery = await getGallery();
    } catch (error) {
        console.error("Failed to fetch gallery:", error);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Manajemen Galeri</h1>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/admin/galeri/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Foto
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-lg border border-dashed">
                        Belum ada foto di galeri.
                    </div>
                ) : (
                    gallery.map((item: any) => (
                        <Card key={item.id} className="overflow-hidden group">
                            <div className="relative aspect-square">
                                <Image
                                    src={item.image_url}
                                    alt={item.title || "Gallery Image"}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <form action={deleteImage.bind(null, item.id)}>
                                        <Button type="submit" variant="destructive" size="icon">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </div>
                            <CardContent className="p-3">
                                <p className="font-medium truncate">{item.title}</p>
                                <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

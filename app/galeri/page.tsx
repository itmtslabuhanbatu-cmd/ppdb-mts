import { getGallery } from "@/app/actions/gallery";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GaleriPage() {
    let gallery = [];
    try {
        gallery = await getGallery();
    } catch (error) {
        console.error("Failed to fetch gallery:", error);
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">Galeri Madrasah</h1>
                <p className="text-muted-foreground">Dokumentasi kegiatan, fasilitas, dan prestasi madrasah.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {gallery.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                        Belum ada foto di galeri.
                    </div>
                ) : (
                    gallery.map((item: any) => (
                        <Card key={item.id} className="overflow-hidden group cursor-pointer">
                            <div className="relative aspect-square">
                                <Image
                                    src={item.image_url}
                                    alt={item.title || "Gallery Image"}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <div className="text-white">
                                        <p className="font-bold text-sm line-clamp-2">{item.title}</p>
                                        <p className="text-xs text-white/80 capitalize">{item.category}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

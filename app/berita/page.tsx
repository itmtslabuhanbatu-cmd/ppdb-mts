import { getPosts } from "@/app/actions/posts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BeritaPage() {
    let posts = [];
    try {
        posts = await getPosts();
    } catch (error) {
        console.error("Failed to fetch posts:", error);
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">Berita & Artikel</h1>
                <p className="text-muted-foreground">Informasi terbaru seputar kegiatan dan prestasi madrasah.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                        Belum ada berita yang dipublikasikan.
                    </div>
                ) : (
                    posts.map((item: any) => (
                        <Card key={item.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
                            <div className="relative h-48 w-full overflow-hidden">
                                <Image
                                    src={item.image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <CardContent className="flex-1 pt-4">
                                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                                    <Calendar className="h-3 w-3 text-secondary" />
                                    <span>
                                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-bold leading-tight text-slate-800 group-hover:text-primary transition-colors">
                                    <Link href={`/berita/${item.id}`} className="line-clamp-2">
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="line-clamp-3 text-sm text-muted-foreground">
                                    {item.excerpt}
                                </p>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button asChild variant="link" className="px-0 text-primary p-0 h-auto font-semibold">
                                    <Link href={`/berita/${item.id}`} className="flex items-center gap-1">
                                        Baca Selengkapnya <ChevronRight className="h-3 w-3" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

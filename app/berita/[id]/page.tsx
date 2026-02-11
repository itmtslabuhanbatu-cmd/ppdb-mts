import { getPost } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SingleBeritaPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    let post = null;
    try {
        post = await getPost(params.id);
    } catch (error) {
        console.error("Failed to fetch post:", error);
    }

    if (!post) {
        notFound();
    }

    return (
        <div className="container py-12 md:py-16 max-w-4xl">
            <Button asChild variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/berita">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Berita
                </Link>
            </Button>

            <article className="prose prose-slate lg:prose-lg max-w-none">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 border-b pb-8">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                            {new Date(post.created_at).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>Admin</span>
                    </div>
                </div>

                {post.image_url && (
                    <div className="relative w-full h-[300px] md:h-[500px] mb-8 rounded-xl overflow-hidden shadow-lg">
                        <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                <div className="whitespace-pre-wrap leading-relaxed text-slate-700">
                    {post.content}
                </div>
            </article>
        </div>
    );
}

import { getPost } from "@/app/actions/posts";
import EditBeritaForm from "./form";
import { notFound } from "next/navigation";

export default async function EditBeritaPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return <EditBeritaForm post={post} />;
}

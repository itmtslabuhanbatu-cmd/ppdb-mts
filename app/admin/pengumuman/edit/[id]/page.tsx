import { getAnnouncement } from "@/app/actions/announcements";
import EditAnnouncementForm from "./form";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
    const announcement = await getAnnouncement(params.id);

    if (!announcement) {
        notFound();
    }

    return <EditAnnouncementForm announcement={announcement} />;
}

import { getSettings } from "@/app/actions/settings";
import PPDBConfigForm from "./form";

export const dynamic = "force-dynamic";

export default async function PPDBSettingsPage() {
    let ppdbInfo = null;
    try {
        const raw = await getSettings("ppdb_info");
        // ppdb_info is already a JSON object if stored as JSONB in supabase, or might be saved as JSON inside the value column. 
        // My `getSettings` returns data.value. In `updateSettings`, I did upsert({value: info}). 
        // So raw IS the object.
        ppdbInfo = raw;
    } catch (e) {
        console.error("Failed to fetch ppdb settings", e);
    }

    return (
        <div className="container py-10">
            <PPDBConfigForm initialData={ppdbInfo || {}} />
        </div>
    );
}

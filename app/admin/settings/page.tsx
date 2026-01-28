import { getSettings } from "@/app/actions/settings";
import SettingsForm from "./settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    let runningTextData = null;
    let headmasterData = null;

    try {
        runningTextData = await getSettings("running_text");
        headmasterData = await getSettings("headmaster");
    } catch (error) {
        console.error("Failed to fetch settings:", error);
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Pengaturan Website</h1>
            <SettingsForm
                runningTextData={runningTextData}
                headmasterData={headmasterData}
            />
        </div>
    );
}

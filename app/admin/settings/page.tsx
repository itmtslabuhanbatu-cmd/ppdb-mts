import { getSettings } from "@/app/actions/settings";
import SettingsForm from "./settings-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    let runningTextData = null;
    let headmasterData = null;
    let heroSliderData = null;

    try {
        runningTextData = await getSettings("running_text");
        headmasterData = await getSettings("headmaster");
        heroSliderData = await getSettings("hero_slider");
    } catch (error) {
        console.error("Failed to fetch settings:", error);
    }

    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/admin/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Dashboard
                </Link>
            </Button>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Pengaturan Website</h1>
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                    <Link href="/admin/settings/ppdb">
                        Pengaturan Halaman PPDB
                    </Link>
                </Button>
            </div>

            <SettingsForm
                runningTextData={runningTextData}
                headmasterData={headmasterData}
                heroSliderData={heroSliderData}
            />
        </div>
    );
}

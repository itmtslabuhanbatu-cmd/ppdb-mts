import { getSettings, updateSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

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

            <form action={updateSettings} className="space-y-6">
                {/* Running Text Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Running Text (Teks Berjalan)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="running_text">Isi Teks</Label>
                            <Input
                                id="running_text"
                                name="running_text"
                                defaultValue={runningTextData?.text || ""}
                                placeholder="Masukkan teks pengumuman..."
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Headmaster Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Sambutan Kepala Madrasah</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="headmaster_name">Nama Kepala Madrasah</Label>
                            <Input
                                id="headmaster_name"
                                name="headmaster_name"
                                defaultValue={headmasterData?.name || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="headmaster_image">URL Foto</Label>
                            <Input
                                id="headmaster_image"
                                name="headmaster_image"
                                defaultValue={headmasterData?.image || ""}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="headmaster_message">Isi Sambutan</Label>
                            <textarea
                                id="headmaster_message"
                                name="headmaster_message"
                                className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                defaultValue={headmasterData?.message || ""}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Pengaturan
                    </Button>
                </div>
            </form>
        </div>
    );
}

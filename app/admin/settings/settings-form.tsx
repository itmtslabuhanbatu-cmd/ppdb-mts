"use client";

import { updateSettings } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useFormStatus } from "react-dom";
import ImageUpload from "@/components/ImageUpload";
import { useState } from "react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={pending}>
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Menyimpan..." : "Simpan Pengaturan"}
        </Button>
    );
}

interface SettingsFormProps {
    runningTextData: any;
    headmasterData: any;
    heroSliderData: any;
}

export default function SettingsForm({ runningTextData, headmasterData, heroSliderData }: SettingsFormProps) {
    const [headmasterImage, setHeadmasterImage] = useState(headmasterData?.image || "");
    const [sliderImages, setSliderImages] = useState<string[]>(heroSliderData?.images || []);

    const handleAddSliderImage = (url: string) => {
        setSliderImages([...sliderImages, url]);
    };

    const handleRemoveSliderImage = (index: number) => {
        const newImages = [...sliderImages];
        newImages.splice(index, 1);
        setSliderImages(newImages);
    };

    return (
        <form action={updateSettings} className="space-y-6">
            {/* Hero Slider Section */}
            <Card>
                <CardHeader>
                    <CardTitle>Hero Slider (Gambar Slide Depan)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {sliderImages.map((img, index) => (
                            <div key={index} className="relative group aspect-video rounded-md overflow-hidden border">
                                <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveSliderImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <Label>Tambah Gambar Slide Baru</Label>
                        <ImageUpload
                            onUpload={handleAddSliderImage}
                            bucket="images"
                        />
                        <p className="text-xs text-muted-foreground">
                            *Upload gambar landscape (16:9) untuk hasil terbaik.
                        </p>
                    </div>
                    <input type="hidden" name="hero_slider_images" value={JSON.stringify(sliderImages)} />
                </CardContent>
            </Card>

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
                        <Label>Foto Kepala Madrasah</Label>
                        <ImageUpload
                            onUpload={setHeadmasterImage}
                            defaultValue={headmasterData?.image}
                            bucket="images"
                        />
                        <input type="hidden" name="headmaster_image" value={headmasterImage} />
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
                <SubmitButton />
            </div>
        </form>
    );
}

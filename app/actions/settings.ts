"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getSettings(key: string) {
    const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", key)
        .single();

    if (error) {
        console.error(`Error fetching setting ${key}:`, error);
        return null;
    }

    return data.value;
}

export async function updateSettings(formData: FormData) {
    const runningText = formData.get("running_text") as string;
    const headmasterName = formData.get("headmaster_name") as string;
    const headmasterMessage = formData.get("headmaster_message") as string;
    const headmasterImage = formData.get("headmaster_image") as string;

    const heroSliderImages = formData.get("hero_slider_images") as string;

    // Update Running Text
    await supabase
        .from("settings")
        .upsert({ key: "running_text", value: { text: runningText } });

    // Update Headmaster Info
    await supabase
        .from("settings")
        .upsert({
            key: "headmaster",
            value: {
                name: headmasterName,
                message: headmasterMessage,
                image: headmasterImage
            }
        });

    // Update Hero Slider
    if (heroSliderImages) {
        try {
            const images = JSON.parse(heroSliderImages);
            await supabase
                .from("settings")
                .upsert({
                    key: "hero_slider",
                    value: { images }
                });
        } catch (e) {
            console.error("Failed to parse hero slider images", e);
        }
    }

    revalidatePath("/");
    revalidatePath("/admin/settings");
}

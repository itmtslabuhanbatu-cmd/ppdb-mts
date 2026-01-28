"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    onUpload: (url: string) => void;
    defaultValue?: string;
    label?: string;
    bucket?: string;
}

export default function ImageUpload({
    onUpload,
    defaultValue = "",
    label = "Upload Gambar",
    bucket = "images",
}: ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string>(defaultValue);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // 1. Create a unique file name
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            // 2. Upload to Supabase
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            // 3. Get Public URL
            const {
                data: { publicUrl },
            } = supabase.storage.from(bucket).getPublicUrl(filePath);

            // 4. Update State
            setPreviewUrl(publicUrl);
            onUpload(publicUrl);
        } catch (error: any) {
            console.error("Upload error:", error);
            alert("Gagal upload gambar: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreviewUrl("");
        onUpload("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-4">
            <Label>{label}</Label>

            {previewUrl ? (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <Loader2 className="h-10 w-10 text-gray-400 animate-spin mb-2" />
                    ) : (
                        <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                    )}
                    <p className="text-sm text-gray-500 text-center">
                        {uploading ? "Sedang mengupload..." : "Klik untuk upload gambar"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Max 2MB. Format: JPG, PNG, WEBP
                    </p>
                </div>
            )}

            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
            />
        </div>
    );
}

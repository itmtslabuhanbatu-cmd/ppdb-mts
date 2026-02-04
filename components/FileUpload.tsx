"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, X, Loader2, FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
    onUpload: (url: string) => void;
    defaultValue?: string;
    label?: string;
    bucket?: string;
}

export default function FileUpload({
    onUpload,
    defaultValue = "",
    label = "Upload Dokumen (PDF / Gambar)",
    bucket = "images", // Default to images bucket, hopefuly it supports pdfs
}: FileUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string>(defaultValue);
    const [fileType, setFileType] = useState<"image" | "file">("file");
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // 1. Determine type
            const isImage = file.type.startsWith("image/");
            setFileType(isImage ? "image" : "file");

            // 2. Create a unique file name
            const fileExt = file.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random()
                .toString(36)
                .substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            // 3. Upload to Supabase
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (error) {
                throw error;
            }

            // 4. Get Public URL
            const {
                data: { publicUrl },
            } = supabase.storage.from(bucket).getPublicUrl(filePath);

            // 5. Update State
            setPreviewUrl(publicUrl);
            onUpload(publicUrl);
        } catch (error: any) {
            console.error("Upload error:", error);
            alert("Gagal upload file: " + error.message);
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
                <div className="relative w-full h-32 rounded-lg border border-gray-200 bg-slate-50 flex items-center justify-center overflow-hidden">
                    {/* Try to detect if it's an image based on URL extension if state is lost, though simple check is fine */}
                    {(fileType === "image" || previewUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                            <FileText className="h-10 w-10 text-blue-500" />
                            <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline text-blue-600 truncate max-w-[200px]">
                                Lihat File Uploaded
                            </a>
                        </div>
                    )}

                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 z-10"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-gray-50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {uploading ? (
                        <Loader2 className="h-8 w-8 text-gray-400 animate-spin mb-2" />
                    ) : (
                        <FileUp className="h-8 w-8 text-gray-400 mb-2" />
                    )}
                    <p className="text-sm text-gray-500 text-center">
                        {uploading ? "Sedang mengupload..." : "Klik untuk upload dokumen"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Max 2MB. PDF, JPG, PNG
                    </p>
                </div>
            )}

            <Input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
                disabled={uploading}
            />
        </div>
    );
}

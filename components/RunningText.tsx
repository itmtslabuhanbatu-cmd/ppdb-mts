"use client";

import React from "react";
import { Bell } from "lucide-react";

export default function RunningText() {
    return (
        <div className="bg-primary text-primary-foreground py-2 overflow-hidden relative flex items-center z-40 border-b border-primary-foreground/10">
            <div className="container flex items-center max-w-full">
                <div className="flex items-center gap-2 bg-primary z-10 pr-4 shrink-0 font-bold text-sm shadow-[5px_0_10px_rgba(0,0,0,0.1)]">
                    <Bell className="h-4 w-4 animate-swing" />
                    <span className="uppercase tracking-wider">Info Terkini:</span>
                </div>
                <div className="flex-1 overflow-hidden relative h-6">
                    <div className="absolute whitespace-nowrap animate-marquee top-0 left-0 flex items-center h-full">
                        <span className="mx-4 text-sm font-medium">
                            Selamat datang di MTsN 1 Labuhanbatu. Unggul dalam Prestasi, Terampil, Ber-Akhlak & Berwawasan Lingkungan
                        </span>
                        <span className="mx-4 text-sm font-medium">
                            •
                        </span>
                        <span className="mx-4 text-sm font-medium">
                            Penerimaan Peserta Didik Baru (PPDB) Tahun Pelajaran 2025/2026 Telah Dibuka!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

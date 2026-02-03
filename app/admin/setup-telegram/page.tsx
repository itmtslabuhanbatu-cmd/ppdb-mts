"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink, CheckCircle } from "lucide-react";

export default function TelegramSetup() {
    const [token, setToken] = useState("");
    const [chatId, setChatId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const checkUpdates = async () => {
        setLoading(true);
        setError("");
        setChatId(null);
        try {
            // Direct call to Telegram API from client (for setup purpose only)
            // Note: In production, do this via server action to hide token, 
            // but this is a setup tool for the admin.
            const res = await fetch(`https://api.telegram.org/bot${token}/getUpdates`);
            const data = await res.json();

            if (!data.ok) {
                throw new Error(data.description || "Failed to fetch updates");
            }

            if (data.result.length === 0) {
                throw new Error("Belum ada pesan masuk. Chat bot-nya dulu dong!");
            }

            // Get the latest message's chat ID
            const latest = data.result[data.result.length - 1];
            const id = latest.message?.chat?.id || latest.my_chat_member?.chat?.id;

            if (id) {
                setChatId(String(id));
            } else {
                throw new Error("Chat ID tidak ditemukan dalam update terakhir.");
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-8 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Setup Notifikasi Telegram</CardTitle>
                    <CardDescription>
                        Dapatkan Chat ID agar bot bisa mengirim notifikasi ke Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Langkah 1: Masukkan Bot Token</h3>
                        <Input
                            placeholder="123456789:ABCDefgh..."
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2 p-4 bg-slate-50 rounded-lg border text-sm">
                        <h3 className="font-semibold mb-2">Langkah 2: Chat Bot Anda</h3>
                        <p>1. Buka Telegram dan cari bot anda (via username).</p>
                        <p>2. Klik <strong>Start</strong> atau kirim pesan "Halo".</p>
                        <p className="text-muted-foreground mt-2 italic">Ini perlu dilakukan agar bot punya izin kirim pesan ke anda.</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-sm">Langkah 3: Cek Chat ID</h3>
                        <Button onClick={checkUpdates} disabled={loading || !token} className="w-full">
                            {loading ? "Mencari..." : "Cek Updates & Dapatkan Chat ID"}
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    {chatId && (
                        <div className="mt-4 p-6 bg-green-50 border border-green-200 rounded-lg text-center animate-in fade-in zoom-in">
                            <CheckCircle className="h-10 w-10 text-green-600 mx-auto mb-2" />
                            <h3 className="text-lg font-bold text-green-800">Chat ID Ditemukan!</h3>
                            <div className="my-4 text-3xl font-mono p-4 bg-white border rounded shadow-sm select-all">
                                {chatId}
                            </div>
                            <p className="text-sm text-green-700">
                                Salin Chat ID ini dan Token Bot ke dalam file <code>.env.local</code>
                            </p>
                        </div>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}

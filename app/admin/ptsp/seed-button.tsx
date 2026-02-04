"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { seedPtspServices } from "@/app/actions/seed-services";
import { toast } from "sonner";

export default function SeedButton() {
    const [loading, setLoading] = useState(false);

    const handleSeed = async () => {
        setLoading(true);
        try {
            const res = await seedPtspServices();
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.error);
            }
        } catch (error) {
            toast.error("Gagal sinkronisasi layanan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleSeed}
            disabled={loading}
            className="bg-white"
        >
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Sync Layanan Default
        </Button>
    );
}

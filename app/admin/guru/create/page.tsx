import { TeacherForm } from "../teacher-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateGuruPage() {
    return (
        <div className="space-y-6">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                <Link href="/admin/guru">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali
                </Link>
            </Button>

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-800">Tambah Guru/Staf Baru</h1>
            </div>

            <TeacherForm />
        </div>
    );
}

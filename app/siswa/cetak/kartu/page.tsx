import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function CetakKartuPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "student") {
        redirect("/ppdb/login");
    }

    const { data: reg } = await supabase
        .from("ppdb_registrations")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

    if (!reg) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-xl font-bold text-red-600">Data belum lengkap</h1>
                <p>Silakan isi formulir pendaftaran terlebih dahulu.</p>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen p-8 text-black font-sans">
            {/* Print Button (Hidden when printing) */}
            <div className="print:hidden mb-6 text-center">
                <button
                    id="print-btn-kartu"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold shadow-lg transition-all"
                >
                    🖨️ Cetak Kartu / Simpan PDF
                </button>
                <p className="text-sm text-gray-500 mt-2">
                    *Gunakan kertas A4 dan simpan sebagai PDF untuk cadangan.
                </p>
                <p className="text-sm text-red-500 mt-2 font-bold">
                    Pastikan Pas Foto sudah diupload sebelum mencetak!
                </p>
            </div>

            {/* Card Container */}
            <div className="max-w-xl mx-auto border-4 border-double border-green-800 p-6 rounded-xl relative overflow-hidden">
                {/* Watermark/Background decoration could go here */}

                {/* Header */}
                <div className="flex items-center gap-4 border-b-2 border-green-800 pb-4 mb-6">
                    <div className="w-20 h-20 relative">
                        {/* Logo Kemenag */}
                        <img
                            src="/logo-kemenag.png"
                            alt="Logo Kemenag"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex-1 text-center uppercase text-green-900">
                        <h2 className="text-xs font-bold">Kementerian Agama Republik Indonesia</h2>
                        <h1 className="text-xl font-extrabold">MTsN 1 Labuhanbatu</h1>
                        <p className="text-[10px] leading-tight mt-1">Jl. Kampung Baru Gg. Tsanawiyah No. 150 Rantauprapat</p>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                    <h2 className="text-lg font-bold bg-green-800 text-white inline-block px-4 py-1 rounded">KARTU TANDA PENDAFTARAN PPDB</h2>
                    <p className="text-sm font-semibold mt-1">Tahun Pelajaran 2025/2026</p>
                </div>

                {/* Content Grid */}
                <div className="flex gap-6">
                    {/* Photo Area */}
                    <div className="w-32 h-40 bg-gray-200 border border-gray-400 flex items-center justify-center shrink-0">
                        {reg.photo_url ? (
                            <img src={reg.photo_url} alt="Foto Siswa" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs text-center text-gray-500 p-2">Pas Foto 3x4<br />(Tempel Disini)</span>
                        )}
                    </div>

                    {/* Data Fields */}
                    <div className="flex-1 text-sm space-y-2">
                        <div className="grid grid-cols-[100px_10px_1fr]">
                            <span className="font-semibold">No. Pendaftaran</span>
                            <span>:</span>
                            <span className="font-mono font-bold text-lg">{reg.id.split('-')[0].toUpperCase()}</span>
                            {/* Assuming ID is UUID, taking first segment */}
                        </div>
                        <div className="grid grid-cols-[100px_10px_1fr]">
                            <span className="font-semibold">NISN</span>
                            <span>:</span>
                            <span>{reg.nisn}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_1fr]">
                            <span className="font-semibold">Nama Lengkap</span>
                            <span>:</span>
                            <span className="capitalize font-bold">{reg.full_name}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_1fr]">
                            <span className="font-semibold">Asal Sekolah</span>
                            <span>:</span>
                            <span className="capitalize">{reg.school_origin}</span>
                        </div>
                        <div className="grid grid-cols-[100px_10px_1fr]">
                            <span className="font-semibold">Jalur</span>
                            <span>:</span>
                            <span className="capitalize">{reg.registration_path || "Reguler"}</span>
                            {/* Default to Reguler if path not set column-wise yet */}
                        </div>
                        <div className="grid grid-cols-[100px_10px_1fr]">
                            <span className="font-semibold">Tgl Daftar</span>
                            <span>:</span>
                            <span>{reg.created_at ? format(new Date(reg.created_at), "dd MMMM yyyy", { locale: id }) : "-"}</span>
                        </div>
                    </div>
                </div>

                {/* Footer / Signature Area */}
                <div className="mt-8 pt-4 border-t border-dashed border-gray-400 grid grid-cols-2 gap-8 text-sm">
                    <div className="text-center">
                        <p className="mb-16">Panitia PPDB,</p>
                        <hr className="border-black w-2/3 mx-auto" />
                        <p className="font-bold text-xs mt-1">( ........................................ )</p>
                    </div>
                    <div className="text-center">
                        <p className="mb-16">Rantauprapat, {format(new Date(), "dd MMMM yyyy", { locale: id })}<br />Siswa Pendaftar,</p>
                        <p className="font-bold underline uppercase">{reg.full_name}</p>
                    </div>
                </div>

                <div className="mt-4 text-[10px] text-center text-gray-500 italic">
                    *Kartu ini wajib dibawa saat penyerahan berkas verifikasi.
                </div>
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
                document.getElementById('print-btn-kartu').addEventListener('click', () => window.print());
            `}} />
        </div>
    );
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function CetakFormulirPage() {
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

    const InfoRow = ({ label, value }: { label: string, value: string | number | null }) => (
        <tr className="border-b border-black/10">
            <td className="py-1 px-2 font-semibold w-[250px]">{label}</td>
            <td className="py-1 px-2 w-[10px]">:</td>
            <td className="py-1 px-2 uppercase">{value || "-"}</td>
        </tr>
    );

    return (
        <div className="bg-white min-h-screen p-8 text-black font-sans print:p-0">
            {/* Print Button */}
            <div className="print:hidden mb-6 text-center">
                <button
                    id="print-btn"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-bold shadow-lg transition-all"
                >
                    🖨️ Cetak Formulir
                </button>
            </div>

            <div className="max-w-[210mm] mx-auto bg-white">
                {/* Header */}
                <div className="flex items-center gap-4 border-b-4 border-double border-black pb-4 mb-6 justify-center">
                    <div className="w-20 h-20 relative">
                        <img
                            src="/logo-kemenag.png"
                            alt="Logo Kemenag"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-base font-normal uppercase">Kementerian Agama Republik Indonesia</h3>
                        <h1 className="text-2xl font-extrabold uppercase">Madrasah Tsanawiyah Negeri 1 Labuhanbatu</h1>
                        <p className="text-sm">Jl. Kampung Baru Gg. Tsanawiyah No. 150 Rantauprapat</p>
                        <p className="text-xs italic mt-1">Website: www.mtsn1labuhanbatu.sch.id | Email: info@mtsn1labuhanbatu.sch.id</p>
                    </div>
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-lg font-bold underline">FORMULIR PENDAFTARAN PESERTA DIDIK BARU</h2>
                    <p className="text-sm">Tahun Pelajaran 2025/2026</p>
                </div>

                {/* Data Table */}
                <table className="w-full text-sm">
                    <tbody>
                        <tr>
                            <td colSpan={3} className="bg-gray-200 font-bold py-1 px-2 border-y border-black uppercase text-xs">A. Data Pribadi Siswa</td>
                        </tr>
                        <InfoRow label="Nama Lengkap" value={reg.full_name} />
                        <InfoRow label="NISN" value={reg.nisn} />
                        <InfoRow label="NIK" value={reg.nik} />
                        <InfoRow label="Tempat, Tanggal Lahir" value={`${reg.birth_place || ''}, ${reg.birth_date ? format(new Date(reg.birth_date), "dd MMMM yyyy", { locale: id }) : ''}`} />
                        <InfoRow label="Jenis Kelamin" value={reg.gender === "L" ? "Laki-laki" : "Perempuan"} />
                        <InfoRow label="Agama" value={reg.religion} />
                        <InfoRow label="Anak ke-" value={reg.child_order} />
                        <InfoRow label="Jumlah Saudara" value={reg.siblings_count} />
                        <InfoRow label="Hobi / Cita-cita" value={`${reg.hobby || '-'} / ${reg.ambition || '-'}`} />
                        <InfoRow label="No. Handphone" value={reg.phone} />

                        <tr>
                            <td colSpan={3} className="bg-gray-200 font-bold py-1 px-2 border-y border-black uppercase text-xs mt-4">B. Data Tempat Tinggal</td>
                        </tr>
                        <InfoRow label="Alamat Lengkap" value={reg.address} />
                        <InfoRow label="Desa / Kelurahan" value={reg.village} />
                        <InfoRow label="Kecamatan" value={reg.district} />
                        <InfoRow label="Kabupaten / Kota" value={reg.city} />
                        <InfoRow label="Transportasi" value={reg.transport} />
                        <InfoRow label="Jarak ke Sekolah" value={reg.distance_to_school} />

                        <tr>
                            <td colSpan={3} className="bg-gray-200 font-bold py-1 px-2 border-y border-black uppercase text-xs mt-4">C. Data Orang Tua</td>
                        </tr>
                        <InfoRow label="Nama Ayah" value={reg.father_name} />
                        <InfoRow label="Pekerjaan Ayah" value={reg.father_job} />
                        <InfoRow label="No. HP Ayah" value={reg.father_phone} />
                        <InfoRow label="Nama Ibu" value={reg.mother_name} />
                        <InfoRow label="Pekerjaan Ibu" value={reg.mother_job} />
                        <InfoRow label="No. HP Ibu" value={reg.mother_phone} />

                        <tr>
                            <td colSpan={3} className="bg-gray-200 font-bold py-1 px-2 border-y border-black uppercase text-xs mt-4">D. Data Sekolah Asal</td>
                        </tr>
                        <InfoRow label="Nama Sekolah Asal" value={reg.school_origin} />
                        <InfoRow label="Status Sekolah" value="Negeri / Swasta" /> {/* Static for now or add column */}
                    </tbody>
                </table>

                {/* Signature */}
                <div className="mt-12 flex justify-between px-8 text-sm break-inside-avoid">
                    <div className="text-center w-1/3">
                        <p className="mb-2">Mengetahui,<br />Orang Tua / Wali</p>
                        <div className="h-20"></div>
                        <p className="font-bold border-b border-black inline-block min-w-[150px]">( ........................................ )</p>
                    </div>
                    <div className="text-center w-1/3">
                        <p className="mb-2">Rantauprapat, {format(new Date(), "dd MMMM yyyy", { locale: id })}<br />Siswa Pendaftar</p>
                        <div className="h-20 flex justify-center items-center text-xs text-gray-400 border border-gray-300 mx-auto w-24 mb-1">
                            {/* Materai placeholder logic could go here, or just space */}
                            Materai 10.000<br />(Jika Ada)
                        </div>
                        <p className="font-bold border-b border-black inline-block min-w-[150px]">{reg.full_name}</p>
                    </div>
                </div>
            </div>

            <script dangerouslySetInnerHTML={{
                __html: `
                document.getElementById('print-btn').addEventListener('click', () => window.print());
            `}} />
        </div>
    );
}


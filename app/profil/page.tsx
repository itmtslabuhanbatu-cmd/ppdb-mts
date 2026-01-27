import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { headmasterMessage } from "@/lib/data";

export default function ProfilPage() {
    return (
        <div className="container py-12">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-primary sm:text-4xl text-center">
                Profil Madrasah
            </h1>

            <div className="space-y-12">
                {/* Sejarah Singkat */}
                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle>Sejarah Singkat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="leading-relaxed text-muted-foreground">
                                MTsN 1 Labuhanbatu berdiri sejak tahun 1980 dan telah meluluskan ribuan alumni yang tersebar di berbagai bidang.
                                Berawal dari sebuah madrasah swasta kecil, kini MTsN 1 Labuhanbatu telah berkembang menjadi salah satu madrasah
                                favorit di Kabupaten Labuhanbatu dengan berbagai fasilitas dan prestasi yang membanggakan.
                            </p>
                        </CardContent>
                    </Card>
                </section>

                {/* Visi & Misi */}
                <section className="grid gap-8 md:grid-cols-2">
                    <Card className="bg-primary/5 border-primary/20 h-full">
                        <CardHeader>
                            <CardTitle className="text-primary text-center text-2xl">VISI</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-full pb-12">
                            <p className="text-xl font-bold text-center uppercase leading-relaxed text-slate-800">
                                "UNGGUL DALAM PRESTASI, TERAMPIL, BER-AKHLAK DAN BERWAWASAN LINGKUNGAN"
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-primary text-center text-2xl">MISI</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700 font-medium">
                                <li>MENYELENGGARAKAN PENDIDIKAN AGAMA DAN UMUM SECARA EFEKTIF, SEHINGGA SISWA BERKEMBANG SECARA MAKSIMAL.</li>
                                <li>MELAKSANAKAN PEMBELAJARAN KONTEKSTUAL.</li>
                                <li>MENYELENGGARAKAN KEGIATAN PENGEMBANGAN DIRI TERHADAP MINAT DAN BAKAT SISWA.</li>
                                <li>MELAKSANAKAN PEMBINAAN DAN DIKLAT PENDIDIK DAN TENAGA KEPENDIDIKAN.</li>
                                <li>MEMBUDAYAKAN PERILAKU TERPUJI DAN KEPEKAAN SOSIAL DALAM KEHIDUPAN SEHARI-HARI.</li>
                                <li>MENUMBUHKAN, MENGEMBANGKAN BUDAYA DAN TANGGUNGJAWAB TERHADAP LINGKUNGAN YANG TERINTEGRASI DALAM PROSES PEMBELAJARAN.</li>
                                <li>MELAKSANAKAN LITERASI BERBASIS MADRASAH RISET.</li>
                            </ol>
                        </CardContent>
                    </Card>
                </section>

                {/* Kepala Madrasah */}
                <section className="flex flex-col items-center text-center">
                    <div className="relative mb-6 h-48 w-48 overflow-hidden rounded-full border-4 border-primary">
                        <Image
                            src={headmasterMessage.image}
                            alt={headmasterMessage.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-primary">{headmasterMessage.name}</h2>
                    <p className="text-muted-foreground">Kepala Madrasah</p>
                </section>
            </div>
        </div>
    );
}

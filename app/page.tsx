import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { news, carouselImages, headmasterMessage } from "@/lib/data";
import { ArrowRight, BookOpen, GraduationCap, Image as ImageIcon, Calendar, Bell, ChevronRight, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <Image
            src={carouselImages[0]}
            alt="School Activity"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>
        <div className="relative container flex h-full flex-col items-center justify-center text-center text-white">
          <div className="mb-6 inline-flex items-center rounded-full border border-secondary/50 bg-secondary/10 px-3 py-1 text-sm text-secondary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
            Penerimaan Peserta Didik Baru (PPDB) Telah Dibuka
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl max-w-4xl drop-shadow-lg">
            Unggul dalam <span className="text-secondary">Prestasi</span>, <span className="text-secondary">Terampil</span>, <span className="text-secondary">Ber-Akhlak</span> & Berwawasan Lingkungan
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-slate-200 drop-shadow-md">
            MTsN 1 Labuhanbatu berkomitmen mencetak kader bangsa yang unggul dalam IMTAQ dan IPTEK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8">
              <Link href="/ppdb">Daftar Sekarang</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm">
              <Link href="/profil">Profil Madrasah</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Portal Layout Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Main Content (Left Column) - 8 cols */}
            <div className="lg:col-span-8 space-y-12">

              {/* Features / Quick Access */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link href="#" className="group">
                  <Card className="h-full border-l-4 border-l-primary transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">E-Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Akses materi pembelajaran digital dan tugas siswa.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="#" className="group">
                  <Card className="h-full border-l-4 border-l-secondary transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary-foreground group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">Rapor Digital</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Lihat hasil belajar dan evaluasi akademik siswa.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href="/galeri" className="group">
                  <Card className="h-full border-l-4 border-l-primary transition-all hover:shadow-lg hover:-translate-y-1">
                    <CardHeader className="pb-2">
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <ImageIcon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">Galeri</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Dokumentasi kegiatan dan prestasi madrasah.
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>

              {/* Latest News */}
              <div>
                <div className="mb-6 flex items-center justify-between border-b-2 border-primary/10 pb-2">
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <span className="h-8 w-1 bg-primary rounded-full"></span>
                    Berita Terbaru
                  </h2>
                  <Link href="/berita" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                    Lihat Semua <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {news.map((item) => (
                    <Card key={item.id} className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow group">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded shadow-sm">
                          Berita
                        </div>
                      </div>
                      <CardContent className="flex-1 pt-4">
                        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 text-secondary" />
                          <span>{item.date}</span>
                        </div>
                        <h3 className="mb-2 text-lg font-bold leading-tight text-slate-800 group-hover:text-primary transition-colors">
                          <Link href={`/berita/${item.id}`} className="line-clamp-2">
                            {item.title}
                          </Link>
                        </h3>
                        <p className="line-clamp-3 text-sm text-muted-foreground">
                          {item.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button asChild variant="link" className="px-0 text-primary p-0 h-auto font-semibold">
                          <Link href={`/berita/${item.id}`} className="flex items-center gap-1">
                            Baca Selengkapnya <ChevronRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar (Right Column) - 4 cols */}
            <div className="lg:col-span-4 space-y-8">

              {/* Headmaster Welcome Widget */}
              <Card className="overflow-hidden border-t-4 border-t-secondary shadow-md">
                <div className="bg-slate-50 p-4 border-b">
                  <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Star className="h-5 w-5 text-secondary fill-secondary" />
                    Sambutan Kepala Madrasah
                  </h3>
                </div>
                <CardContent className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={headmasterMessage.image}
                      alt={headmasterMessage.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-primary text-lg mb-1">{headmasterMessage.name}</h4>
                    <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">Kepala Madrasah</p>
                    <p className="text-sm text-slate-600 line-clamp-4 italic mb-4">
                      "{headmasterMessage.message}"
                    </p>
                    <Button asChild size="sm" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
                      <Link href="/profil">Baca Selengkapnya</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Announcements Widget */}
              <Card className="shadow-md">
                <div className="bg-primary p-4 text-white rounded-t-lg">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Pengumuman
                  </h3>
                </div>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="p-4 hover:bg-slate-50 transition-colors">
                        <Link href="#" className="block group">
                          <span className="text-xs font-semibold text-secondary-foreground bg-secondary/20 px-2 py-0.5 rounded mb-2 inline-block">
                            Pengumuman
                          </span>
                          <h4 className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors mb-1">
                            Jadwal Ujian Semester Genap Tahun Ajaran 2025/2026
                          </h4>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> 12 Januari 2026
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-3 bg-slate-50 border-t">
                  <Link href="#" className="text-xs font-medium text-center w-full text-primary hover:underline">
                    Lihat Semua Pengumuman
                  </Link>
                </CardFooter>
              </Card>

              {/* Important Links Widget */}
              <Card className="shadow-md">
                <div className="p-4 border-b">
                  <h3 className="font-bold text-lg text-slate-800">Tautan Penting</h3>
                </div>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    <li>
                      <Link href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <span>Jadwal Pelajaran</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <span>Kalender Akademik</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <span>Data Guru & Staf</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700">
                        <span>Prestasi Siswa</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

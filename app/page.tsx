// PTSP & Telegram Integration Added
import { getSettings } from "@/app/actions/settings";
import { getPosts } from "@/app/actions/posts";
import { getAnnouncements } from "@/app/actions/announcements";
import { headmasterMessage as defaultHeadmaster } from "@/lib/data";
import { ArrowRight, BookOpen, GraduationCap, Image as ImageIcon, Calendar, Bell, ChevronRight, Star } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import RunningText from "@/components/RunningText";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import StatisticsSection from "@/components/StatisticsSection";
import WaveDivider from "@/components/WaveDivider";
import AOSInit from "@/components/AOSInit";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let runningTextData = null;
  let headmasterData = null;
  let heroSliderData = null;
  let posts = [];
  let announcements = [];

  try {
    runningTextData = await getSettings("running_text");
    headmasterData = await getSettings("headmaster");
    heroSliderData = await getSettings("hero_slider");
    posts = await getPosts();
    announcements = await getAnnouncements();
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }

  const latestPosts = posts.slice(0, 4);
  const headmaster = headmasterData || defaultHeadmaster;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden">
      <AOSInit />
      {/* Running Text */}
      <RunningText text={runningTextData?.text} />

      {/* Hero Section */}
      <div className="relative">
        <HeroSlider images={heroSliderData?.images} />
        {/* Wave Divider Logic: Usually overlap the slider bottom */}
        <div className="absolute -bottom-1 left-0 w-full z-20">
          <WaveDivider position="bottom" color="fill-slate-50" />
        </div>
      </div>

      {/* Portal Layout Section */}
      <section className="py-12 md:py-20 bg-slate-50 relative">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main Content (Left Column) - 8 cols */}
            <div className="lg:col-span-8 space-y-16">

              {/* Features / Quick Access - UPGRADED */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Layanan PTSP", desc: "Permohonan surat & legalisir", icon: BookOpen, color: "bg-green-500", href: "/ptsp", shadow: "shadow-green-200" },
                  { label: "Rapor Digital", desc: "Hasil evaluasi siswa", icon: GraduationCap, color: "bg-yellow-500", href: "#", shadow: "shadow-yellow-200" },
                  { label: "Galeri", desc: "Dokumentasi kegiatan", icon: ImageIcon, color: "bg-pink-500", href: "/galeri", shadow: "shadow-pink-200" }
                ].map((item, idx) => (
                  <Link href={item.href} key={idx} className="group relative" data-aos="fade-right" data-aos-delay={idx * 150}>
                    <div className={`h-full p-6 rounded-2xl bg-white border border-slate-100 shadow-xl ${item.shadow} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}>
                      <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                        <item.icon size={100} className={`text-${item.color.split('-')[1]}-500`} />
                      </div>
                      <div className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{item.label}</h3>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Latest News - UPGRADED */}
              <div data-aos="fade-up">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                    <span className="h-2 w-8 bg-primary rounded-full"></span>
                    Berita Terbaru
                  </h2>
                  <Button asChild variant="ghost" className="text-primary font-bold hover:bg-primary/10">
                    <Link href="/berita" className="flex items-center gap-2">Lihat Semua <ArrowRight size={16} /></Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {latestPosts.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-muted-foreground bg-white rounded-2xl border-2 border-dashed border-slate-200">
                      <div className="bg-slate-100 p-4 rounded-full mb-4">
                        <Bell className="h-8 w-8 text-slate-400" />
                      </div>
                      <p className="font-medium">Belum ada berita terbaru.</p>
                    </div>
                  ) : (
                    latestPosts.map((item: any, index: number) => (
                      <Card key={item.id} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl h-full flex flex-col" data-aos="fade-up" data-aos-delay={index * 150}>
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={item.image_url || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full shadow-sm text-slate-800 flex items-center gap-1">
                            <Calendar size={12} className="text-primary" />
                            {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                        </div>
                        <CardContent className="flex-1 p-6 relative bg-white">
                          <h3 className="mb-3 text-xl font-bold leading-snug text-slate-800 group-hover:text-primary transition-colors line-clamp-2">
                            <Link href={`/berita/${item.id}`}>
                              {item.title}
                            </Link>
                          </h3>
                          <p className="text-slate-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {item.excerpt}
                          </p>
                          <div className="pt-4 border-t w-full mt-auto">
                            <Link href={`/berita/${item.id}`} className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                              Baca Selengkapnya <ChevronRight size={16} className="ml-1" />
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Sidebar (Right Column) - 4 cols */}
            <div className="lg:col-span-4 space-y-10">

              {/* Headmaster Welcome Widget - UPGRADED */}
              <div className="relative pt-12" data-aos="fade-left" data-aos-delay="200">
                <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-br from-primary to-green-800 rounded-t-2xl -z-10 mx-4 translate-y-4 opacity-80"></div>
                <Card className="overflow-hidden shadow-xl border-none rounded-2xl relative bg-white">
                  <div className="relative h-64 w-full group">
                    <Image
                      src={headmaster.image}
                      alt={headmaster.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                      <h4 className="font-bold text-xl mb-0.5 shadow-black drop-shadow-md">{headmaster.name}</h4>
                      <p className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded inline-block">Kepala Madrasah</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="relative">
                      <span className="absolute -top-4 -left-2 text-6xl text-slate-200 font-serif leading-none">“</span>
                      <p className="text-slate-600 italic leading-relaxed relative z-10 pl-6 border-l-2 border-primary/30">
                        {headmaster.message}
                      </p>
                    </div>
                    <Button asChild className="w-full mt-6 bg-slate-900 hover:bg-primary transition-colors">
                      <Link href="/profil">Baca Profil Lengkap <ArrowRight size={14} className="ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Announcements Widget - UPGRADED */}
              <div data-aos="fade-left" data-aos-delay="400">
                <Card className="shadow-lg border-t-8 border-t-yellow-500 rounded-xl overflow-hidden">
                  <div className="bg-yellow-50 p-5 border-b border-yellow-100 flex items-center gap-3">
                    <div className="bg-yellow-500 p-2 rounded-lg text-white shadow-sm rotate-3">
                      <Bell className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-800">Papan Pengumuman</h3>
                      <p className="text-xs text-slate-500">Update informasi akademik terbaru</p>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <ul className="divide-y divide-yellow-100/50">
                      {announcements.length === 0 ? (
                        <li className="p-8 text-center text-sm text-slate-400 bg-slate-50">
                          Belum ada aktivitas baru.
                        </li>
                      ) : (
                        announcements.slice(0, 5).map((item: any) => (
                          <li key={item.id} className="group hover:bg-yellow-50/30 transition-colors">
                            <Link href="#" className="block p-4 pl-5 border-l-4 border-transparent hover:border-yellow-400 transition-all">
                              <h4 className="text-sm font-bold text-slate-700 group-hover:text-yellow-700 transition-colors line-clamp-1 mb-1">
                                {item.title}
                              </h4>
                              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-0">
                    <Link href="#" className="block w-full py-3 text-center text-sm font-bold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                      Lihat Arsip Pengumuman
                    </Link>
                  </CardFooter>
                </Card>
              </div>

              {/* Quotes Widget - UPGRADED */}
              <div data-aos="fade-left" data-aos-delay="600">
                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl border-none rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <BookOpen size={120} />
                  </div>
                  <CardContent className="p-8 relative z-10 text-center">
                    <h3 className="font-bold text-lg mb-4 flex items-center justify-center gap-2 opacity-90">
                      <Star size={18} className="text-yellow-300" /> Kata Mutiara
                    </h3>
                    <blockquote className="text-lg font-serif italic mb-6 leading-relaxed opacity-95">
                      "Pendidikan adalah senjata paling ampuh yang bisa digunakan untuk mengubah dunia."
                    </blockquote>
                    <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold">
                      - Nelson Mandela
                    </div>
                  </CardContent>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION (New) */}
      <StatisticsSection />
    </div>
  );
}

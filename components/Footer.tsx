import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

export default function Footer() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <NextImage src="/logo.png" alt="Logo MTsN 1 Labuhanbatu" width={40} height={40} className="h-10 w-10 object-contain" />
                            <span className="text-xl font-bold text-white">MTsN 1 Labuhanbatu</span>
                        </div>
                        <p className="text-sm text-primary-foreground/80 leading-relaxed">
                            Mewujudkan generasi yang beriman, berilmu, dan berakhlak mulia melalui pendidikan berkualitas dan lingkungan islami.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold text-secondary uppercase tracking-wider">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/profil" className="hover:text-secondary transition-colors flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-secondary"></span>
                                    Profil Madrasah
                                </Link>
                            </li>
                            <li>
                                <Link href="/guru" className="hover:text-secondary transition-colors flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-secondary"></span>
                                    Guru & Staf
                                </Link>
                            </li>
                            <li>
                                <Link href="/ppdb" className="hover:text-secondary transition-colors flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-secondary"></span>
                                    PPDB Online
                                </Link>
                            </li>
                            <li>
                                <Link href="/galeri" className="hover:text-secondary transition-colors flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-secondary"></span>
                                    Galeri Kegiatan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold text-secondary uppercase tracking-wider">Kontak Kami</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 shrink-0 text-secondary" />
                                <span>Jl. Kampung Baru Gg. Tsanawiyah No 150, Rantau Prapat, Labuhanbatu</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-secondary" />
                                <span>(0624) 24713</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-secondary" />
                                <span>info@mtsn1labuhanbatu.sch.id</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-bold text-secondary uppercase tracking-wider">Ikuti Kami</h3>
                        <div className="flex gap-4">
                            <Link href="https://facebook.com/mtsn1labuhanbatuofficial" target="_blank" className="rounded-full bg-white/10 p-3 hover:bg-secondary hover:text-primary transition-all hover:scale-110">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                            <Link href="https://www.instagram.com/mtsn1labuhanbatuofficial" target="_blank" className="rounded-full bg-white/10 p-3 hover:bg-secondary hover:text-primary transition-all hover:scale-110">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="https://youtube.com/@mtsn1labuhanbatu81" target="_blank" className="rounded-full bg-white/10 p-3 hover:bg-secondary hover:text-primary transition-all hover:scale-110">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">Youtube</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
                    <p>&copy; {new Date().getFullYear()} MTsN 1 Labuhanbatu. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

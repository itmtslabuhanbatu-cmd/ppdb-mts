"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { carouselImages as defaultImages } from "@/lib/data";

export default function HeroSlider({ images }: { images?: string[] }) {
    const displayImages = images && images.length > 0 ? images : defaultImages;

    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000 }),
    ]);

    return (
        <section className="relative h-[600px] w-full overflow-hidden bg-slate-900 group">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pointer-events-none" />

            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full flex">
                    {displayImages.map((src, index) => (
                        <div className="embla__slide relative h-full w-full flex-[0_0_100%]" key={index}>
                            <Image
                                src={src}
                                alt={`Slide ${index + 1}`}
                                fill
                                className="object-cover opacity-60"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute inset-0 z-20 container flex h-full flex-col items-center justify-center text-center text-white pointer-events-none">
                <div className="pointer-events-auto">
                    <div className="mb-4 animate-fade-in-down">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight">
                            Penerimaan Murid Baru Madrasah (PMBM) Telah Dibuka
                        </h1>
                    </div>
                    <h2 className="mb-6 text-xl sm:text-2xl md:text-3xl font-bold max-w-4xl drop-shadow-md text-slate-100 animate-fade-in-up">
                        Unggul dalam <span className="text-secondary">Prestasi</span>, <span className="text-secondary">Terampil</span>, <span className="text-secondary">Ber-Akhlak</span> & Berwawasan Lingkungan
                    </h2>
                    <p className="mb-8 max-w-2xl text-lg text-slate-200 drop-shadow-md animate-fade-in-up delay-100">
                        MTsN 1 Labuhanbatu berkomitmen mencetak kader bangsa yang unggul dalam IMTAQ dan IPTEK.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                        <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8">
                            <Link href="/ppdb">Daftar Sekarang</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                            <Link href="/profil">Profil Madrasah</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

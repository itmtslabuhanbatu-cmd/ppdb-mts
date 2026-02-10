import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import NextImage from "next/image";

export default function Navbar() {
    const navLinks = [
        { name: "Beranda", href: "/" },
        { name: "Profil", href: "/profil" },
        { name: "Guru & Staf", href: "/guru" },
        { name: "Galeri", href: "/galeri" },
        { name: "Berita", href: "/berita" },
    ];

    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>(0624) 123456</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>info@mtsn1labuhanbatu.sch.id</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="hover:text-secondary transition-colors">
                            <Facebook className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="hover:text-secondary transition-colors">
                            <Instagram className="h-4 w-4" />
                        </Link>
                        <Link href="#" className="hover:text-secondary transition-colors">
                            <Youtube className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
                <div className="container flex h-20 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <NextImage src="/logo.png" alt="Logo MTsN 1 Labuhanbatu" width={48} height={48} className="h-12 w-12 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold leading-none text-primary">
                                MTsN 1
                            </span>
                            <span className="text-sm font-medium leading-none text-muted-foreground">
                                Labuhanbatu
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-semibold text-slate-700 transition-colors hover:text-primary uppercase tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-md">
                            <Link href="/ppdb">PMBM Online</Link>
                        </Button>
                    </nav>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-primary">
                                    <Menu className="h-8 w-8" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-6 mt-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <NextImage src="/logo.png" alt="Logo MTsN 1 Labuhanbatu" width={40} height={40} className="h-10 w-10 object-contain" />
                                        <div className="flex flex-col">
                                            <span className="text-lg font-bold leading-none text-primary">
                                                MTsN 1
                                            </span>
                                            <span className="text-sm font-medium leading-none text-muted-foreground">
                                                Labuhanbatu
                                            </span>
                                        </div>
                                    </div>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="text-lg font-medium text-slate-700 transition-colors hover:text-primary border-b pb-2"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Button asChild className="w-full bg-primary hover:bg-primary/90 mt-4">
                                        <Link href="/ppdb">PMBM Online</Link>
                                    </Button>

                                    <div className="mt-8 pt-8 border-t">
                                        <p className="text-sm text-muted-foreground mb-4">Hubungi Kami:</p>
                                        <div className="flex flex-col gap-3 text-sm text-slate-600">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                <span>(0624) 123456</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-4 w-4" />
                                                <span>info@mtsn1labuhanbatu.sch.id</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </div>
    );
}

"use client";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, Users, LogOut, GraduationCap, Bell, ClipboardList, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>{children}</AdminLayoutContent>
        </SessionProvider>
    );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const sidebarItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Berita & Artikel", href: "/admin/berita", icon: FileText },
        { name: "Pengumuman", href: "/admin/pengumuman", icon: Bell },
        { name: "Galeri Foto", href: "/admin/galeri", icon: ImageIcon },
        { name: "Layanan PTSP", href: "/admin/ptsp", icon: ClipboardList },
        { name: "Data PPDB", href: "/admin/ppdb", icon: Users },
        { name: "Pengaturan", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col fixed h-full">
                <div className="p-6 border-b flex items-center gap-3">
                    <div className="bg-primary p-1.5 rounded-md">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-primary text-lg">Admin Panel</span>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => signOut({ callbackUrl: "/admin" })}
                    >
                        <LogOut className="mr-2 h-5 w-5" />
                        Keluar
                    </Button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-md">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-primary">Admin Panel</span>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <div className="h-full flex flex-col bg-white">
                            <div className="p-6 border-b flex items-center gap-3">
                                <div className="bg-primary p-1.5 rounded-md">
                                    <GraduationCap className="h-6 w-6 text-white" />
                                </div>
                                <span className="font-bold text-primary text-lg">Admin Panel</span>
                            </div>
                            <nav className="flex-1 p-4 space-y-1">
                                {sidebarItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${isActive
                                                ? "bg-primary/10 text-primary"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                            <div className="p-4 border-t">
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => signOut({ callbackUrl: "/admin" })}
                                >
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Keluar
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8">
                {children}
            </main>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Users, GraduationCap, Trophy, School } from "lucide-react";

export default function StatisticsSection() {
    const stats = [
        {
            id: 1,
            label: "Siswa Aktif",
            value: 850,
            icon: Users,
            color: "text-blue-400",
        },
        {
            id: 2,
            label: "Guru & Staf",
            value: 45,
            icon: School,
            color: "text-green-400",
        },
        {
            id: 3,
            label: "Alumni Tertaut",
            value: 2300,
            icon: GraduationCap,
            color: "text-yellow-400",
        },
        {
            id: 4,
            label: "Prestasi Diraih",
            value: 120,
            icon: Trophy,
            color: "text-red-400",
        },
    ];

    return (
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Statistik Madrasah</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Angka-angka yang menggambarkan pertumbuhan dan capaian MTsN 1 Labuhanbatu dalam mendidik generasi penerus bangsa.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat) => (
                        <CounterItem key={stat.id} stat={stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function CounterItem({ stat }: { stat: any }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [stat.value]);

    const Icon = stat.icon;

    return (
        <div className="p-6 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-500 transition-all hover:-translate-y-2 hover:shadow-xl">
            <div className={`mb-4 inline-flex p-4 rounded-full bg-slate-800 ${stat.color} shadow-lg`}>
                <Icon size={32} />
            </div>
            <h3 className="text-4xl font-extrabold mb-1">{count}+</h3>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">{stat.label}</p>
        </div>
    );
}

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { teachers } from "@/lib/data";

export default function GuruPage() {
    return (
        <div className="container py-12">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                    Guru & Staf Pengajar
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Pendidik profesional yang siap membimbing siswa menuju kesuksesan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {teachers.map((teacher) => (
                    <Card key={teacher.id} className="overflow-hidden text-center hover:shadow-lg transition-shadow">
                        <div className="relative mx-auto mt-6 h-32 w-32 overflow-hidden rounded-full border-2 border-secondary">
                            <Image
                                src={teacher.image}
                                alt={teacher.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">{teacher.name}</CardTitle>
                            <CardDescription className="text-primary font-medium">{teacher.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                NIP. 19800101 200501 1 001
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTeachers } from "@/app/actions/teachers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GuruPage() {
    let teachers = [];
    try {
        teachers = await getTeachers();
    } catch (e) {
        console.error("Failed to fetch teachers", e);
    }

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
                {teachers.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-slate-50 rounded-lg border border-dashed">
                        Belum ada data guru.
                    </div>
                ) : (
                    teachers.map((teacher: any) => (
                        <Card key={teacher.id} className="overflow-hidden text-center hover:shadow-lg transition-shadow">
                            <div className="relative mx-auto mt-6 h-32 w-32 overflow-hidden rounded-full border-2 border-secondary bg-slate-100">
                                {teacher.image_url ? (
                                    <Image
                                        src={teacher.image_url}
                                        alt={teacher.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                                <CardDescription className="text-primary font-medium">{teacher.position}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    {teacher.nip ? `NIP. ${teacher.nip}` : "-"}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

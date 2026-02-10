"use client";

import { useActionState } from "react"; // Correct hook for Next.js 15+ / React 19 actions? Or check version.
// Checking package.json: "react": "^19.2.4", "next": "^16.1.5".
// React 19 usa `useActionState` instead of `useFormState`.

import { registerStudent } from "@/app/actions/ppdb-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Mendaftar..." : "Daftar Akun"}
        </Button>
    );
}

export default function RegisterPage() {
    const [state, formAction] = useActionState(registerStudent, null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-green-700">Buat Akun PMBM</CardTitle>
                    <CardDescription>
                        MTsN 1 Labuhanbatu
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {state?.error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 flex items-center gap-2 text-sm">
                            <AlertCircle size={16} />
                            {state.error}
                        </div>
                    )}
                    {state?.success && (
                        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4 flex items-center gap-2 text-sm">
                            <CheckCircle2 size={16} />
                            <span>{state.message} <Link href="/ppdb/login" className="underline font-bold">Login disini</Link></span>
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nisn">NISN (Nomor Induk Siswa Nasional)</Label>
                            <Input
                                id="nisn"
                                name="nisn"
                                placeholder="Masukkan NISN valid"
                                required
                                type="text"
                                pattern="[0-9]*"
                                inputMode="numeric"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimal 6 karakter"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Ulangi Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Ketik ulang password"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <SubmitButton />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-gray-600">
                    Sudah punya akun? <Link href="/ppdb/login" className="ml-1 text-green-700 font-semibold hover:underline">Login</Link>
                </CardFooter>
            </Card>
        </div>
    );
}

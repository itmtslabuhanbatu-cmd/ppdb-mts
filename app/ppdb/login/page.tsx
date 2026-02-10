"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(searchParams.get("error") === "CredentialsSignin" ? "NISN atau Password salah!" : "");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Login gagal! Cek NISN dan Password.");
                setLoading(false);
            } else {
                // Determine redirect based on username (simple check) or let middleware handle it.
                // For better UX, we redirect explicitly.
                router.refresh(); // Update session
                router.refresh(); // Update session
                const callbackUrl = searchParams.get("callbackUrl");
                if (callbackUrl) {
                    router.push(callbackUrl);
                } else if (username === 'admin') {
                    router.push("/admin/dashboard");
                } else {
                    router.push("/siswa/dashboard");
                }
            }
        } catch (err) {
            setError("Terjadi kesalahan sistem.");
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-700">Login PMBM</CardTitle>
                <CardDescription>
                    Masuk untuk melanjutkan pendaftaran
                </CardDescription>
            </CardHeader>
            <CardContent>
                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 flex items-center gap-2 text-sm">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">NISN / Username</Label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Masukkan NISN"
                            required
                            autoFocus
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="******"
                            required
                        />
                    </div>

                    <div className="pt-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {loading ? "Masuk..." : "Masuk"}
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 justify-center text-sm text-gray-600">
                <div>
                    Belum punya akun? <Link href="/ppdb/register-account" className="ml-1 text-green-700 font-semibold hover:underline">Daftar sekarang</Link>
                </div>
            </CardFooter>
        </Card>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}

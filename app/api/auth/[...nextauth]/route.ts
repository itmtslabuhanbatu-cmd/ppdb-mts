import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username / NISN", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // 1. Check for Admin (Hardcoded)
                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "admin123"
                ) {
                    return {
                        id: "admin-id",
                        name: "Admin",
                        email: "admin@mtsn1labuhanbatu.sch.id",
                        role: "admin"
                    };
                }

                // 2. Check for Student (Supabase)
                if (credentials?.username && credentials?.password) {
                    const { data: user, error } = await supabase
                        .from("ppdb_users")
                        .select("*")
                        .eq("nisn", credentials.username)
                        .single();

                    if (user && !error) {
                        const passwordsMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (passwordsMatch) {
                            return {
                                id: user.id,
                                name: user.nisn, // Use NISN as name for now
                                email: `${user.nisn}@siswa.mtsn1labuhanbatu.sch.id`, // Dummy email
                                role: "student"
                            };
                        }
                    }
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/ppdb/login", // Redirect here for login
        error: "/ppdb/login", // Redirect here on error
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

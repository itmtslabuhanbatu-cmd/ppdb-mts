import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Hardcoded admin credentials for now (should be moved to env or DB later)
                const adminUser = { id: "1", name: "Admin", email: "admin@mtsn1labuhanbatu.sch.id" };

                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "admin123" // Default password
                ) {
                    return adminUser;
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin", // Custom login page
    },
    callbacks: {
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

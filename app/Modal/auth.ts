import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const { NEXTAUTH_URL } = process.env;

export const authConfig: AuthOptions = {
    providers: [

        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        //     redirectUri: `${NEXTAUTH_URL}/api/auth/callback/google`,
        //     options: {
        //       buttonColor: "#000000",
        //     },
        //   }),

        CredentialsProvider({
            name: "Credentials",
            id: "login",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const { email, password }: { name: string; password: string } | any =
                    credentials;

                try {
                    // Send a POST request to login API endpoint with provided credentials
                    const res = await fetch(`${NEXTAUTH_URL}/api/user/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    // Parse the respose as JSON to get user data.
                    const user = await res.json();

                    if (user.status === 200) {
                        return user;
                    }

                    // If authenticatoin fails, return null
                    return null;
                } catch (e) {
                    console.log("e", e);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt", // Use JSON Web Tokens (JWT) for session management.
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        // The jwt callback merges user data into the token
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        // Callback for determining if the user is signed in
        async signIn({ user }) {
            if (user) {
                return true;
            }
            return false;
        },

        // Add user to the session
        async session({ session, token }) {
            session.user = token as any;

            return session;
        },
    },
};
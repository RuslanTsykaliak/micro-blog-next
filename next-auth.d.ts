import NextAuth from "next-auth/next";


declare module 'next-auth' {
    // Extend the 'Session' interface to include custom user data.
    interface Session {
        user: {
            status: string;
            data: UserData;
        }
    }
}
interface UserData {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}
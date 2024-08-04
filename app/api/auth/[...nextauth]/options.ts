import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            return session;
        },
        async signIn({account, profile}){
            if (!profile?.email) return false;
            try {
                await dbConnect();
                const user = await User.findOne({ email: profile.email });
                if (!user) {
                    const newUser = new User({
                        name: profile.name,
                        email: profile.email
                    });
                    await newUser.save();
                }
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    },
};
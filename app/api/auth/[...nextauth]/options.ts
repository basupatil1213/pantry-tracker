import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

// Add this type declaration at the top of the file
declare module "next-auth" {
    interface Session {
        user: {
            userId: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        }
    }
}

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
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.userId = token.id as string;
            }
            return session;
        },
        async signIn({ account, profile }) {
            if (!profile?.email) return false;
            try {
                await dbConnect();
                let user = await User.findOne({ email: profile.email });
                if (!user) {
                    user = new User({
                        name: profile.name,
                        email: profile.email
                    });
                    await user.save();
                }
                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
        }
    },
    debug: process.env.NODE_ENV === 'development',
};
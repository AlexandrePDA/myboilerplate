import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        const user = response;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user?.password || ""
        );

        if (user === null) {
          return null;
        }

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
            linkedin: user.linkedin,
            image: user.email,
            isPremium: user.isPremium,
            github: user.github,
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordTokenExpiry: user.resetPasswordTokenExpiry,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: any; token: any }) => {
      if (session.user) {
        session.user.linkedin = token.linkedin;
        session.user.id = token.id;
        session.user.isPremium = token.isPremium;
        session.user.github = token.github;
        session.user.resetPasswordToken = token.resetPasswordToken;
        session.user.resetPasswordTokenExpiry = token.resetPasswordTokenExpiry;
      }
      return session;
    },
    async jwt({ token }) {
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      token.id = existingUser?.id;
      token.linkedin = existingUser?.linkedin;
      token.isPremium = existingUser?.isPremium;
      token.github = existingUser?.github;
      token.resetPasswordToken = existingUser?.resetPasswordToken;
      token.resetPasswordTokenExpiry = existingUser?.resetPasswordTokenExpiry;

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const login = async (credentials) => {
  try {
    const { email, password } = credentials;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("No user found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.name;
        token.img = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.username;
        session.user.avatar = token.img;
      }
      return session;
    },
  },
});

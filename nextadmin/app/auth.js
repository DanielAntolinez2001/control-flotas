import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";
import { authConfig } from "@/app/authconfig";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const login = async (credentials) => {
  try {
    const { email, password } = credentials;

    const user = await prisma.user.findMany({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    console.log("hola", user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    console.log(user);

    return user;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
};

export const { signIn, singOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
        }
      },
    }),
  ],
});

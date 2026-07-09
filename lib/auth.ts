import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const fallbackUser = process.env.ADMIN_USERNAME ?? "admin";
        const fallbackPassword = process.env.ADMIN_PASSWORD ?? "change-me";

        const usernameMatches = credentials.username === fallbackUser;
        const passwordMatches =
          credentials.password === fallbackPassword ||
          (fallbackPassword.startsWith("$2") &&
            (await bcrypt.compare(credentials.password, fallbackPassword)));

        if (!usernameMatches || !passwordMatches) {
          return null;
        }

        return {
          id: "admin-1",
          name: credentials.username,
          role: "superadmin"
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "editor";
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
      }

      return session;
    }
  }
};


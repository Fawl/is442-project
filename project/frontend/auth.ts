import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { LoginFormSchema } from "./schemas";
import { getUserByEmail } from "./actions/user.action";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await getUserByEmail(token.email);
      if (!existingUser) return token;

      token.role = existingUser.user_type;

      return {
        ...token,
      };
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password)
            throw new Error("User with that email does not exist!");

          const passwordsMatch = password === user.password;
          if (!passwordsMatch) throw new Error("Incorrect password!");

          return user;
        }
        return null;
      },
    }),
  ],
};
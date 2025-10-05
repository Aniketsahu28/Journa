import { comparePassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/accounts/login"
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "johndoe@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User with this email does not exist");
        }

        const passwordMatch = await comparePassword(
          credentials.password,
          user.password as string
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        if (user.emailVerified == null) {
          throw new Error("Please verify your email!");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
          country: user.country
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.image = user.image
        token.dateOfBirth = user.dateOfBirth
        token.country = user.country
      };

      if (trigger === 'update' && session) {
        const dbUser = await prisma.user.findUnique({
          where: {
            id: Number(token.id)
          }
        })

        if (dbUser) {
          token.name = dbUser.name
          token.dateOfBirth = dbUser.dateOfBirth
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.image,
        dateOfBirth: token.dateOfBirth,
        country: token.country
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

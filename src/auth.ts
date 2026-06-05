import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";

import { trackServerEvent } from "@/lib/analytics";
import { isDatabaseConfigured, isProductionServer } from "@/lib/server-env";
import { DEFAULT_LOCALE, buildLocalePath } from "@/lib/site";
import { signInSchema } from "@/lib/validation";
import { createOAuthUser, getUserByEmail } from "@/lib/users";

const googleAuthEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  logger: {
    error(error: Error) {
      const message = error instanceof Error ? `${error.name} ${error.message}` : String(error);

      if (
        !isProductionServer() &&
        (/JWTSessionError/.test(message) || /no matching decryption secret/i.test(message))
      ) {
        return;
      }

      console.error("[auth][error]", error);
    },
  },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await getUserByEmail(parsed.data.email);
        if (!user?.passwordHash) {
          return null;
        }

        const passwordMatches = await compare(parsed.data.password, user.passwordHash);
        if (!passwordMatches) {
          return null;
        }

        await trackServerEvent({
          name: "account.login",
          locale: user.preferredLocale,
          path: buildLocalePath(user.preferredLocale, "/sign-in"),
          payload: {
            role: user.role,
          },
          userId: user.id,
        });

        return {
          id: user.id,
          name: user.name ?? user.email,
          email: user.email,
          role: user.role,
          preferredLocale: user.preferredLocale,
          preferredGrantTypeId: user.preferredGrantTypeId,
        };
      },
    }),
    ...(googleAuthEnabled
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && token.email && isDatabaseConfigured()) {
        const existingUser = await getUserByEmail(token.email);
        const localUser =
          existingUser ??
          (await createOAuthUser({
            name: typeof token.name === "string" ? token.name : null,
            email: token.email,
            preferredLocale: DEFAULT_LOCALE,
          }));

        token.sub = localUser.id;
        token.role = localUser.role;
        token.preferredLocale = localUser.preferredLocale;
        token.preferredGrantTypeId = localUser.preferredGrantTypeId;
      }

      if (user && account?.provider !== "google") {
        token.role = typeof user.role === "string" ? user.role : "user";
        token.preferredLocale =
          typeof user.preferredLocale === "string" ? user.preferredLocale : DEFAULT_LOCALE;
        token.preferredGrantTypeId =
          typeof user.preferredGrantTypeId === "string" ? user.preferredGrantTypeId : null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = typeof token.role === "string" ? token.role : "user";
        session.user.preferredLocale =
          typeof token.preferredLocale === "string" ? token.preferredLocale : DEFAULT_LOCALE;
        session.user.preferredGrantTypeId =
          typeof token.preferredGrantTypeId === "string" ? token.preferredGrantTypeId : null;
      }

      return session;
    },
  },
});

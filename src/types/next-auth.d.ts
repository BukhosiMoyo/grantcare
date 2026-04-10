import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
      preferredLocale?: string;
      preferredGrantTypeId?: string | null;
    };
  }

  interface User {
    role?: string;
    preferredLocale?: string;
    preferredGrantTypeId?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    preferredLocale?: string;
    preferredGrantTypeId?: string | null;
  }
}

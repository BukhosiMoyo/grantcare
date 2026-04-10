import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getUserById } from "@/lib/users";
import { buildLocalePath, type Locale } from "@/lib/site";

export async function getSessionUser() {
  let session = null;

  try {
    session = await auth();
  } catch {
    return null;
  }

  if (!session?.user?.id) {
    return null;
  }

  return getUserById(session.user.id);
}

export async function requireUser(locale: Locale, nextPath: string) {
  const user = await getSessionUser();
  if (!user) {
    redirect(
      buildLocalePath(locale, `/sign-in?next=${encodeURIComponent(nextPath)}`),
    );
  }

  return user;
}

export async function requireAdmin(locale: Locale, nextPath: string) {
  const user = await requireUser(locale, nextPath);

  if (user.role !== "admin") {
    redirect(buildLocalePath(locale, "/dashboard"));
  }

  return user;
}

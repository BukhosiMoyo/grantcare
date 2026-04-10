"use server";

import { AuthError } from "next-auth";
import { hash } from "bcryptjs";

import { signIn, signOut } from "@/auth";
import { trackServerEvent } from "@/lib/analytics";
import { completePasswordReset, createPasswordResetRequest } from "@/lib/password-reset";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, isLocale } from "@/lib/site";
import { isDatabaseConfigured } from "@/lib/server-env";
import { createUser, getUserByEmail } from "@/lib/users";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/validation";

export type AuthActionState = {
  error?: string;
  success?: string;
  debugPath?: string;
  fieldErrors?: Partial<
    Record<"name" | "email" | "password" | "confirmPassword", string>
  >;
};

function getLocale(value: FormDataEntryValue | null) {
  return typeof value === "string" && isLocale(value) ? value : "en";
}

function mapFieldErrors(
  fieldErrors: Partial<Record<"name" | "email" | "password" | "confirmPassword", string[] | undefined>>,
): AuthActionState["fieldErrors"] {
  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    password: fieldErrors.password?.[0],
    confirmPassword: fieldErrors.confirmPassword?.[0],
  };
}

export async function authenticateAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = getLocale(formData.get("locale"));
  const copy = getCopy(locale);
  const nextPath = typeof formData.get("next") === "string" && formData.get("next")
    ? String(formData.get("next"))
    : buildLocalePath(locale, "/dashboard");

  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { fieldErrors: mapFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  if (!isDatabaseConfigured()) {
    return { error: copy.authUnavailable };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: nextPath,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: copy.invalidCredentials };
    }

    throw error;
  }

  return {};
}

export async function registerAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = getLocale(formData.get("locale"));
  const copy = getCopy(locale);

  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { fieldErrors: mapFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  if (!isDatabaseConfigured()) {
    return { error: copy.authUnavailable };
  }

  const existingUser = await getUserByEmail(parsed.data.email);
  if (existingUser) {
    return { fieldErrors: { email: copy.accountExists } };
  }

  const passwordHash = await hash(parsed.data.password, 12);

  const createdUser = await createUser({
    name: parsed.data.name,
    email: parsed.data.email,
    passwordHash,
    preferredLocale: locale,
  });

  await trackServerEvent({
    name: "account.signup",
    locale,
    path: buildLocalePath(locale, "/sign-up"),
    payload: {
      preferredLocale: locale,
    },
    userId: createdUser.id,
  });

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: buildLocalePath(locale, "/dashboard"),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: copy.invalidCredentials };
    }

    throw error;
  }

  return {};
}

export async function requestPasswordResetAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = getLocale(formData.get("locale"));
  const copy = getCopy(locale);

  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { fieldErrors: mapFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  if (!isDatabaseConfigured()) {
    return { error: copy.authUnavailable };
  }

  const resetRequest = await createPasswordResetRequest({
    email: parsed.data.email,
    locale,
  });

  return {
    success: copy.passwordResetSent,
    debugPath: resetRequest.debugPath ?? undefined,
  };
}

export async function resetPasswordAction(
  _previousState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const locale = getLocale(formData.get("locale"));
  const copy = getCopy(locale);

  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return { fieldErrors: mapFieldErrors(parsed.error.flatten().fieldErrors) };
  }

  if (!isDatabaseConfigured()) {
    return { error: copy.authUnavailable };
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const result = await completePasswordReset({
    token: parsed.data.token,
    passwordHash,
  });

  if (!result) {
    return { error: copy.resetPasswordInvalid };
  }

  await trackServerEvent({
    name: "account.password_reset_completed",
    locale,
    path: buildLocalePath(locale, "/reset-password"),
    userId: result.userId,
  });

  return { success: copy.passwordResetUpdated };
}

export async function signOutAction(formData: FormData) {
  const locale = getLocale(formData.get("locale"));
  await signOut({
    redirectTo: buildLocalePath(locale),
  });
}

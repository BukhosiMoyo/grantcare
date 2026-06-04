import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { Locale } from "@/lib/site";

type PasswordResetEmailCopy = {
  button: string;
  fallback: string;
  heading: string;
  intro: string;
  preview: string;
  subject: string;
};

const PASSWORD_RESET_EMAIL_COPY: Partial<Record<Locale, PasswordResetEmailCopy>> = {
  en: {
    button: "Reset password",
    fallback: "If you did not request this, you can ignore this email.",
    heading: "Reset your password",
    intro: "Use the button below to choose a new GrantCare password. This link expires in 2 hours.",
    preview: "Reset your GrantCare password",
    subject: "GrantCare password reset",
  },
  zu: {
    button: "Setha kabusha iphasiwedi",
    fallback: "Uma ungakucelanga lokhu, ungayiziba le imeyili.",
    heading: "Setha kabusha iphasiwedi yakho",
    intro: "Sebenzisa inkinobho engezansi ukuze ukhethe iphasiwedi entsha ye-GrantCare. Lesi sixhumanisi siphelelwa isikhathi emahoreni angu-2.",
    preview: "Setha kabusha iphasiwedi yakho ye-GrantCare",
    subject: "Ukusetha kabusha iphasiwedi ye-GrantCare",
  },
};

function getPasswordResetEmailCopy(locale: Locale) {
  return PASSWORD_RESET_EMAIL_COPY[locale] ?? (PASSWORD_RESET_EMAIL_COPY.en as PasswordResetEmailCopy);
}

export function getPasswordResetEmailSubject(locale: Locale) {
  return getPasswordResetEmailCopy(locale).subject;
}

export function PasswordResetEmail({ locale = "en", resetUrl }: { locale?: Locale; resetUrl: string }) {
  const copy = getPasswordResetEmailCopy(locale);

  return (
    <Html>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body style={{ backgroundColor: "#f5f3ee", color: "#1d2a21", fontFamily: "Arial, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "32px 20px" }}>
          <Section
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #d8d2c6",
              borderRadius: "24px",
              padding: "28px 24px",
            }}
          >
            <Heading style={{ fontSize: "28px", lineHeight: "34px", margin: "0 0 12px" }}>
              {copy.heading}
            </Heading>
            <Text style={{ color: "#4f5a53", fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              {copy.intro}
            </Text>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: "#285943",
                borderRadius: "999px",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 700,
                padding: "12px 20px",
                textDecoration: "none",
              }}
            >
              {copy.button}
            </Button>
            <Text style={{ color: "#4f5a53", fontSize: "13px", lineHeight: "22px", margin: "20px 0 0" }}>
              {copy.fallback}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

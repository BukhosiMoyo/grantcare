import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReminderTrigger } from "@prisma/client";

import type { Locale } from "@/lib/site";

const COPY: Record<
  Locale,
  {
    preview: string;
    paymentDate: string;
    manage: string;
    unsubscribe: string;
    subjectPrefix: string;
    published: string;
    oneDay: string;
    twoDays: string;
    official: string;
  }
> = {
  en: {
    preview: "Grant payment reminder",
    paymentDate: "Payment date",
    manage: "Manage reminders",
    unsubscribe: "Unsubscribe",
    subjectPrefix: "GrantCare reminder",
    published: "A new payment date was published for this grant category.",
    oneDay: "Your payment date is expected tomorrow.",
    twoDays: "Your payment date is expected in two days.",
    official: "Official link",
  },
  zu: {
    preview: "Isikhumbuzi sokukhokhwa kwesibonelelo",
    paymentDate: "Usuku lokukhokha",
    manage: "Phatha izikhumbuzi",
    unsubscribe: "Yeka izikhumbuzi",
    subjectPrefix: "Isikhumbuzi se-GrantCare",
    published: "Usuku olusha lokukhokha lushicilelwe kulesi sigaba sesibonelelo.",
    oneDay: "Usuku lokukhokha lulindeleke kusasa.",
    twoDays: "Usuku lokukhokha lulindeleke ezinsukwini ezimbili.",
    official: "Isixhumanisi esisemthethweni",
  },
  xh: {
    preview: "Isikhumbuzi sentlawulo yesibonelelo",
    paymentDate: "Umhla wentlawulo",
    manage: "Lawula izikhumbuzi",
    unsubscribe: "Yeka izikhumbuzi",
    subjectPrefix: "Isikhumbuzi se-GrantCare",
    published: "Kupapashwe umhla omtsha wentlawulo kweli candelo lesibonelelo.",
    oneDay: "Umhla wentlawulo ulindeleke ngomso.",
    twoDays: "Umhla wentlawulo ulindeleke kwiintsuku ezimbini.",
    official: "Ikhonkco elisemthethweni",
  },
  af: {
    preview: "Toelae betalingsherinnering",
    paymentDate: "Betaaldatum",
    manage: "Bestuur herinnerings",
    unsubscribe: "Teken uit",
    subjectPrefix: "GrantCare herinnering",
    published: "’n Nuwe betaaldatum is vir hierdie toelaagkategorie gepubliseer.",
    oneDay: "Jou betaaldatum word more verwag.",
    twoDays: "Jou betaaldatum word oor twee dae verwag.",
    official: "Amptelike skakel",
  },
  nso: {
    preview: "Kgopotšo ya tefelo ya thušo",
    paymentDate: "Letšatši la tefelo",
    manage: "Laola dikgopotšo",
    unsubscribe: "Tlogela dikgopotšo",
    subjectPrefix: "Kgopotšo ya GrantCare",
    published: "Go phatlaladitšwe letšatši le leswa la tefelo bakeng sa mohuta wo wa thušo.",
    oneDay: "Letšatši la gago la tefelo le letetšwe gosasa.",
    twoDays: "Letšatši la gago la tefelo le letetšwe mo matšatšing a mabedi.",
    official: "Kgokagano ya semmušo",
  },
  tn: {
    preview: "Kgopotso ya tefo ya thuso",
    paymentDate: "Letsatsi la tefo",
    manage: "Laola dikgopotso",
    unsubscribe: "Emisa dikgopotso",
    subjectPrefix: "Kgopotso ya GrantCare",
    published: "Go phasaladitswe letsatsi le lesha la tefo mo setlhopheng seno sa thuso.",
    oneDay: "Letsatsi la gago la tefo le solofetswe ka moso.",
    twoDays: "Letsatsi la gago la tefo le solofetswe mo malatsing a mabedi.",
    official: "Kgokagano ya semmuso",
  },
};

function getMessage(locale: Locale, trigger: ReminderTrigger) {
  const copy = COPY[locale];

  if (trigger === "on_publish") {
    return copy.published;
  }

  if (trigger === "two_days_before") {
    return copy.twoDays;
  }

  return copy.oneDay;
}

export function getReminderSubject(locale: Locale, grantName: string) {
  return `${COPY[locale].subjectPrefix}: ${grantName}`;
}

export function ReminderEmail({
  dashboardUrl,
  grantName,
  locale,
  note,
  officialUrl,
  paymentDate,
  paymentPageUrl,
  trigger,
  unsubscribeUrl,
}: {
  dashboardUrl: string;
  grantName: string;
  locale: Locale;
  note?: string | null;
  officialUrl: string;
  paymentDate?: string | null;
  paymentPageUrl: string;
  trigger: ReminderTrigger;
  unsubscribeUrl: string;
}) {
  const copy = COPY[locale];

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
              {grantName}
            </Heading>
            <Text style={{ color: "#4f5a53", fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              {getMessage(locale, trigger)}
            </Text>
            {paymentDate ? (
              <Text style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>
                {copy.paymentDate}: {paymentDate}
              </Text>
            ) : null}
            {note ? (
              <Text style={{ color: "#4f5a53", fontSize: "14px", lineHeight: "22px", margin: "0 0 20px" }}>
                {note}
              </Text>
            ) : null}
            <Button
              href={paymentPageUrl}
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
              {copy.manage}
            </Button>
            <Text style={{ color: "#4f5a53", fontSize: "13px", lineHeight: "22px", margin: "20px 0 0" }}>
              <Link href={dashboardUrl} style={{ color: "#285943" }}>
                {copy.manage}
              </Link>
              {" · "}
              <Link href={officialUrl} style={{ color: "#285943" }}>
                {copy.official}
              </Link>
              {" · "}
              <Link href={unsubscribeUrl} style={{ color: "#285943" }}>
                {copy.unsubscribe}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

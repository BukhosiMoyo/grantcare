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
import type { AppealReminderTrigger } from "@prisma/client";

import type { Locale } from "@/lib/site";

export const APPEAL_REMINDER_EMAIL_COPY: Record<
  Locale,
  {
    finalDeadline: string;
    manage: string;
    preview: string;
    subjectPrefix: string;
    twoDays: string;
    sevenDays: string;
    fourteenDays: string;
  }
> = {
  en: {
    finalDeadline: "Final appeal date",
    manage: "Open appeal pack",
    preview: "Appeal deadline reminder",
    subjectPrefix: "GrantCare appeal reminder",
    twoDays: "Your appeal deadline is in two days.",
    sevenDays: "Your appeal deadline is in seven days.",
    fourteenDays: "Your appeal deadline is in fourteen days.",
  },
  zu: {
    finalDeadline: "Usuku lokugcina lwesikhalazo",
    manage: "Vula iphakethe lesikhalazo",
    preview: "Isikhumbuzi somnqamulajuqu wesikhalazo",
    subjectPrefix: "Isikhumbuzi sesikhalazo se-GrantCare",
    twoDays: "Umnqamulajuqu wesikhalazo sakho usezinsukwini ezimbili.",
    sevenDays: "Umnqamulajuqu wesikhalazo sakho usezinsukwini eziyisikhombisa.",
    fourteenDays: "Umnqamulajuqu wesikhalazo sakho usezinsukwini eziyishumi nane.",
  },
  xh: {
    finalDeadline: "Umhla wokugqibela wesibheno",
    manage: "Vula ipakethi yesibheno",
    preview: "Isikhumbuzi somhla wesibheno",
    subjectPrefix: "Isikhumbuzi sesibheno se-GrantCare",
    twoDays: "Umhla wokugqibela wesibheno sakho kwiintsuku ezimbini.",
    sevenDays: "Umhla wokugqibela wesibheno sakho kwiintsuku ezisixhenxe.",
    fourteenDays: "Umhla wokugqibela wesibheno sakho kwiintsuku ezilishumi elinesine.",
  },
  af: {
    finalDeadline: "Finale appeldatum",
    manage: "Maak appelpakket oop",
    preview: "Appelsperdatum-herinnering",
    subjectPrefix: "GrantCare appelherinnering",
    twoDays: "Jou appelsperdatum is oor twee dae.",
    sevenDays: "Jou appelsperdatum is oor sewe dae.",
    fourteenDays: "Jou appelsperdatum is oor veertien dae.",
  },
  nso: {
    finalDeadline: "Letšatši la mafelelo la boipiletšo",
    manage: "Bula phakete ya boipiletšo",
    preview: "Kgopotšo ya nako ya boipiletšo",
    subjectPrefix: "Kgopotšo ya boipiletšo ya GrantCare",
    twoDays: "Nako ya gago ya boipiletšo e šetše matšatši a mabedi.",
    sevenDays: "Nako ya gago ya boipiletšo e šetše matšatši a šupago.",
    fourteenDays: "Nako ya gago ya boipiletšo e šetše matšatši a lesomenne.",
  },
  tn: {
    finalDeadline: "Letsatsi la bofelo la boikuelo",
    manage: "Bula sephuthelwana sa boikuelo",
    preview: "Kgopotso ya nako ya boikuelo",
    subjectPrefix: "Kgopotso ya boikuelo ya GrantCare",
    twoDays: "Nako ya gago ya boikuelo e setse malatsi a mabedi.",
    sevenDays: "Nako ya gago ya boikuelo e setse malatsi a supa.",
    fourteenDays: "Nako ya gago ya boikuelo e setse malatsi a lesomenne.",
  },
};

function getMessage(locale: Locale, trigger: AppealReminderTrigger) {
  const copy = APPEAL_REMINDER_EMAIL_COPY[locale];

  if (trigger === "fourteen_days_before") return copy.fourteenDays;
  if (trigger === "seven_days_before") return copy.sevenDays;
  return copy.twoDays;
}

export function getAppealReminderSubject(locale: Locale, grantLabel: string) {
  return `${APPEAL_REMINDER_EMAIL_COPY[locale].subjectPrefix}: ${grantLabel}`;
}

export function AppealReminderEmail({
  finalDeadline,
  grantLabel,
  locale,
  reasonLabel,
  resultUrl,
  trigger,
}: {
  finalDeadline: string;
  grantLabel: string;
  locale: Locale;
  reasonLabel: string;
  resultUrl: string;
  trigger: AppealReminderTrigger;
}) {
  const copy = APPEAL_REMINDER_EMAIL_COPY[locale];

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
              {grantLabel}
            </Heading>
            <Text style={{ color: "#4f5a53", fontSize: "15px", lineHeight: "24px", margin: "0 0 8px" }}>
              {reasonLabel}
            </Text>
            <Text style={{ color: "#4f5a53", fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              {getMessage(locale, trigger)}
            </Text>
            <Text style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 20px" }}>
              {copy.finalDeadline}: {finalDeadline}
            </Text>
            <Button
              href={resultUrl}
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
              <Link href={resultUrl} style={{ color: "#285943" }}>
                {copy.manage}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

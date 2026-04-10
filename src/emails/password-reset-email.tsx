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

export function PasswordResetEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <Html>
      <Head />
      <Preview>Reset your GrantCare password</Preview>
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
              Reset your password
            </Heading>
            <Text style={{ color: "#4f5a53", fontSize: "15px", lineHeight: "24px", margin: "0 0 16px" }}>
              Use the button below to choose a new GrantCare password. This link expires in 2 hours.
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
              Reset password
            </Button>
            <Text style={{ color: "#4f5a53", fontSize: "13px", lineHeight: "22px", margin: "20px 0 0" }}>
              If you did not request this, you can ignore this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

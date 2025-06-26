import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import { EVENT_DETAILS, TICKET_QUANTITY } from "@/constants";

interface TicketConfirmationEmailProps {
  customerName: string;
  totalAmount: string | null;
  transactionId: string;
}

export function TicketConfirmationEmail({
  customerName,
  totalAmount,
  transactionId,
}: TicketConfirmationEmailProps) {
  const { eventName, eventImageUrl, eventLocation, eventTime, eventDate } =
    EVENT_DETAILS;

  return (
    <Html
      style={{
        backgroundColor: "white",
      }}
    >
      <Head />
      <Preview>Your tickets for {eventName} are confirmed!</Preview>

      <Body style={main}>
        <Container style={container}>
          {/* ── Header ─────────────────────────────────────────── */}
          <Section style={header}>
            <Heading style={h1}>🎟️ Ticket Confirmation</Heading>
            <Text style={headerText}>
              Thank you for your purchase! Your tickets are confirmed.
            </Text>
          </Section>

          {/* ── Event Image ────────────────────────────────────── */}
          {eventImageUrl && (
            <Section style={imageSection}>
              <Img src={eventImageUrl} alt={eventName} style={eventImage} />
            </Section>
          )}

          {/* ── Greeting ───────────────────────────────────────── */}
          <Section style={section}>
            <Text style={greeting}>Hi {customerName},</Text>
            <Text style={text}>
              Great news! Your ticket purchase has been confirmed. We’re excited
              to see you at the event!
            </Text>
          </Section>

          {/* ── Event Details ──────────────────────────────────── */}
          <Section style={eventDetailsSection}>
            <Heading style={h2}>{eventName}</Heading>

            <Text style={labelText}>
              📅 Date:&nbsp;
              <span style={valueText}>{eventDate}</span>
            </Text>
            <Text style={labelText}>
              🕕 Time:&nbsp;
              <span style={valueText}>{eventTime}</span>
            </Text>
            <Text style={labelText}>
              📍 Location:&nbsp;
              <span style={valueText}>{eventLocation}</span>
            </Text>
          </Section>

          {/* ── Ticket Details ─────────────────────────────────── */}
          <Section style={section}>
            <Heading style={h3}>Ticket Details</Heading>

            <Text style={ticketLabel}>
              Quantity:&nbsp;
              <span style={ticketValue}>{TICKET_QUANTITY}</span>
            </Text>
            {totalAmount ? (
              <Text style={ticketLabel}>
                Total Amount:&nbsp;
                <span style={ticketValue}>{totalAmount}</span>
              </Text>
            ) : null}

            <Text style={ticketNumber}>
              Transaction ID:&nbsp;<strong>{transactionId}</strong>
            </Text>
          </Section>

          <Hr style={hr} />

          {/* ── Important Info ─────────────────────────────────── */}
          <Section style={section}>
            <Heading style={h3}>Important Information</Heading>
            <Text style={text}>
              • Please arrive 30 minutes before the event starts.
            </Text>
            <Text style={text}>
              • Bring a valid ID and this confirmation email.
            </Text>
            <Text style={text}>
              • Your name will be added to the guest list for easy entry.
            </Text>
          </Section>

          <Hr style={hr} />

          {/* ── Contact ────────────────────────────────────────── */}
          <Section style={section}>
            <Text style={text}>
              Questions about your order?&nbsp;
              <Link href="mailto:support@events.com" style={link}>
                support@events.com
              </Link>
            </Text>
          </Section>

          {/* ── Footer ─────────────────────────────────────────── */}
          <Section style={footer}>
            <Text style={footerText}>
              This email was sent to confirm your ticket purchase. Please save
              this email for your records.
            </Text>
            <Text style={footerText}>
              © 2024 EventCorp. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ─────────────────────────── Styles ────────────────────────── */
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const header = {
  padding: "32px 24px",
  backgroundColor: "#5469d4",
  textAlign: "center" as const,
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0 0 16px",
};

const headerText = {
  color: "#ffffff",
  fontSize: "16px",
  margin: "0",
};

const imageSection = { padding: "0 24px", textAlign: "center" as const };

const eventImage = {
  width: "100%",
  maxWidth: "400px",
  height: "auto",
  borderRadius: "8px",
  margin: "24px 0",
};

const section = { padding: "0 24px" };

const greeting = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  margin: "24px 0 16px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const eventDetailsSection = {
  padding: "24px",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
};

const h2 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const h3 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "24px 0 16px",
};

const labelText = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#666",
  margin: "6px 0",
};
const valueText = { fontSize: "14px", color: "#333" };

const hr = { borderColor: "#e9ecef", margin: "32px 24px" };

const ticketLabel = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#666",
  margin: "8px 0",
};
const ticketValue = { fontSize: "16px", color: "#333" };

const ticketNumber = {
  fontSize: "16px",
  color: "#333",
  margin: "20px 0 0",
  padding: "12px 0",
  backgroundColor: "#f8f9fa",
  borderRadius: "4px",
  textAlign: "center" as const,
};

const link = { color: "#5469d4", textDecoration: "underline" };

const footer = { padding: "24px", textAlign: "center" as const };
const footerText = {
  color: "#666",
  fontSize: "12px",
  lineHeight: "16px",
  margin: "8px 0",
};

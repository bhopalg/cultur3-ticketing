"use server";

import { Member } from "@/types/Member";
import { ActionResponse } from "@/types/ActionResponse";
import { Resend } from "resend";
import { pretty, render } from "@react-email/render";
import { TicketConfirmationEmail } from "@/components/tickert-confirmation-email";
import { formatPrice } from "@/components/checkout-form/utils/currency-formatter";
import { Product } from "@/types/Product";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendEmail(
  member: Member,
  transactionId: string,
  product?: Product,
): Promise<ActionResponse<{ sent: boolean }>> {
  try {
    const name = `${member.first_name} ${member.last_name}`.trim();

    const html = await pretty(
      await render(
        <TicketConfirmationEmail
          customerName={name}
          totalAmount={
            product?.defaultPrice ? formatPrice(product?.defaultPrice) : null
          }
          transactionId={transactionId}
        />,
      ),
    );

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: member.email,
      subject: `Your ticket for Cultur3`,
      html: html,
    });

    if (error) {
      console.error("Error sending email:", error);
      return {
        success: false,
        message: "Failed to send email",
        error: error.message,
      };
    }

    return {
      success: true,
      data: { sent: true },
      message: "Email sent successfully",
    };
  } catch (e) {
    const errorMessage =
      (e as Error).message || "An error occurred while sending the email.";
    console.error("Error sending email:", errorMessage);
    return {
      success: false,
      message: errorMessage,
      error: errorMessage,
    };
  }
}

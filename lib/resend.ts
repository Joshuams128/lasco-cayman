import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: Add email sending helper functions
// Example:
// export async function sendOrderConfirmation(to: string, orderNumber: string) {
//   await resend.emails.send({
//     from: "LASCO Cayman <noreply@yourdomain.com>",
//     to,
//     subject: `Order Confirmation - ${orderNumber}`,
//     html: `<p>Thank you for your order #${orderNumber}!</p>`,
//   });
// }

import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = parseInt(process.env.SMTP_PORT || "587");
const smtpUser = process.env.SMTP_USER || "anguharikarthick@gmail.com";
const smtpPass = process.env.SMTP_PASS || "mock_app_password";
const smtpFrom = process.env.SMTP_FROM || "EcoRoute Portal <anguharikarthick@gmail.com>";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

/**
 * Send Verification Email
 */
export async function sendVerificationEmail(email: string, token: string) {
  const verifyLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/verify-email?token=${token}`;
  
  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: "Verify Your EcoRoute Account — Government of India",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d6d6d6; padding: 20px; border-radius: 8px;">
          <h2 style="color: #003366; margin-top: 0;">EcoRoute Citizen Verification</h2>
          <p>Thank you for registering with EcoRoute, India's official AI-powered e-waste management portal.</p>
          <p>Click the button below to verify your email address and activate your citizen account:</p>
          <a href="${verifyLink}" style="display: inline-block; background-color: #2E7D32; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email Address</a>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">If you did not create an account, please ignore this email.</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Nodemailer Email Error:", err);
    return false;
  }
}

/**
 * Send Password Reset Email
 */
export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: "Password Reset Request — EcoRoute Portal",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d6d6d6; padding: 20px; border-radius: 8px;">
          <h2 style="color: #003366; margin-top: 0;">Password Reset Instructions</h2>
          <p>We received a request to reset your EcoRoute account password.</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #003366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Reset Password</a>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">This link expires in 30 minutes.</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Nodemailer Reset Email Error:", err);
    return false;
  }
}

/**
 * Send Pickup Confirmation Email
 */
export async function sendPickupConfirmationEmail(email: string, requestId: string, pickupDate: string, timeSlot: string) {
  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject: `Pickup Scheduled: ${requestId} — EcoRoute`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #d6d6d6; padding: 20px; border-radius: 8px;">
          <h2 style="color: #003366; margin-top: 0;">Doorstep Pickup Confirmed</h2>
          <p>Your pickup request <strong>${requestId}</strong> has been scheduled for <strong>${pickupDate}</strong> (${timeSlot}).</p>
          <p>An EcoRoute field agent will arrive at your address during the selected time slot.</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error("Nodemailer Pickup Email Error:", err);
    return false;
  }
}

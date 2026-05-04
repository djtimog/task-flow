import { Resend } from "resend";
import { RESEND_API_KEY } from "./config.js";

const resend = new Resend(RESEND_API_KEY);

const buildEmailTemplate = ({
  title,
  subtitle,
  bodyText,
  buttonText,
  href,
  footerNote,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0; padding:0; background-color:#0f0f13; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 48px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%;">

          <!-- Logo / Brand Header -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    background: linear-gradient(135deg, #6c63ff, #3ecfcf);
                    border-radius: 14px;
                    padding: 10px 20px;
                  ">
                    <span style="
                      font-size: 15px;
                      font-weight: 700;
                      color: #ffffff;
                      letter-spacing: 1.5px;
                      text-transform: uppercase;
                    ">⬡ TaskFlow</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="
              background-color: #16161f;
              border-radius: 20px;
              border: 1px solid #2a2a38;
              overflow: hidden;
            ">
              <!-- Top accent bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="
                    height: 4px;
                    background: linear-gradient(90deg, #6c63ff, #3ecfcf, #6c63ff);
                    background-size: 200% 100%;
                  "></td>
                </tr>
              </table>

              <!-- Card body -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 48px 44px 40px;">

                    <p style="
                      margin: 0 0 8px 0;
                      font-size: 26px;
                      font-weight: 700;
                      color: #f0f0f8;
                      line-height: 1.2;
                      letter-spacing: -0.3px;
                    ">${title}</p>

                    <p style="
                      margin: 0 0 28px 0;
                      font-size: 14px;
                      font-weight: 600;
                      color: #6c63ff;
                      text-transform: uppercase;
                      letter-spacing: 1.2px;
                    ">${subtitle}</p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                      <tr>
                        <td style="height:1px; background-color:#2a2a38;"></td>
                      </tr>
                    </table>

                    <p style="
                      margin: 0 0 36px 0;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #9090a8;
                    ">${bodyText}</p>

                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="
                          background: linear-gradient(135deg, #6c63ff, #5a54e8);
                          border-radius: 10px;
                          box-shadow: 0 4px 24px rgba(108,99,255,0.35);
                        ">
                          <a href="${href}" style="
                            display: inline-block;
                            padding: 14px 32px;
                            font-size: 14px;
                            font-weight: 700;
                            color: #ffffff;
                            text-decoration: none;
                            letter-spacing: 0.5px;
                            border-radius: 10px;
                          ">${buttonText} →</a>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      margin: 32px 0 0 0;
                      font-size: 12px;
                      color: #55556a;
                      line-height: 1.6;
                    ">
                      🔒 ${footerNote}<br/>
                      If you didn't request this, you can safely ignore this email.
                    </p>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top: 28px;">
              <p style="
                margin: 0;
                font-size: 12px;
                color: #3a3a50;
                line-height: 1.6;
              ">
                © ${new Date().getFullYear()} TaskFlow App. All rights reserved.<br/>
                This is an automated message, please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const sendEmail = async ({ receiver, subject, plainText, templateOptions }) => {
  const { error } = await resend.emails.send({
    from: "TaskFlow <no-reply@djtimog.online>",
    to: receiver,
    subject,
    text: plainText,
    html: buildEmailTemplate(templateOptions),
  });

  if (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

export const sendVerificationEmail = async (receiver, href) => {
  await sendEmail({
    receiver,
    subject: "Verify your TaskFlow account",
    plainText:
      "Please verify your email address to activate your TaskFlow account.",
    templateOptions: {
      title: "Confirm your email address",
      subtitle: "Account Verification",
      bodyText:
        "Thanks for signing up for TaskFlow! To get started, we just need to verify your email address. Click the button below.",
      buttonText: "Verify Email Address",
      href,
      footerNote: "This verification link is valid forever",
    },
  });
};

export const sendForgetPasswordEmail = async (receiver, href) => {
  await sendEmail({
    receiver,
    subject: "Reset your TaskFlow password",
    plainText: "You requested a password reset for your TaskFlow account.",
    templateOptions: {
      title: "Reset your password",
      subtitle: "Password Reset Request",
      bodyText:
        "We received a request to reset the password for your TaskFlow account. Click the button below to choose a new password. This link will expire in 24 hours for your security.",
      buttonText: "Reset My Password",
      href,
      footerNote: "This password reset link expires in 24 hours.",
    },
  });
};

export const sendInvitationLink = async (receiver, href, projectName) => {
  await sendEmail({
    receiver,
    subject: `You've been invited to ${projectName} on TaskFlow`,
    plainText: `You have been invited to collaborate on ${projectName} via TaskFlow.`,
    templateOptions: {
      title: `You're invited to collaborate`,
      subtitle: `Project Invitation: ${projectName}`,
      bodyText: `Someone has invited you to join <strong style="color:#f0f0f8;">${projectName}</strong> on TaskFlow. Accept the invitation below to start collaborating with your team.`,
      buttonText: "Accept Invitation",
      href,
      footerNote: "This invitation was sent on behalf of a TaskFlow user.",
    },
  });
};

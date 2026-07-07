import nodemailer from "nodemailer";

class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Common Mail Function
  async sendMail(
    to: string,
    subject: string,
    html: string
  ) {
    return this.transporter.sendMail({
      from: `"FileMoon" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    });
  }

  // Receiver Email
  async sendTransferMail(
    receiverEmail: string,
    senderName: string,
    subject: string,
    message: string,
    downloadLink: string
  ) {
    return this.sendMail(
      receiverEmail,
      subject || `${senderName} sent you files`,
      `
      <div style="max-width:650px;margin:auto;padding:40px;font-family:Arial,sans-serif;background:#f8fafc;border-radius:16px">

        <h1 style="color:#2563eb;margin-bottom:10px;">
          📦 FileMoon
        </h1>

        <h2>You received files!</h2>

        <p>
          <strong>${senderName}</strong> has sent you files.
        </p>

        ${
          message
            ? `
          <div style="background:white;padding:20px;border-radius:10px;border:1px solid #ddd;margin:20px 0;">
            ${message}
          </div>
        `
            : ""
        }

        <a
          href="${downloadLink}"
          style="
            display:inline-block;
            padding:15px 30px;
            background:#2563eb;
            color:white;
            text-decoration:none;
            border-radius:10px;
            font-size:16px;
            font-weight:bold;
          "
        >
          Download Files
        </a>

        <p style="margin-top:30px;font-size:13px;color:#666;">
          If the button doesn't work, copy this link:
        </p>

        <p style="word-break:break-all;">
          ${downloadLink}
        </p>

        <hr style="margin:30px 0"/>

        <p style="font-size:12px;color:#999;">
          © FileMoon
        </p>

      </div>
      `
    );
  }

  // Sender Confirmation Email
  async sendConfirmationMail(
    senderEmail: string,
    senderName: string,
    receiverEmail: string,
    downloadLink: string
  ) {
    return this.sendMail(
      senderEmail,
      "✅ Your File Transfer is Ready",
      `
      <div style="max-width:650px;margin:auto;padding:40px;font-family:Arial,sans-serif;background:#f8fafc;border-radius:16px">

        <h1 style="color:#2563eb;">
          🚀 FileMoon
        </h1>

        <h2>Hello ${senderName},</h2>

        <p>
          Your transfer has been created successfully.
        </p>

        <table style="margin-top:20px;">
          <tr>
            <td><strong>Receiver:</strong></td>
            <td>${receiverEmail}</td>
          </tr>
        </table>

        <br/>

        <a
          href="${downloadLink}"
          style="
            display:inline-block;
            padding:15px 30px;
            background:#16a34a;
            color:white;
            text-decoration:none;
            border-radius:10px;
            font-size:16px;
            font-weight:bold;
          "
        >
          Open Transfer
        </a>

        <p style="margin-top:30px;font-size:13px;color:#666;">
          Share Link:
        </p>

        <p style="word-break:break-all;">
          ${downloadLink}
        </p>

        <hr style="margin:30px 0"/>

        <p style="font-size:12px;color:#999;">
          Thank you for using FileMoon ❤️
        </p>

      </div>
      `
    );
  }
}

export default new MailService();
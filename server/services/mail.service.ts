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
  constructor() {
    this.transporter.verify((error, success) => {
      if (error) {
        console.error("❌ SMTP Error:", error);
      } else {
        console.log("✅ SMTP Connected");
      }
    });
  }

  // baaki code same rahega...


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
      <div style="font-family:Arial;padding:30px">
        <h2>📦 FileMoon</h2>

        <p><b>${senderName}</b> sent you files.</p>

        ${message ? `<p>${message}</p>` : ""}

        <br>

        <a
          href="${downloadLink}"
          style="
            background:#2563eb;
            color:white;
            padding:14px 30px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
          "
        >
          Download Files
        </a>

        <br><br>

        <small>${downloadLink}</small>
      </div>
      `
    );
  }

  async sendConfirmationMail(
    senderEmail: string,
    senderName: string,
    receiverEmail: string,
    downloadLink: string
  ) {
    return this.sendMail(
      senderEmail,
      "Your File Transfer is Ready",
      `
      <div style="font-family:Arial;padding:30px">

        <h2>✅ Transfer Created</h2>

        <p>Hello ${senderName},</p>

        <p>Your files were sent successfully.</p>

        <p>
          <b>Receiver:</b> ${receiverEmail}
        </p>

        <a
          href="${downloadLink}"
          style="
            background:#16a34a;
            color:white;
            padding:14px 30px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
          "
        >
          Open Transfer
        </a>

        <br><br>

        <small>${downloadLink}</small>

      </div>
      `
    );
  }
}

export default new MailService();
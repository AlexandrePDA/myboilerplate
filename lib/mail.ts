import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// à remplacer par le domaine de l'app. sur vercel mettre le nom domaine
const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendEmail(email: string) {
  await resend.emails.send({
    from: "no-reply@cact-us.com",
    to: email,
    subject: "Welcome to our app!",
    html: `<h1>Bienvenue sur notre application</h1><br>
      <p>Merci pour ton inscription!</p><br>`,
  });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  await resend.emails.send({
    from: "no-reply@cact-us.com",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

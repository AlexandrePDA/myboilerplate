import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });
    const response = await prisma.user.findUnique({
      where: { email: email },
    });
    console.log("response register", { response });
    if (response) {
      return NextResponse.json(
        { message: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    await sendEmail(email);
    console.log({ user });
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ message: "succes " });
}

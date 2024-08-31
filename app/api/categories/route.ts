import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/config/options"
import { getToken } from "next-auth/jwt"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
    return;
  }

  if (!session.user) {
    return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
  }

  try {
    if (!session.user.email) {
      return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
    }

    const email: string = session.user.email;
    // email から所属グループ情報を取得、取得できなければエラーとする
    const userProject = await prisma.userProject.findFirst({
      where: {
        User: { email: email },
      }
    });
    if (!userProject) {
      console.log(session)
      console.log(userProject)
      console.log("You must be logged in.")
      return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ messeage: "Error" },{ status: 500 })
  }

  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({categories},{ status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ messeage: "Error" },{ status: 500 })
  } finally {
      await prisma.$disconnect();
  }
};

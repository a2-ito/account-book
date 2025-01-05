import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// DELETE /api/accounts/:id
// レコード削除
export const DELETE = async (req: Request, { params }: { params: { id: string }}) => {
  const session = await getServerSession();


  if (!session) {
    return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
  }

  if (!session.user) {
    return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
  }

  let userProject;
  try {
    if (!session.user.email) {
      return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
    }

    const email: string = session.user.email;
    // email から所属プロジェクト報を取得、取得できなければエラーとする
    userProject = await prisma.userProject.findFirst({
      where: {
        User: { email: email },
      }
    });
    if (!userProject) {
      return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ messeage: "Error" },{ status: 500 })
  }

  // Todo: エラーハンドリング
  const id = Number(params.id)

  let statusCode = 200;

  try {
    const account = await prisma.account.delete({
      where: {
        id: id,
      }
    })
    return NextResponse.json({account}, { status: 200 })
  } catch (err) {
    statusCode = 500;
    console.log(err);
    return NextResponse.json({ messeage: "投稿失敗" }, { status: 500 })
  } finally {
      await prisma.$disconnect();
  }
};

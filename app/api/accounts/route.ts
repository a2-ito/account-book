import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// type Props = {
//   (パラメータの型)
// }

//export function PUT(request: NextRequest, { params }: { params: { id: string } }): NextResponse {
// export const POST = async (req: Request, { params }: { params: Params }) => {
export const POST = async (req: Request) => {
  const session = await getServerSession();
  // console.log(session);
  // const token = await getToken({ req })
  // console.log(token)

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

  const { amount, categoryId, typeId, memo, dateOfUse } = await req.json();

  let statusCode = 200;

  // let accountRecord: Prisma.AccountCreateInput;
  // accountRecord = {
  //   amount: amount,
  //   categoryId: categoryId,
  //   typeId: typeId,
  //   memo: memo,
  //   projectId: userProject.projectId,
  //   deletedAt: null,
  // };
  try {
    const account = await prisma.account.create({
      data: {
          amount: amount,
          categoryId: categoryId,
          typeId: typeId,
          memo: memo,
          deletedAt: null,
          project: {
            connect: { id: userProject.projectId }
          },
          dateOfUse: dateOfUse,
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

export const GET = async (req: Request) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ messeage: "You must be logged in." },{ status: 401 })
    return;
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

  const nowDate = new Date();
  try {
    const accounts = await prisma.account.findMany({
      where: {
        projectId: userProject.projectId,
        dateOfUse: {
          gte: new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
        },
      },
      orderBy: {
        dateOfUse: 'desc',
      }
    });
    return NextResponse.json({accounts},{ status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ messeage: "Error" },{ status: 500 })
  } finally {
      await prisma.$disconnect();
  }
};

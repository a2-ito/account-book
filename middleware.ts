import { NextResponse, NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    // 認可に関する処理。ロールが `admin` ならOK
    authorized: ({ token }) => {
      //console.log(token)
      if (!token?.email) {
        return false;
      }

      // Todo: IDトークンの検証
      return true
    },
  },
  // リダイレクトページ
  // pages: {
  //   signIn: '/login',
  // },
})
  // if (!token) {
  //   return NextResponse.json({ message: "トークンがありません。" },{ status: 401 })
  // }


// export async function middleware(req: NextRequest) {
//   let res = NextResponse.next({
//     request: {
//       headers: req.headers,
//     },
//   });

//   const path = new URL(req.url).pathname;

//   if (
//     (path === "/" ||
//       path === "/example-page1" ||
//       path === "/example-page2" ||
//       path === "/example-page3" ||
//       path === "/example-page4" ||
//       path === "/example-page5")
//   ) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   console.log("middleware.ts: request.url", req.url);

//   return res;
// }

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};

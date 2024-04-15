// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getServerSession } from "next-auth";
// import { getAuthOptions } from "./pages/api/auth/[...nextauth]";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest, response: NextResponse) {
//   // TODO: for details about specific aidrop , we check if they are staking or not

//   //   const session = await getServerSession(
//   //     request,
//   //     response,
//   //     getAuthOptions(req),
//   //   );

//   // TODO: if not , then they will be directed to Staking page
//   // TODO: if wallet is not available then they will be sent to home page to sign in
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/aidrops/:path*"],
// };

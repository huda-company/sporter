import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { respBody, statCode } from "./config/serverResponse";
import { apiMware } from "./middlewares/apiMiddleware";

//this middleware is suggested by nextjs docs.
//then customize it as per requirement

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const reqURL = request.url;
  if (reqURL.includes("api")) {
    const apiMwareCheck = await apiMware(request);
    if (["20"].includes(String(apiMwareCheck?.status)))
      return NextResponse.next();
    else return apiMwareCheck;
  } else {
    return NextResponse.json(
      { ...respBody.ERROR.UNEXPECTED_ERROR },
      statCode[401]
    );
  }
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
};

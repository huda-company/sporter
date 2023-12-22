"use client";
import Image from "next/image";
import Link from "next/link";

import SignInForm from "./SigninForm";

export default function Page() {
  return (
    <>
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="border-double border-4 border-blue-900 p-[2rem]">
            <div className="flex flex-col items-center">
              <Image
                src="/sporter-logo.png"
                height={100}
                width={100}
                alt="logo"
              />
            </div>
            <div className="mt-[2rem]">
              <SignInForm />

              <div className="flex flex-row justify-center items-center text-xs gap-1">
                <p className="flex justify-center">{`don't have an account ?`}</p>
                <Link href="/auth/signup">create now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";

import SignUpForm from "./SignUpForm";

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
              <SignUpForm />

              <div className="flex flex-row justify-center items-center text-xs gap-1">
                <p className="flex justify-center">already have account ?</p>
                <Link href="/auth/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

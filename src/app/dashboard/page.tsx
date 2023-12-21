"use client";
import { Button } from "antd";
import { redirect } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Loading from "@/components/Loading/Loading";

export default function Page() {
  const { status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    redirect("auth/signin");
  }

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
  };
  return (
    <>
      dashboard
      <Button onClick={handleSignOut}>sign out</Button>
    </>
  );
}

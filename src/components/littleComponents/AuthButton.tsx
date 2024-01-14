"use client";
import { signIn } from "next-auth/react";
export const AuthButton = () => {
  const handleSignIn = async () => {
    await signIn("google", { callbackUrl: "http://localhost:3000/" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="border rounded-md px-4 py-2  b"
    >
      Google
    </button>
  );
};

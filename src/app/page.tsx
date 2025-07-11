"use client";

import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <Button onClick={() => router.push("/signin")}>Sign In</Button>
      <Button onClick={() => router.push("/signup")}>Sign Up</Button>
    </div>
  );
}

"use client";

import Button from "@/components/button/Button";
import InputBox from "@/components/input-box/InputBox";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getCredentials = () => {
    // It will get credentials from a local storage as json list
    const credentials = localStorage.getItem("users");
    return credentials ? JSON.parse(credentials) : [];
  };

  const checkCredentials = (username: string, password: string) => {
    const users = getCredentials();
    return users.some(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );
  };

  const handleSignIn = () => {
    if (checkCredentials(username, password)) {
      // Redirect to the home page or dashboard
      router.push("/game");
    } else {
      // Handle invalid credentials
      alert("Invalid username or password");
    }
 };

  return (
    <div>
      <InputBox
        type="username"
        value={username}
        placeholder="Enter your username"
        onChange={(e) => setUsername(e.target.value)}
      >
        Username:
      </InputBox>

      <InputBox
        type="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      >
        Password:
      </InputBox>

      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}

"use client";

import Button from "@/components/button/Button";
import InputBox from "@/components/input-box/InputBox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function SignInPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getCredentials = () => {
    const credentials = localStorage.getItem("users");
    return credentials ? JSON.parse(credentials) : [];
  };

  const checkCredentials = (username: string, password: string) => {
    const users = getCredentials();
    if (username === "" || password === "") {
      alert("Username or password cannot be empty");
      return false;
    }
    return users.some(
      (user: { username: string; password: string }) =>
        user.username === username && user.password === password
    );
  };

  const handleSignIn = () => {
    if (checkCredentials(username, password)) {
      router.push("/game");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>🔑 Sign In</h1>
        <p className={styles.subtitle}>
          Welcome back! Please sign in to your account
        </p>

        <div className={styles.formContainer}>
          <div className={styles.inputWrapper}>
            <InputBox
              type="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            >
              Username
            </InputBox>
          </div>

          <div className={styles.inputWrapper}>
            <InputBox
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            >
              Password
            </InputBox>
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleSignIn} className={styles.signInButton}>
              Sign In
            </Button>
            <Button
              onClick={() => router.push("/")}
              className={styles.backButton}
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

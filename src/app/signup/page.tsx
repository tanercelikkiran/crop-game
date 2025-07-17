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
  const [confirmPassword, setConfirmPassword] = useState("");

  const getCredentials = () => {
    // It will get credentials from a local storage as json list
    const credentials = localStorage.getItem("users");
    return credentials ? JSON.parse(credentials) : [];
  };

  const setCredentials = (newUser: { username: string; password: string }) => {
    const users = getCredentials();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  const checkCredentials = (username: string, password: string) => {
    const users = getCredentials();
    if (username === "" || password === "") {
      alert("Username and password cannot be empty");
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    if (
      users.some((user: { username: string }) => user.username === username)
    ) {
      alert("Username already exists");
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    if (checkCredentials(username, password)) {
      setCredentials({ username, password });
      router.push("/signin");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>📝 Sign Up</h1>
        <p className={styles.subtitle}>
          Create your account to start growing crops!
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

          <div className={styles.inputWrapper}>
            <InputBox
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
              Confirm Password
            </InputBox>
          </div>

          <div className={styles.buttonContainer}>
            <Button onClick={handleSignUp} className={styles.signUpButton}>
              Create Account
            </Button>
            <Button
              onClick={() => router.push("/")}
              className={styles.backButton}
            >
              ← Back to Home
            </Button>
          </div>

          <div className={styles.linkText}>
            Already have an account?{" "}
            <a
              href="/signin"
              className={styles.linkButton}
              onClick={(e) => {
                e.preventDefault();
                router.push("/signin");
              }}
            >
              Sign in here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

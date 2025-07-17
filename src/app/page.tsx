"use client";

import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.welcomeCard}>
        <h1 className={styles.title}>🌱 Crop Game</h1>
        <p className={styles.subtitle}>
          Welcome to the most exciting farming adventure! Plant, grow, and
          harvest your way to success.
        </p>
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => router.push("/signin")}
            className={styles.signInButton}
          >
            🔑 Sign In
          </Button>
          <Button
            onClick={() => router.push("/signup")}
            className={styles.signUpButton}
          >
            📝 Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

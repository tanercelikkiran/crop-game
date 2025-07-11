"use client";

import Field from "@/components/field/Field";
import styles from "./page.module.css";

export default function GamePage() {
  return (
    <div className={styles.gameContainer}>
      {Array.from({ length: 16 }, (_, i) => (
        <Field key={i} />
      ))}
    </div>
  );
}

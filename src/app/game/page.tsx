"use client";

import Field from "@/components/field/Field";
import styles from "./page.module.css";
import { useContext } from "react";
import { BalanceContext } from "@/context/BalanceContext";

export default function GamePage() {
  const balanceContext = useContext(BalanceContext);
  return (
    <div>
      <label htmlFor="fieldCount">Balance: {balanceContext?.balance}</label>
      <div className={styles.gameContainer}>
        {Array.from({ length: 16 }, (_, i) => (
          <Field key={i} />
        ))}
      </div>
    </div>
  );
}

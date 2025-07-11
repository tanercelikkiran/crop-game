"use client";

import Field from "@/components/field/Field";
import styles from "./page.module.css";
import { useContext, useState } from "react";
import { BalanceContext } from "@/context/BalanceContext";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import ChooseBox from "../store/page";

export default function GamePage() {
  const balanceContext = useContext(BalanceContext);
  const router = useRouter();
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <label className={styles.balanceLabel} htmlFor="fieldCount">
        Balance: {balanceContext?.balance}
      </label>
      <div className={styles.gameContainer}>
        {Array.from({ length: 16 }, (_, i) => (
          <Field setIsShown={setIsShown} key={i} />
        ))}
      </div>
      <Button onClick={() => router.push("/")}>Exit</Button>
      <Button onClick={() => router.push("/store")}>Go to Store</Button>
      {isShown && <ChooseBox setIsShown={setIsShown} />}
    </div>
  );
}

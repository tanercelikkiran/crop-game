"use client";

import Field from "@/components/field/Field";
import styles from "./page.module.css";
import { useContext, useState } from "react";
import { BalanceContext } from "@/context/BalanceContext";
import { SeedContext } from "@/context/SeedContext";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Image from "next/image";

export default function GamePage() {
  const balanceContext = useContext(BalanceContext);
  const seedContext = useContext(SeedContext);
  const router = useRouter();

  const [isShown, setIsShown] = useState(false);
  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [fieldStages, setFieldStages] = useState<number[]>(
    Array(16).fill(0)
  );

  return (
    <div>
      {isShown ? (
        <div className={styles.chooseBox}>
          <h2>Choose your crop to seed</h2>
          {seedContext &&
            Object.keys(seedContext.seeds).map((type, index) => (
              <div key={index} className={styles.cropItem}>
                <Image
                  src={`/images/${type}.png`}
                  alt={`${type} image`}
                  width={100}
                  height={100}
                />
                <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <p>
                  Amount:
                  {
                    seedContext.seeds[type as keyof typeof seedContext.seeds]
                      .count
                  }
                </p>
                <Button
                  onClick={() => {
                    seedContext?.plantSeed(type as "tulip" | "daisy");
                    setIsShown(false);
                    if (selectedField !== null) {
                      setFieldStages((prev) => {
                        const next = [...prev];
                        next[selectedField] = 1; // planted → seeded
                        return next;
                      });
                    }
                  }}
                >
                  Plant {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <label className={styles.balanceLabel} htmlFor="fieldCount">
            Balance: {balanceContext?.balance}
          </label>
          <div className={styles.gameContainer}>
            {Array.from({ length: 16 }, (_, i) => (
              <Field
                key={i}
                onClick={() => {
                  const stage = fieldStages[i];
                  if (stage > 0) {
                    if (stage === 2) {
                      // flower → harvest
                      balanceContext?.setBalance((prev) => prev + 1); // replace 1 with your yield
                    }
                    setFieldStages((prev) => {
                      const next = [...prev];
                      next[i] = stage === 1 ? 2 : 0; // seeded→flower, flower→empty
                      return next;
                    });
                  } else {
                    setSelectedField(i);
                    setIsShown(true);
                  }
                }}
                isGrowing={fieldStages[i] > 0}
              />
            ))}
          </div>
          <Button onClick={() => router.push("/")}>Exit</Button>
          <Button onClick={() => router.push("/store")}>Go to Store</Button>
        </div>
      )}
    </div>
  );
}

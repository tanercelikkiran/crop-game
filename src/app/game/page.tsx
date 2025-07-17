"use client";

import Field from "@/components/field/Field";
import styles from "./page.module.css";
import { useContext, useState } from "react";
import { BalanceContext } from "@/context/BalanceContext";
import { SeedContext } from "@/context/SeedContext";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";

export default function GamePage() {
  const balanceContext = useContext(BalanceContext);
  const seedContext = useContext(SeedContext);
  const router = useRouter();

  const [selectedPlant, setSelectedPlant] = useState<"tulip" | "daisy">(
    "tulip"
  );

  const [fieldStates, setFieldStates] = useState<
    Array<{
      isGrowing: boolean;
      plantType: "tulip" | "daisy" | null;
    }>
  >(Array(16).fill({ isGrowing: false, plantType: null }));

  const handlePlantSeed = (fieldIndex: number) => {
    if (
      !fieldStates[fieldIndex].isGrowing &&
      seedContext &&
      seedContext.seeds[selectedPlant].count > 0
    ) {
      seedContext.plantSeed(selectedPlant);

      setFieldStates((prev) => {
        const next = [...prev];
        next[fieldIndex] = {
          isGrowing: true,
          plantType: selectedPlant,
        };
        return next;
      });
    }
  };

  const handleCollectPlant = (
    fieldIndex: number,
    plantType: "tulip" | "daisy"
  ) => {
    if (seedContext) {
      seedContext.collectPlant(plantType);

      // Reset field state
      setFieldStates((prev) => {
        const next = [...prev];
        next[fieldIndex] = {
          isGrowing: false,
          plantType: null,
        };
        return next;
      });
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.gameHeader}>
        <div className={styles.plantSelector}>
          <button
            onClick={() => setSelectedPlant("tulip")}
            className={`${styles.plantButton} ${styles.tulipButton} ${
              selectedPlant === "tulip"
                ? `${styles.plantButtonActive} ${styles.tulipButtonActive}`
                : ""
            }`}
          >
            🌷 Tulip ({seedContext?.seeds.tulip.count ?? 0})
          </button>
          <button
            onClick={() => setSelectedPlant("daisy")}
            className={`${styles.plantButton} ${styles.daisyButton} ${
              selectedPlant === "daisy"
                ? `${styles.plantButtonActive} ${styles.daisyButtonActive}`
                : ""
            }`}
          >
            🌼 Daisy ({seedContext?.seeds.daisy.count ?? 0})
          </button>
        </div>
        <label className={styles.balanceLabel} htmlFor="fieldCount">
          💰 Balance: ${balanceContext?.balance}
        </label>
      </div>
      <div className={styles.gameContainer}>
        {Array.from({ length: 16 }, (_, i) => (
          <Field
            key={i}
            onClick={() => handlePlantSeed(i)}
            isGrowing={fieldStates[i].isGrowing}
            plantType={
              fieldStates[i].plantType as "tulip" | "daisy" | undefined
            }
            onCollect={(plantType) => handleCollectPlant(i, plantType)}
          />
        ))}
      </div>
      <div className={styles.gameFooter}>
        <Button onClick={() => router.push("/")} className={styles.exitButton}>
          🏠 Exit
        </Button>
        <Button
          onClick={() => router.push("/store")}
          className={styles.storeButton}
        >
          🛒 Go to Store
        </Button>
      </div>
    </div>
  );
}

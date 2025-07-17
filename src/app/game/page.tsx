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

  // Plant type selection
  const [selectedPlant, setSelectedPlant] = useState<"tulip" | "daisy">(
    "tulip"
  );

  // Track which fields are growing and their plant types
  const [fieldStates, setFieldStates] = useState<
    Array<{
      isGrowing: boolean;
      plantType: "tulip" | "daisy" | null;
    }>
  >(Array(16).fill({ isGrowing: false, plantType: null }));

  const handlePlantSeed = (fieldIndex: number) => {
    // Only plant if field is empty and user has seeds
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
    <div>
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setSelectedPlant("tulip")}
          style={{
            marginRight: 8,
            background: selectedPlant === "tulip" ? "#aaf" : undefined,
          }}
        >
          Tulip ({seedContext?.seeds.tulip.count ?? 0})
        </button>
        <button
          onClick={() => setSelectedPlant("daisy")}
          style={{
            background: selectedPlant === "daisy" ? "#aaf" : undefined,
          }}
        >
          Daisy ({seedContext?.seeds.daisy.count ?? 0})
        </button>
      </div>
      <label className={styles.balanceLabel} htmlFor="fieldCount">
        Balance: {balanceContext?.balance}
      </label>
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
      <Button onClick={() => router.push("/")}>Exit</Button>
      <Button onClick={() => router.push("/store")}>Go to Store</Button>
    </div>
  );
}

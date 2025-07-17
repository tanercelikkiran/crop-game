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

  // Remove popup logic, add plant type selection
  const [selectedPlant, setSelectedPlant] = useState<"tulip" | "daisy">(
    "tulip"
  );
  const [fieldStages, setFieldStages] = useState<number[]>(Array(16).fill(0));
  const [fieldPlantTypes, setFieldPlantTypes] = useState<(string | null)[]>(
    Array(16).fill(null)
  );

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
            onClick={() => {
              const stage = fieldStages[i];
              if (stage > 0) {
                if (stage === 2) {
                }
                setFieldStages((prev) => {
                  const next = [...prev];
                  next[i] = stage === 1 ? 2 : 0; // seeded→flower, flower→empty
                  return next;
                });
                // Reset plant type when field becomes empty
                if (stage === 4) {
                  // flower stage, next click will make it empty
                  setFieldPlantTypes((prev) => {
                    const next = [...prev];
                    next[i] = null;
                    return next;
                  });
                }
              } else {
                // Only plant if user has seeds of selected type
                if (seedContext && seedContext.seeds[selectedPlant].count > 0) {
                  seedContext.plantSeed(selectedPlant);
                  setFieldStages((prev) => {
                    const next = [...prev];
                    next[i] = 1; // planted → seeded
                    return next;
                  });
                  // Set the plant type for this field
                  setFieldPlantTypes((prev) => {
                    const next = [...prev];
                    next[i] = selectedPlant;
                    return next;
                  });
                }
              }
            }}
            isGrowing={fieldStages[i] > 0}
            plantType={fieldPlantTypes[i] as "tulip" | "daisy" | undefined}
          />
        ))}
      </div>
      <Button onClick={() => router.push("/")}>Exit</Button>
      <Button onClick={() => router.push("/store")}>Go to Store</Button>
    </div>
  );
}

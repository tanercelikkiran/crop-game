"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { BalanceContext } from "./BalanceContext";

interface Seed {
  count: number;
  price: number;
}

interface SeedState {
  tulip: Seed;
  daisy: Seed;
}

interface SeedContextType {
  seeds: SeedState;
  buySeed: (seedType: "tulip" | "daisy", cost: number) => boolean;
  bulkBuySeed: (
    seedType: "tulip" | "daisy",
    quantity: number,
    totalCost: number
  ) => boolean;
  plantSeed: (seedType: "tulip" | "daisy") => void;
  collectPlant: (plantType: "tulip" | "daisy") => void;
}

export const SeedContext = createContext<SeedContextType | undefined>(
  undefined
);

export function SeedProvider({ children }: { children: ReactNode }) {
  const balanceContext = useContext(BalanceContext);

  const [seeds, setSeeds] = useState<SeedState>({
    tulip: { count: 1, price: 10 },
    daisy: { count: 1, price: 20 },
  });

  const buySeed = (seedType: "tulip" | "daisy", cost: number): boolean => {
    if (!balanceContext || balanceContext.balance < cost) {
      alert("Insufficient funds to purchase this seed.");
      return false;
    }

    balanceContext.decreaseBalance(cost);
    setSeeds((prev) => ({
      ...prev,
      [seedType]: {
        ...prev[seedType],
        count: prev[seedType].count + 1,
      },
    }));
    return true;
  };

  const bulkBuySeed = (
    seedType: "tulip" | "daisy",
    quantity: number,
    totalCost: number
  ): boolean => {
    if (!balanceContext || balanceContext.balance < totalCost) {
      alert(
        `Insufficient funds to purchase ${quantity} ${seedType}s. Total cost: ${totalCost} coins.`
      );
      return false;
    }

    balanceContext.decreaseBalance(totalCost);
    setSeeds((prev) => ({
      ...prev,
      [seedType]: {
        ...prev[seedType],
        count: prev[seedType].count + quantity,
      },
    }));
    return true;
  };

  const plantSeed = (seedType: "tulip" | "daisy"): void => {
    if (seeds[seedType].count <= 0) {
      alert(`No ${seedType}s available to plant.`);
      return;
    }

    setSeeds((prev) => ({
      ...prev,
      [seedType]: {
        ...prev[seedType],
        count: prev[seedType].count - 1,
      },
    }));
  };

  const collectPlant = (plantType: "tulip" | "daisy"): void => {
    if (!balanceContext) return;

    // Reward different amounts based on plant type
    const reward = plantType === "daisy" ? 30 : 20; // Daisy gives more reward since it costs more
    balanceContext.increaseBalance(reward);
  };

  return (
    <SeedContext.Provider
      value={{
        seeds,
        buySeed,
        bulkBuySeed,
        plantSeed,
        collectPlant,
      }}
    >
      {children}
    </SeedContext.Provider>
  );
}

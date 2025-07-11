"use client";

import { createContext, useState } from "react";
import { useContext } from "react";
import { BalanceContext } from "./BalanceContext";

interface SeedContextType {
  types: {
    Tulip: number;
    Daisy: number;
  };
  tulipCount: number;
  daisyCount: number;
  buySeed: (itemType: string, cost: number) => boolean;
  plantSeed: (itemType: string) => void;
}

export const SeedContext = createContext<SeedContextType | undefined>(
  undefined
);

export function SeedProvider({ children }: { children: React.ReactNode }) {
  const balanceContext = useContext(BalanceContext);
  const [types, setTypes] = useState({
    Tulip: 10,
    Daisy: 20,
  });
  const [tulipCount, setTulipCount] = useState(0);
  const [daisyCount, setDaisyCount] = useState(0);

  const buySeed = (itemType: string, cost: number) => {
    console.log(balanceContext?.balance, cost);
    if (!balanceContext || balanceContext.balance < cost) {
      alert("Insufficient balance to buy this item.");
      return false;
    }
    balanceContext.decreaseBalance(cost);
    if (itemType === "tulip") {
      setTulipCount((prevCount) => prevCount + 1);
    } else if (itemType === "daisy") {
      setDaisyCount((prevCount) => prevCount + 1);
    }
    return true;
  };

  const plantSeed = (itemType: string) => {
    if (itemType === "tulip") {
      if (tulipCount <= 0) {
        alert("No tulips available to plant.");
        return;
      }
      setTulipCount((prevCount) => prevCount - 1);
    } else if (itemType === "daisy") {
      if (daisyCount <= 0) {
        alert("No daisies available to plant.");
        return;
      }
      setDaisyCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <SeedContext.Provider
      value={{
        types,
        tulipCount,
        daisyCount,
        buySeed,
        plantSeed,
      }}
    >
      {children}
    </SeedContext.Provider>
  );
}

"use client";

import { createContext, useState } from "react";

interface BalanceContextType {
  balance: number;
  increaseBalance: (amount: number) => void;
  decreaseBalance: (amount: number) => boolean;
}

export const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export function BalanceProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(100);

  const increaseBalance = (amount: number) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  const decreaseBalance = (amount: number) => {
    if (balance >= amount) {
      setBalance((prevBalance) => prevBalance - amount);
      return true;
    }
    return false;
  };

  return (
    <BalanceContext.Provider
      value={{ balance, increaseBalance, decreaseBalance }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

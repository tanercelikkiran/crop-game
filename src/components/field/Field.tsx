"use client";
import { memo, useContext, useEffect, useState } from "react";
import { BalanceContext } from "@/context/BalanceContext";
import styles from "./Field.module.css";

function Field() {
  const balanceContext = useContext(BalanceContext);

  const [index, setIndex] = useState(0);
  const [isGrowing, setIsGrowing] = useState(false);

  const states = ["", "Seed", "Sapling", "Plant", "Flower", "Dried Flower"];

  // Effect to handle growth from Seed to Flower
  useEffect(() => {
    if (isGrowing && index >= 1 && index < 4) {
      const intervalId = setInterval(() => {
        setIndex((prevState) => {
          if (prevState < 4) {
            return prevState + 1;
          } else {
            return prevState;
          }
        });
      }, 2000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isGrowing]);

  // Effect to handle transition from Flower to Dried Flower
  useEffect(() => {
    if (index === 4) {
      const timeoutId = setTimeout(() => {
        setIndex(5);
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isGrowing]);

  const handleClick = () => {
    if (index === 0 && balanceContext?.balance >= 10) {
      // Plant a seed if the field is empty and balance is sufficient
      setIndex(1);
      setIsGrowing(true);
      balanceContext?.decreaseBalance(10);
    } else if (index === 4) {
      // Harvest the flower
      setIndex(0);
      setIsGrowing(false);
      balanceContext?.increaseBalance(20);
    } else if (index === 5) {
      // Reset dried flower to empty
      setIndex(0);
      setIsGrowing(false);
    }
  };

  return (
    <div>
      <button className={styles.field} onClick={handleClick}>
        {states[index]}
      </button>
    </div>
  );
}

export default memo(Field);
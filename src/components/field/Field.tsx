"use client";
import { useEffect, useState } from "react";
import styles from "./Field.module.css";

export default function Field() {
  const [index, setIndex] = useState(0);
  const [isFlower, setIsFlower] = useState(false);
  const states = [
    "Ready",
    "Seed",
    "Sapling",
    "Plant",
    "Flower",
    "Dried Flower",
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (index !== 0 && index !== 5) {
      const currentInterval = index === 4 ? 4000 : 2000;
      intervalId = setInterval(() => {
        setIndex((prevState) => prevState + 1);
      }, currentInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [index]);

  const handleClick = () => {
    if (index === 0) {
      setIndex(1);
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

"use client";
import { memo, useEffect, useState } from "react";
import styles from "./Field.module.css";

function Field({
  onClick,
  isGrowing: startGrowing,
}: {
  onClick: () => void;
  isGrowing: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [isGrowing, setIsGrowing] = useState(false);
  const states = ["", "Seed", "Sapling", "Plant", "Flower", "Dried Flower"];

  // when parent flags this field to start, initialize it
  useEffect(() => {
    if (startGrowing && !isGrowing) {
      setIndex(1);
      setIsGrowing(true);
    }
  }, [startGrowing]);

  // Seed→Plant growth
  useEffect(() => {
    if (isGrowing && index >= 1 && index < 4) {
      const intervalId = setInterval(() => {
        setIndex((prev) => (prev < 4 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [isGrowing]);

  // Flower→Dried Flower
  useEffect(() => {
    if (index === 4) {
      const timeoutId = setTimeout(() => setIndex(5), 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [index]);

  return (
    <div>
      <button className={styles.field} onClick={onClick}>
        {states[index]}
      </button>
    </div>
  );
}

export default memo(Field);

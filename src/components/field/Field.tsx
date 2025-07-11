"use client";
import { useEffect, useState } from "react";
import styles from "./Field.module.css";

export default function Field() {
  const [state, setState] = useState("Ready");
  const [isFlower, setIsFlower] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (state !== "Ready" && state !== "Dried Flower") {
      const currentInterval = state === "Flower" ? 4000 : 2000;
      intervalId = setInterval(() => {
        setState((prevState) => {
          switch (prevState) {
            case "Seed":
              return "Sapling";
            case "Sapling":
              return "Plant";
            case "Plant":
              setIsFlower(true);
              return "Flower";
            case "Flower":
              return "Dried Flower";
          }
          return prevState;
        });
      }, currentInterval);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state]);

  const handleClick = () => {
    if (state === "Ready") {
      setState("Seed");
    }
  };

  return (
    <div>
      <button className={styles.field} onClick={handleClick}>
        {state}
      </button>
    </div>
  );
}

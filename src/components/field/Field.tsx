"use client";
import { useState } from "react";
import styles from "./Field.module.css";

interface FieldProps {
  state?: string;
}

export default function Field() {
  const [state, setState] = useState("Ready");
  function handleClick() {
    switch (state) {
      case "Ready":
        setState("Seed");
        break;
      case "Seed":
        setState("Sapling");
        break;
      case "Sapling":
        setState("Plant");
        break;
      case "Plant":
        setState("Flower");
        break;
      case "Flower":
        setState("Dried Flower");
        break;
    }
  }

  return (
    <div>
      <button className={styles.field} onClick={handleClick}>
        {state}
      </button>
    </div>
  );
}

"use client";

import { useContext, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { SeedContext } from "@/context/SeedContext";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function StorePage() {
  const seedContext = useContext(SeedContext);
  const router = useRouter();

  // State to track bulk purchase quantities for each seed type
  const [bulkQuantities, setBulkQuantities] = useState<{
    [key: string]: number;
  }>({
    tulip: 1,
    daisy: 1,
  });

  const handleQuantityChange = (seedType: string, delta: number) => {
    setBulkQuantities((prev) => ({
      ...prev,
      [seedType]: Math.max(1, prev[seedType] + delta),
    }));
  };

  const handleBulkPurchase = (seedType: "tulip" | "daisy") => {
    if (!seedContext) return;

    const quantity = bulkQuantities[seedType];
    const unitPrice = seedContext.seeds[seedType].price;
    const totalCost = unitPrice * quantity;

    const success = seedContext.bulkBuySeed(seedType, quantity, totalCost);
    if (success) {
      // Reset quantity to 1 after successful purchase
      setBulkQuantities((prev) => ({
        ...prev,
        [seedType]: 1,
      }));
    }
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.chooseBox}>
        <h2>🛒 Choose your crop to buy</h2>
        <div className={styles.cropGrid}>
          {seedContext &&
            Object.keys(seedContext.seeds).map((type, index) => (
              <div key={index} className={styles.cropItem}>
                <div className={styles.cropImage}>
                  <Image
                    src={`/${type === "tulip" ? "Tulip" : "Daisy"}.png`}
                    alt={`${type} image`}
                    width={80}
                    height={80}
                  />
                </div>
                <h3>
                  {type === "tulip" ? "🌷" : "🌼"}{" "}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </h3>
                <p>
                  💰 Price:{" "}
                  {
                    seedContext.seeds[type as keyof typeof seedContext.seeds]
                      .price
                  }{" "}
                  coins
                </p>

                <div className={styles.bulkPurchase}>
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(type, -1)}
                    >
                      -
                    </button>
                    <span className={styles.quantityDisplay}>
                      {bulkQuantities[type]}
                    </span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleQuantityChange(type, 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.totalCost}>
                    Total:{" "}
                    {bulkQuantities[type] *
                      seedContext.seeds[type as keyof typeof seedContext.seeds]
                        .price}{" "}
                    coins
                  </p>
                  <Button
                    onClick={() =>
                      handleBulkPurchase(type as "tulip" | "daisy")
                    }
                    className={styles.bulkBuyButton}
                  >
                    Buy {bulkQuantities[type]}{" "}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                    {bulkQuantities[type] > 1 ? "s" : ""}
                  </Button>
                </div>
                <label>
                  📦 Amount:{" "}
                  {
                    seedContext.seeds[type as keyof typeof seedContext.seeds]
                      .count
                  }
                </label>
              </div>
            ))}
        </div>
        <Button
          onClick={() => {
            router.push("/game");
          }}
          className={styles.gameButton}
        >
          🎮 Go to Game
        </Button>
      </div>
    </div>
  );
}

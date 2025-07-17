"use client";

import { useContext } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { SeedContext } from "@/context/SeedContext";
import Button from "@/components/button/Button";
import { useRouter } from "next/navigation";

export default function StorePage() {
  const seedContext = useContext(SeedContext);
  const router = useRouter();

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
                <Button
                  onClick={() => {
                    seedContext.buySeed(
                      type as "tulip" | "daisy",
                      seedContext.seeds[type as keyof typeof seedContext.seeds]
                        .price
                    );
                  }}
                >
                  Buy {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
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

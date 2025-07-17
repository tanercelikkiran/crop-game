"use client";
import { memo, useEffect, useState } from "react";
import styles from "./Field.module.css";
import Image from "next/image";

function Field({
  onClick,
  isGrowing: startGrowing,
  plantType,
  onCollect,
}: {
  onClick: () => void;
  isGrowing: boolean;
  plantType?: "tulip" | "daisy";
  onCollect?: (plantType: "tulip" | "daisy") => void;
}) {
  const [index, setIndex] = useState(0);
  const [isGrowing, setIsGrowing] = useState(false);

  const getImageSrc = (stageIndex: number): string | null => {
    switch (stageIndex) {
      case 0:
        return null;
      case 1:
        return "/Seeding.png";
      case 2:
        return "/LittlePlant.png";
      case 3:
        return "/MiddlePlant.png";
      case 4:
        return plantType === "daisy" ? "/Daisy.png" : "/Tulip.png";
      case 5:
        return plantType === "daisy" ? "/DriedDaisy.png" : "/DriedTulip.png";
      default:
        return null;
    }
  };

  useEffect(() => {
    if (startGrowing && !isGrowing) {
      setIndex(1);
      setIsGrowing(true);
    }
  }, [startGrowing]);

  useEffect(() => {
    if (isGrowing && index >= 1 && index < 4) {
      const intervalId = setInterval(() => {
        setIndex((prev) => (prev < 4 ? prev + 1 : prev));
      }, 2000);
      return () => clearInterval(intervalId);
    }
  }, [isGrowing]);

  useEffect(() => {
    if (index === 4) {
      const timeoutId = setTimeout(() => setIndex(5), 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [index]);

  return (
    <div>
      <button
        className={`${styles.field} ${isGrowing ? styles.growing : ""}`}
        onClick={() => {
          if (isGrowing && index > 0) {
            if (index === 4 && plantType && onCollect) {
              onCollect(plantType);
            }
            setIndex(0);
            setIsGrowing(false);
          } else {
            onClick();
          }
        }}
      >
        {getImageSrc(index) ? (
          <Image
            src={getImageSrc(index)!}
            alt={`Plant stage ${index}`}
            width={70}
            height={70}
            className={styles.fieldImage}
          />
        ) : null}
      </button>
    </div>
  );
}

export default memo(Field);

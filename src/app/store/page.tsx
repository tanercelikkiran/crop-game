"use client";

import { useContext } from 'react';
import styles from './page.module.css';
import Image from 'next/image';
import { SeedContext } from '@/context/SeedContext';
import Button from '@/components/button/Button';

export default function ChooseBox() {
  const seedContext = useContext(SeedContext);

  return (
    <div
      className={styles.chooseBox}  
    >
      <h2>Choose your crop to buy</h2>
      {seedContext && Object.keys(seedContext.types).map((type, index) => (
        <div key={index} className={styles.cropItem}>
          <Image
            src={`/images/${type}.png`}
            alt={`${type} image`}
            width={100}
            height={100}
          />
          <h3>{type}</h3>
          <p>Price: {seedContext.types[type]} coins</p>
          <Button
            onClick={() => seedContext.buySeed(type, seedContext.types[type])}
          >
            Buy {type}
          </Button>
        </div>
      ))}

    </div>
  );
}

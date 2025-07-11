"use client";
import styles from "./Field.module.css";

interface FieldProps {
    state?: string;
    onClick?: () => void;
}

export default function Field({ state, onClick }: FieldProps) {
  return (
    <div className={styles.field} onClick={onClick}>
      <label htmlFor="">{state}</label>
    </div>
  );
}
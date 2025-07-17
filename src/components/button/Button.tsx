import React from "react";

import styles from "./Button.module.css"; // Assuming you have a CSS module for styles

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick handler
  className?: string; // Optional className for additional styling
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <div>
      <button
        className={`${styles.button} ${className || ""}`}
        id="button"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

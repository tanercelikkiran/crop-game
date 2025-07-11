import React from "react";

import styles from "./Button.module.css"; // Assuming you have a CSS module for styles

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick handler
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <div>
      <button className={styles.button} id="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

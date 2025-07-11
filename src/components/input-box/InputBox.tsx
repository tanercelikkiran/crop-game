import { useRouter } from "next/router";
import styles from "./InputBox.module.css";

interface InputBoxProps {
  children?: React.ReactNode;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputBox({
  children,
  type,
  value,
  placeholder,
  onChange,
}: InputBoxProps) {
  return (
    <div className="mb-4">
      <label className={styles.label}>
        {children}
      </label>
      <input
        className={styles.input}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

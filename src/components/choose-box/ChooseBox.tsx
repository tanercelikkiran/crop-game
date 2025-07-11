import styles from "./ChooseBox.module.css";

export default function ChooseBox() {
  return (
    <div className={styles["choose-box"]}>
      <h2>Choose your crop</h2>
      <select>
        <option value="Tulip">Tulip</option>
        <option value="Daisy">Daisy</option>
      </select>
    </div>
  );
}

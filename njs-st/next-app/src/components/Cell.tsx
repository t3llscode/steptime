import styles from './cell.module.css'

export default function Cell({tag, value, width}) {

  

  return (
    <div style={{ width: width+'rem' }}>
        <div className={styles.tag}>{tag}</div>
        <div className={styles.value}>{value}</div>
    </div>
  );
}
import styles from './info.module.css'

import { useState, useEffect } from 'react';

export default function Info({ message }) {
  return (
    <div className={styles.box}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
}
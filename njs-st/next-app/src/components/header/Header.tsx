import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './Header.module.css'

export default function Header() {

    let [menuOpen, setMenuOpen] = useState(false); // menu bar or narrow screens

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo_box}>
                    <img src="https://maintime.io/data/media/maintime.ico"/>
                    <h1>StepTime</h1>
                </div>
                <div className={styles.button_box}>
                    <a href="/auth?team=Join?acc=Creation">Get Started</a>
                    <a className={styles.team} href="/auth">Login</a>
                </div>
                <img className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} src="https://maintime.io/data/media/maintime.ico"/>
            </div>

            {/* Handling very narrow Displays */}
            {menuOpen && 
                <div className={styles.header_segment_burger}>
                    <a href="/auth?team=Join?acc=Creation">Get Started</a>
                    <a href="/auth">Login</a>
                </div>
            }

        </div>
    );
}
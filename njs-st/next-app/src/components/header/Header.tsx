import { useEffect, useState } from 'react';

import styles from './Header.module.css'

export default function Header() {

    let [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log(menuOpen);
    }, [menuOpen]);

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.logo_box}>
                    <img src="https://maintime.io/data/media/maintime.ico"/>
                    <h1>StepTime</h1>
                </div>
                <div className={styles.button_box}>
                    <a className={styles.team}>Create Team</a>
                    <a className={styles.team}>Join Team</a>
                    <a>Login</a>
                </div>
                <img className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)} src="https://maintime.io/data/media/maintime.ico"/>
            </div>
            {menuOpen && 
                <div className={styles.header_segment_burger}>
                    <button>Create Team</button>
                    <button>Join Team</button>
                    <button>Login</button>
                </div>
            }
        </div>
    );
}
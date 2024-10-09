import { useEffect, useState } from 'react';

import styles from './Header.module.css'

import Auth from '../popups/Auth';

export default function Header() {

    let [menuOpen, setMenuOpen] = useState(false); // menu bar or narrow screens

    let [authVisible, setAuthVisible] = useState(''); // empty string or type of popup
    let [loginMessage, setLoginMessage] = useState(''); // empty string or answer message

    function handler() {

    }

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
                    <a className={styles.team} onClick={() => setAuthVisible("create")}>Create Team</a>
                    <a className={styles.team} onClick={() => setAuthVisible("join")}>Join Team</a>
                    <a onClick={() => setAuthVisible("login")}>Login</a>
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

            <div>
                {authVisible !== '' && <Auth authVisible={authVisible} rAuthVisible={setAuthVisible} rLoginMessage={setLoginMessage} />}
            </div>

        </div>
    );
}
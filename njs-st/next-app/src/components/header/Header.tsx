import { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import styles from './Header.module.css'

import Auth from '../popups/Auth';
import LoginForm from '../popups/forms/FormLogin';
import RegisterForm from '../popups/forms/FormJoinTeam';
import JoinTeam from '../popups/forms/FormJoinTeam';

export default function Header() {

    let [menuOpen, setMenuOpen] = useState(false); // menu bar or narrow screens

    let [authVisible, setAuthVisible] = useState(''); // empty string or type of popup
    let [loginMessage, setLoginMessage] = useState(''); // empty string or answer message

    function handler() {

    }

    const [form, setForm] = useState(authVisible);
    const [switchOk, setSwitchOk] = useState(true);

    // switch between login and register form
    const toggleForm = () => {
        setSwitchOk(false);
        setForm(form === 'login' ? 'register' : 'login');
        setLoginMessage({message: '', type: ''})
    };

    // mark switch as ok after animation
    const toggleSwitchOk = () => {
        setSwitchOk(true);
        if (form === '') { // close auth if form is empty
        setAuthVisible('');
        console.log("IT CLOSED")
        }
    }

    const closeAuth = () => {
        setForm('');
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
                    <a className={styles.team} onClick={() => setForm("register")}>Create Team</a>
                    <a className={styles.team} onClick={() => setForm("join")}>Join Team</a>
                    <a onClick={() => setForm("login")}>Login</a>
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

            <AnimatePresence> 
                {switchOk && form === 'register' && (
                <motion.div
                    className={styles.combined}
                    key="register"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.33 } }}
                    exit={{ opacity: 0, transition: { duration: 0.33 } }}
                    onAnimationComplete={toggleSwitchOk}
                >
                    <h1 className={styles.h1}>
                    Register
                    </h1>
                    <RegisterForm
                    rLoginMessage={setLoginMessage}
                    closeAuth={closeAuth}
                    switchObject={{tag: ["or ", "sign in", " with an existing account"], toggle: toggleForm}}
                    />
                </motion.div>
                )}
            </AnimatePresence>

            {/* The error here potentially is caused by a bug happing in this version, see https://stackoverflow.com/questions/71817106/type-children-element-has-no-properties-in-common-with-type-intrinsicat */}

            <AnimatePresence>
                {switchOk && form === 'login' && (
                <motion.div
                    className={styles.combined}
                    key="login"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.33 } }}
                    exit={{ opacity: 0, transition: { duration: 0.33 } }}
                    onAnimationComplete={toggleSwitchOk}
                >
                    <h1 className={styles.h1}>
                    Login
                    </h1>
                    <LoginForm
                    rLoginMessage={setLoginMessage}
                    closeAuth={closeAuth}
                    switchObject={{tag: ["or ", "sign up", " for a new account"], toggle: toggleForm}}
                    />
                </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
import styles from './auth.module.css'

import React, { useState, useEffect, createContext } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from './forms/FormLogin';
import RegisterForm from './forms/FormJoinTeam';

export default function Auth({ rLoginMessage }) {
  
  const [form, setForm] = useState('login');
  const [switchOk, setSwitchOk] = useState(true);

  // switch between login and register form
  const toggleForm = () => {
    setSwitchOk(false);
    setForm(form === 'login' ? 'register' : 'login');
    rLoginMessage({message: '', type: ''})
  };

  // mark switch as ok after animation
  const toggleSwitchOk = () => {
    setSwitchOk(true);
  }

  return (
    <div>
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
              rLoginMessage={rLoginMessage}
              switchObject={{tag: ["or ", "sign in", " with an existing account"], toggle: toggleForm}}
            />
          </motion.div>
        )}
      </AnimatePresence>

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
              rLoginMessage={rLoginMessage}
              switchObject={{tag: ["or ", "sign up", " for a new account"], toggle: toggleForm}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
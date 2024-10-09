import styles from './auth.module.css'

import React, { useState, useEffect, createContext } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import LoginForm from './forms/FormLogin';
import RegisterForm from './forms/FormJoinTeam';

export default function Auth({ authVisible, rAuthVisible, rLoginMessage }) {
  
  const [form, setForm] = useState(authVisible);
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
    if (form === '') { // close auth if form is empty
      rAuthVisible('');
      console.log("IT CLOSED")
    }
  }

  const closeAuth = () => {
    setForm('');
  }

  useEffect(() => {
    console.log('Auth rendered');
    console.log("form: ", form);
    console.log("toggleSwitchOk", switchOk);
  }, [form]);

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
              rLoginMessage={rLoginMessage}
              closeAuth={closeAuth}
              switchObject={{tag: ["or ", "sign up", " for a new account"], toggle: toggleForm}}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
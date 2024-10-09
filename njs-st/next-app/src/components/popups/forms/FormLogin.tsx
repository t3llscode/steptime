import styles from './formAuth.module.css'

// This is not valid TypeScript/React code. Please run this command in your terminal:
// npm install --save-dev @types/webpack-env

import { useState, useEffect, useContext, useRef } from 'react';

export default function FormLogin({rLoginMessage, closeAuth, switchObject}) {

  // const tb_identifier = document.getElementById('tb_identifier') as HTMLInputElement;
  // const tb_password = document.getElementById('tb_password') as HTMLInputElement;

  const ref_identifier = useRef(null)
  const ref_password = useRef(null)

  const identifierText = 'Username';
  const passwordText = 'PIN';
  
  const buttonText = 'Sign In';

  const handleSubmit = (e) => {
      e.preventDefault();
      fullLogin()
  }

  // Initial Setup
  useEffect(() => {
    ref_identifier.current.focus();
    const script1 = document.createElement('script') as HTMLScriptElement;
    script1.src = '/data/node_modules/js-sha256/build/sha256.min.js';
    script1.async = true;
    document.head.appendChild(script1);
    tokenLogin()
  }, []);

  // Try to login with token
  async function tokenLogin() {
    let rsp = await universalAPI('/api/auth/checkLoginToken', {})
    rLoginMessage({message: rsp.usermessage});
  }

  // UTILITY FUNCTIONS //

  // Universal API function for POST requests (TODO: provide as utility function in separate file)
  async function universalAPI(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
  }

  // Hashing password with salt using js-sha256 (TODO: provide as utility function in separate file)
  function hashPassword(password: string, salt: string): string {
    //@ts-ignore
    var hash = sha256.create();
    hash.update(salt + password);
    return hash.hex();
  }

  // COMPONENT FUNCTIONS //

  async function fullLogin() {

    let salt = null

    // Step 1: Obtain salt for identifier from the server
    const rsp = await universalAPI('/api/auth/getSalt', {
      "identifier": ref_identifier.current.value
    })

    if (rsp.usermessage == "Salt successfully obtained!") {
      salt = rsp.salt
      rLoginMessage({message: rsp.usermessage});
    } else {
      rLoginMessage({message: rsp.usermessage});
    }

    // Step 2: Hash password with salt and send to server
    setTimeout(async function() {
      var hashedAndSalted = hashPassword(ref_password.current.value, salt)
      console.log(ref_password.current.value + salt)
      console.log(hashedAndSalted)
      const rsp = await universalAPI('/api/auth/getLoginToken', {
        "identifier": ref_identifier.current.value,
        "hash": hashedAndSalted
      })

      if (rsp.message == "Token successfully obtained!") {
        document.cookie = `token=${rsp.token}; expires=${rsp.expires}; path=/;}`;
        rLoginMessage(rsp.message);
        setTimeout( function() {
          rLoginMessage({message: "Logged in! Redirecting..."})
        }, 0)
      } else {
        rLoginMessage({message: rsp.usermessage});
      }
    }, 0, salt);
  }


// RETURN

  return (
    <div className={styles.auth_container} onClick={closeAuth}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className={styles.formcontainer}>
          <div className={styles.tagline}>
            <p className={styles.tag}>{identifierText}</p>
            {/* <p className={styles.switch}>{switchObject.tag[0]}<a className={styles.a_tag} onClick={switchObject.toggle}>{switchObject.tag[1]}</a>{switchObject.tag[2]}</p> */}
          </div>
          <input id="tb_identifier" className={styles.input} type="text" ref={ref_identifier} name="identifier" required/>
          <p className={styles.tag}>{passwordText}</p>
          <input id="tb_password" className={`${styles.input} ${styles.password}`} type="password" ref={ref_password} name="password" required/>
          <button id="btn_login" className={styles.button} type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}
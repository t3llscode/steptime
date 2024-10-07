import styles from './formCookie.module.css'

import { useState, useEffect } from 'react';

export default function FormCookie({ cookieMessage, rCookieMessage }) {

  // local cookieMessage utility
  const [localCookieMessage, setLocalCookieMessage] = useState("")
  useEffect(() => {
    rCookieMessage(localCookieMessage)
  }, [localCookieMessage]);
  useEffect(() => {
    setLocalCookieMessage("")
  }, [cookieMessage]);

  return (
    <div className={styles.out_formcontainer}>
      <h1 className={styles.h1}>
        Cookies & Data
      </h1>
      <div className={styles.in_formcontainer}>
        <p className={styles.tag}>
          This is a private application!
        </p>
        <p className={styles.text}>
          Please only use it if you know what this is for.
        </p>
        <p className={styles.tag}>
          When do I use cookies?
        </p>
        <p className={styles.text}>
          Only if you log in or register. The app uses cookies to store your login token. This token is used to identify you as a user and your device to keep you logged in. The token is stored in your browser's local storage. If you log out the token will be invalidated. If you delete the token, you will be logged out.
        </p>
        <p className={styles.tag}>
          When do I store your information?
        </p>
        <p className={styles.text}>
          The app stores your username, email and password in a database. The password is salted and hashed locally (on your PC) and never leaves your device in plain.<br></br>
          Also your account creation date and your last login date for each device are stored in the database.<br></br>
          If you use the Rextractor your files will be temporarily stored on the server. The files will be deleted after the extraction process is finished.
        </p>
        <p className={styles.tag}>
          Why should you accept cookies?
        </p>
        <p className={styles.text}>
          If you choose not to accept cookies, you will not be able to login or register. You will not be able to use the Rextractor. A cookieless version of the app is not available right now.
        </p>
        <p className={styles.tag}>
          Who is responsible?
        </p>
        <p className={styles.text}>
          The app is developed and maintained by me, Tell Hensel. You can contact me <a className={styles.a} href="mailto:data@t3l.ls">via eMail</a>.
        </p>
        <p className={styles.tag}>
          Other ressources
        </p>
        <p className={styles.text}>
          <a className={styles.a} target="_blank" href="https://t3l.ls/legal">Legal Notice</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a className={styles.a} target="_blank" href="https://t3l.ls/privacy">Terms of Use Notice / Privacy Policy</a>&nbsp;&nbsp;&nbsp;&nbsp;
          <a className={styles.a} target="_blank" href="https://t3l.ls">Tell's Portfolio</a>
        </p>
        <div className={styles.px5}></div>
        <div className={styles.button_box}>
          <button id="btn_dec" className={styles.button} onClick={() => setLocalCookieMessage("declined")}>Decline</button>
          <button id="btn_acc" className={styles.button} onClick={() => setLocalCookieMessage("accepted")}>Accept</button>
        </div>
      </div>
    </div>
  );
}
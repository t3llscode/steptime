import styles from './logout.module.css'

import { useState, useEffect } from 'react';

export default function Logout({ login, rLogin }) {

  const [localLogin, setLocalLogin] = useState(login);

  // logout if user clicks on logout button
  useEffect(() => {
    if (localLogin === false && secureLogout()) {
      rLogin(localLogin);
    }
  }, [localLogin]);

  // return to login page if user is not logged in
  useEffect(() => {
    if (localLogin != login) {
      rLogin(login);
    }
  }, [login]);

  // - - - - - API Util - - - - -
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

  // - - - - - Secure Logout - - - - -
  async function secureLogout() {
    let rsp = await universalAPI('/api/auth/logout', {})

    if (rsp.usermessage == "You are logged out!") {
      return true;
    } else {
      return false;
    }
  }

  // Add prop userInformation to show user name and device

  return (
    <div className={styles.box}>
      {/* <p>Logged in as <bold>{userInformation.name}</bold></p> */}
      {/* <p>Device: {userInformation.device}</p> */}
      <button className={styles.logout_button} onClick={() => setLocalLogin(false)}>Logout</button>
    </div>
  );
}
import Head from 'next/head';
import { useEffect } from 'react';
import axios from 'axios';
import crypto from 'crypto';
import Script from 'next/script';

import styles from '../styles/Home.module.css';

export default function Home() {

  async function generateRandomHash() {
    // Generate a random 256-bit (32-byte) value
    const randomValues = new Uint8Array(32);
    window.crypto.getRandomValues(randomValues);

    // Hash the random value using SHA-256
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', randomValues);

    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
  }

  async function sendCode() {
    // Generate the random hash
    const hash = await generateRandomHash();

    // Send the POST request with the hash in the body
    await axios.post('api/validatecode', {
        hash: hash
    }, {
        withCredentials: true
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

    console.log(hash);
}

  return (
    <div>
      <Head>
        <title>Secure Login</title>
        <link rel="icon" href="https://data.t3l.ls/media/t3.ico" />

        {/* Apple Sign In Configuration */}
        <meta name="appleid-signin-client-id" content="watchti.me.services"/>
        <meta name="appleid-signin-scope" content="email"/>
        <meta name="appleid-signin-redirect-uri" content="https://watchti.me/api/return"/>
        <meta name="appleid-signin-state" content="firststate"/>
        <meta name="appleid-signin-nonce" content="firstnonce"/>
        <meta name="appleid-signin-use-popup" content="false"/>
      </Head>

      <main>
        {/* Import the Apple Sign In Library*/}
        <Script src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js" strategy="afterInteractive"/>

        {/* Apple Sign In Button */}
        <div className={styles.container}>
          <h1 className={styles.title}>
            Your login was successful!
          </h1>

          {/* Create a button that triggers an API call */}
          <button onClick={sendCode}>API Call</button>
          <input type="text" id="code" name="code" placeholder="Enter code here"></input>
          <input type="password" id="password" name="password" placeholder="Enter password here"></input>


        </div>
        
      </main>
    </div>
  );
}
import Head from 'next/head';
import { useEffect } from 'react';
import Script from 'next/script';

import styles from '../styles/Home.module.css';

export default function Home() {

  return (
    <div>
      <Head>
        <title>Secure Login</title>
        <link rel="icon" href="https://data.t3l.ls/media/maintime.ico" />

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
            What did I tell you about your eMail?
          </h1>
          <h3>
            Please sign in again and use "Hide My Email"!
          </h3>
          
          <div className={styles.appleBox}>
            <div id="appleid-signin" data-color="black" data-border="false" data-type="sign-in" className={styles.appleButton}></div>
          </div>
          
        </div>
        
      </main>
    </div>
  );
}
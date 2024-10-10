import Head from 'next/head';
import { useEffect } from 'react';
import Script from 'next/script';

import styles from '../styles/Home.module.css';

import SelectBar from 'components/auth/selectbar';

export default function Home() {

    return (
        <div>
            <Head>
                <title>StepTime Login</title>
                <link rel="icon" href="https://data.t3l.ls/media/maintime.ico" />
            </Head>

            <main>
                <h1>Account</h1>
                <SelectBar options={["create", "login"]} selected={null}/>
                <p className={styles.tag}>Your Name</p>
                <input id="tb_name" className={styles.input} type="text" name="name" required/>
                <p className={styles.tag}>PIN</p>
                <input id="tb_pin" className={styles.input} type="password" name="pin" required/>


                <h1>Team</h1>
                <SelectBar options={["create", "login", "join"]} selected={null}/>
                <p className={styles.tag}>Team Name</p>
                <input id="tb_teamname" className={styles.input} type="text" name="teamname" required/>
                <p className={styles.tag}>Team Code</p>
                <input id="tb_teamcode" className={styles.input} type="password" name="teamcode" required/>
                
            </main>
        </div>
    );
}
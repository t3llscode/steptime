import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Header from '../components/header/Header';
import Footer from 'components/footer/Footer';

import FormJoinTeam from 'components/popups/forms/FormJoinTeam';
import AuthCookieInfo from 'components/popups/Auth';

export default function Home() {

    const [secondsLeftInDay, setSecondsLeftInDay] = useState(0);

    const [authMessage, setAuthMessage] = useState('');

    const [authVisible, setAuthVisible] = useState(false);

    const [cookieMessage, setCookieMessage] = useState('');

    const [loginMessage, setLoginMessage] = useState('');

    // Transition
    
    useEffect(() => {
        const calculateSecondsLeftInDay = () => {
        const now = new Date();
        const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0
        );
        const diffInSeconds = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
        setSecondsLeftInDay(diffInSeconds);
        };

        calculateSecondsLeftInDay();
        const intervalId = setInterval(calculateSecondsLeftInDay, 1000);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => { // first render
        // check for login
    }, [])


    // TODO LIST
    // fix buttons
    // change css
    // underliine links
    // fix ./../.. component import

    return (
            <div className={styles.container}>
                <Head>
                    <title>health.maintime.io | StepTime</title>
                    <link rel="icon" href="https://maintime.io/data/media/maintime.ico" />
                </Head>

                <div className={styles.header}>
                    <Header/>
                </div>

                {/* <div>
                    <FormRegister rLoginMessage={setAuthMessage} switchObject={setRegisterVisible}/>
                </div> */}



                <main className={styles.main}>
                    

                    {/* <div className={styles.column}>
                        <h1>I am building</h1>
                        <h3>come back at a later time</h3>
                        <div className={styles.row}>
                            <div className={styles.row}>
                                <button>Join a Team</button>
                                <button>Create a new Team</button>
                            </div>
                            <div className={styles.row}>
                                <p>Already have an Account? <a href="/login">Login</a></p>
                                <p>Look at the achievements of other teams <a href="/leaderboard">here</a>.</p>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className={styles.authcontainer}>
                        <FormJoinTeam rLoginMessage={setAuthMessage}/>
                    </div> */}

                    <div className={styles.authcontainer}>
                        <AuthCookieInfo rLoginMessage={setLoginMessage} />
                    </div>

                </main>

                <div className={styles.footer}>
                    <Footer/>
                </div>

                

            </div>
        )
    }
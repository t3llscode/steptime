import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import Header from './../components/Header/Header';

export default function Home() {

    const [secondsLeftInDay, setSecondsLeftInDay] = useState(0);


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

                <main className={styles.main}>
                    <Header/>

                    <div className={styles.column}>
                        <h1>Activity Challenges for Teams</h1>
                        <h3>should never be a financial decision. That's why maintime's StepTime is 100% free. Get active with your team!</h3>
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
                    </div>

                </main>
            </div>
        )
    }
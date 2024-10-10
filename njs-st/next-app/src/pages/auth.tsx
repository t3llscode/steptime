import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Script from 'next/script';

import styles from './auth.module.css';

import SelectBar from 'components/auth/selectbar';

export default function Home() {

    const router = useRouter();
    const { acc } = router.query;
    const { team } = router.query; // TODO: Implement Auto Team Join

    const [step, setStep] = useState(0);
    const maxStep = 3;

    const [teamAction, setTeamAction] = useState('Login');
    const [accAction, setAccAction] = useState('Login');

    const accClick = {
        'Sign Up': ['or', 'login', '', 'Login'],
        'Login': ['or', 'sign up', '', 'Sign Up']
    }

    const teamClick = {
        'Login': ['or', 'join', 'a Team', 'Join'],
        'Join': ['or', 'create', 'a Team', 'Create'],
        'Create': ['or', 'login', 'a Team', 'Login']
    }

    const accText  = {
        'Sign Up': 'Set the name and PIN of your new Account',
        'Login': 'Insert the credentials of your Account'
    }

    const teamText = {
        'Login': 'Insert the credentials of your Team',
        'Join': 'Insert the credentials of the Team you want to join',
        'Create': 'Set a name and password for your new Team'
    }

    useEffect(() => {
        console.log(accAction)
    }, [accAction])
    
    return (
        <div>
            <Head>
                <title>StepTime Login</title>
                <link rel="icon" href="https://data.t3l.ls/media/maintime.ico" />
            </Head>

            <main>

                { step === 0 && (
                    <>
                        <div className={styles.banner}>
                            <h1>Team</h1>
                            <p>Step {step + 1} / {maxStep}</p>
                        </div>
                        <br></br>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <h2>{teamAction}</h2>
                                <h3>
                                    {teamClick[teamAction][0]} <a className={styles.link} onClick={() => {setTeamAction(teamClick[teamAction][3])}}>{teamClick[teamAction][1]}</a> {teamClick[teamAction][2]}
                                </h3>
                            </div>
                            <p>{teamText[teamAction]}</p>
                        </div>
                        <br></br>
                        <div className={styles.info}>
                            <h3 className={styles.tag}>Team Name</h3>
                            <input id="tb_teamname" className={styles.input} type="text" name="teamname" required/>
                            <h3 className={styles.tag}>Team Code</h3>
                            <input id="tb_teamcode" className={styles.input} type="text" name="teamcode" required/>
                        </div>
                    </>
                )}

                { step === 1 && (
                    <>
                        <div className={styles.banner}>
                            <h1>Account</h1>
                            <p>Step {step + 1} / {maxStep}</p>
                        </div>
                        <br></br>
                        <div className={styles.info}>
                            <div className={styles.row}>
                                <h2>{accAction}</h2>
                                <h3>
                                    {accClick[accAction][0]} <a className={styles.link} onClick={() => {setAccAction(accClick[accAction][3])}}>{accClick[accAction][1]}</a> {accClick[accAction][2]}
                                </h3>
                            </div>
                            <p>{accText[accAction]}</p>
                        </div>
                        <br></br>
                        <div className={styles.info}>
                            <p className={styles.tag}>Your Name</p>
                            <input id="tb_accname" className={styles.input} type="text" name="accname" required/>
                            <h3 className={styles.tag}>PIN</h3>
                            <input id="tb_accpin" className={styles.input} type="password" name="accpin" required/> 
                        </div>
                    </>
                )}

                { step === 2 && (
                    <>
                        <div className={styles.banner}>
                            <h1>Creation</h1>
                            <p>Step {step + 1} / {maxStep}</p>
                        </div>
                        <br></br>
                        <div className={styles.info}>
                            <h2>Please wait while we create your account.</h2>
                        </div>
                    </>
                )}
                
                <br></br>

                <div className={styles.navigation}>
                    { step === 1 && (
                        <button onClick={() => setStep(step - 1)}>Back</button>
                    )}
                    { step < 2 && (
                        <button onClick={() => setStep(step + 1)}>Next</button>
                    )}
                </div>
                
            </main>
        </div>
    );
}
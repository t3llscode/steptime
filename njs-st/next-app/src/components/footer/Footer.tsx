import styles from './Footer.module.css'

export default function Footer() {

    return (
        <div>
            <div className={styles.header}>
                <h2>Privacy Policy</h2>
                <div className={styles.header_segment}>
                    <img src="https://maintime.io/data/media/t3.ico"/>
                    <h2>t3lls by Tell Hensel</h2>
                </div>
                <h2>Legal Notice</h2>             
            </div>
        </div>
    );
}
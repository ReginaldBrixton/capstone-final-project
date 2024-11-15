import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Welcome to Our Capstone Project</h1>
          <p className={styles.description}>
            Exploring innovative solutions through technology
          </p>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🚀</div>
            <h3>Fast & Efficient</h3>
            <p>Built with cutting-edge technology for optimal performance</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🛠️</div>
            <h3>Customizable</h3>
            <p>Flexible solutions tailored to your needs</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🔒</div>
            <h3>Secure</h3>
            <p>Enhanced security measures to protect your data</p>
          </div>
        </div>

        <div className={styles.ctas}>
          <a href="#demo" className={styles.primary}>
            View Demo
          </a>
          <a href="#about" className={styles.secondary}>
            Learn More
          </a>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p> 2024 Capstone Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

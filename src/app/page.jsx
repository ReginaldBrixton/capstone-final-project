"use client"

import { useState, useEffect } from 'react';
import styles from './page.module.css';

const features = [
  { icon: '🚀', title: 'Fast & Efficient', description: 'Built with cutting-edge technology for optimal performance' },
  { icon: '🛠️', title: 'Customizable', description: 'Flexible solutions tailored to your needs' },
  { icon: '🔒', title: 'Secure', description: 'Enhanced security measures to protect your data' },
];

export default function Home() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Welcome to Our Capstone Project</h1>
          <p className={styles.description}>Exploring innovative solutions through technology</p>
        </section>

        <section className={styles.features}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </section>

        <section className={styles.ctas}>
          <a href="#demo" className={`${styles.cta} ${styles.primary}`}>View Demo</a>
          <a href="#about" className={`${styles.cta} ${styles.secondary}`}>Learn More</a>
        </section>
      </main>
      
      <footer className={styles.footer}>
        <p>&copy; {currentYear} Capstone Project. All rights reserved.</p>
      </footer>
    </div>
  );
}

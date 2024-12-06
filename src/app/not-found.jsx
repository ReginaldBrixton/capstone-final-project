'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/NotFound.module.scss';

const AnimatedNotFound = () => {
  const [bounce, setBounce] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [hoveredChar, setHoveredChar] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce((prev) => !prev);
      setRotate((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const numbers = ['4', '0', '4'];

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.numbersContainer}>
        {numbers.map((num, index) => (
          <div
            key={index}
            className={`${styles.numberChar} 
              ${hoveredChar === index ? styles.hovered : ''} 
              ${bounce && index === 1 ? styles.bounce : ''} 
              ${rotate ? styles.rotate : ''}`}
            onMouseEnter={() => setHoveredChar(index)}
            onMouseLeave={() => setHoveredChar(null)}
          >
            {num}
          </div>
        ))}
      </div>

      <div className={styles.title}>
        Oops! Page Not Found
      </div>

      <p className={styles.description}>
        The page you're looking for has taken a digital detour.
        <br className={styles.lineBreak} />
        Let's get you back on track!
      </p>

      <div className={styles.buttonContainer}>
        <Link href="/" className={`${styles.button} ${styles.primary}`}>
          Return Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className={`${styles.button} ${styles.secondary}`}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default AnimatedNotFound;

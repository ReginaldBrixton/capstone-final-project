'use client';

import '../styles/components/Header.scss';

export default function Header() {
  return (
    <header className="header">
      <div className="title-wrapper">
        <div className="header-title-container">
          <div className="typing-container">
            <h1 className="title">
              Welcome to Next.js PWA
            </h1>
          </div>
        </div>
        <p className="subtitle">
          A modern web application built with Next.js and React
        </p>
      </div>
    </header>
  );
} 
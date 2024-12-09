'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBook, FaCalendarAlt, FaChartBar, FaCog, FaHome } from 'react-icons/fa';

import styles from './layout.module.scss';

const navItems = [
  { path: '/student/home', label: 'Dashboard', icon: FaHome },
  { path: '/student/courses', label: 'My Courses', icon: FaBook },
  { path: '/student/schedule', label: 'Schedule', icon: FaCalendarAlt },
  { path: '/student/grades', label: 'Grades', icon: FaChartBar },
  { path: '/student/settings', label: 'Settings', icon: FaCog },
];

export default function StudentLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Student Portal</h2>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
              >
                <Icon className={styles.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

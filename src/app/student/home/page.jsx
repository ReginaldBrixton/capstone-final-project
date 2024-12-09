import React from 'react';

import styles from './page.module.scss';

export default function StudentHome() {
  return (
    <div className={styles.studentDashboard}>
      <h1>Welcome Back, John!</h1>

      <div className={styles.dashboardGrid}>
        <section className={styles.profileSection}>
          <div className={styles.avatar}></div>
          <div className={styles.profileInfo}>
            <h2>John Doe</h2>
            <p>Student ID: 12345</p>
            <p>Computer Science - Year 3</p>
          </div>
        </section>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>Active Courses</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>8</div>
            <div className={styles.statLabel}>Pending Assignments</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>3.8</div>
            <div className={styles.statLabel}>GPA</div>
          </div>
        </div>

        <section className={styles.section}>
          <h2>Current Courses</h2>
          <div className={styles.courseList}>
            <div className={styles.item}>
              <div className={styles.title}>Advanced Algorithms</div>
              <div className={styles.meta}>Prof. Smith • Mon/Wed 10:00 AM</div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>Database Systems</div>
              <div className={styles.meta}>Prof. Johnson • Tue/Thu 2:00 PM</div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Upcoming Assignments</h2>
          <div className={styles.assignmentList}>
            <div className={styles.item}>
              <div className={styles.title}>Algorithm Analysis Report</div>
              <div className={styles.meta}>Due: Dec 15, 2024</div>
            </div>
            <div className={styles.item}>
              <div className={styles.title}>Database Design Project</div>
              <div className={styles.meta}>Due: Dec 20, 2024</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

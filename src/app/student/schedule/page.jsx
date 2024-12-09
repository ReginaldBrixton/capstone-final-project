import React from 'react';

import styles from './page.module.scss';

const schedule = {
  Monday: [
    { time: '10:00 AM - 11:30 AM', course: 'Advanced Algorithms', room: 'Room 301' },
    { time: '2:00 PM - 3:30 PM', course: 'Machine Learning', room: 'Room 205' },
  ],
  Tuesday: [{ time: '2:00 PM - 3:30 PM', course: 'Database Systems', room: 'Room 401' }],
  Wednesday: [
    { time: '10:00 AM - 11:30 AM', course: 'Advanced Algorithms', room: 'Room 301' },
    { time: '2:00 PM - 3:30 PM', course: 'Machine Learning', room: 'Room 205' },
  ],
  Thursday: [{ time: '2:00 PM - 3:30 PM', course: 'Database Systems', room: 'Room 401' }],
  Friday: [{ time: '11:00 AM - 12:30 PM', course: 'Study Group', room: 'Library' }],
};

export default function SchedulePage() {
  return (
    <div className={styles.schedulePage}>
      <header className={styles.header}>
        <h1>Weekly Schedule</h1>
        <div className={styles.controls}>
          <button className={styles.todayButton}>Today</button>
          <div className={styles.weekControls}>
            <button className={styles.weekButton}>Previous Week</button>
            <span className={styles.weekLabel}>Dec 9 - Dec 15</span>
            <button className={styles.weekButton}>Next Week</button>
          </div>
        </div>
      </header>

      <div className={styles.scheduleGrid}>
        {Object.entries(schedule).map(([day, classes]) => (
          <div key={day} className={styles.dayColumn}>
            <div className={styles.dayHeader}>{day}</div>
            <div className={styles.classes}>
              {classes.map((classItem, index) => (
                <div key={index} className={styles.classCard}>
                  <div className={styles.time}>{classItem.time}</div>
                  <div className={styles.course}>{classItem.course}</div>
                  <div className={styles.room}>{classItem.room}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

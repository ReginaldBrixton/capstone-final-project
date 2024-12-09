import React from 'react';

import styles from './page.module.scss';

const courses = [
  {
    id: 1,
    code: 'CS401',
    name: 'Advanced Algorithms',
    instructor: 'Prof. Smith',
    schedule: 'Mon/Wed 10:00 AM',
    progress: 65,
    status: 'In Progress',
  },
  {
    id: 2,
    code: 'CS402',
    name: 'Database Systems',
    instructor: 'Prof. Johnson',
    schedule: 'Tue/Thu 2:00 PM',
    progress: 45,
    status: 'In Progress',
  },
  {
    id: 3,
    code: 'CS403',
    name: 'Machine Learning',
    instructor: 'Dr. Williams',
    schedule: 'Mon/Wed 2:00 PM',
    progress: 80,
    status: 'In Progress',
  },
];

export default function CoursesPage() {
  return (
    <div className={styles.coursesPage}>
      <header className={styles.header}>
        <h1>My Courses</h1>
        <div className={styles.filters}>
          <select className={styles.select}>
            <option value="all">All Courses</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </header>

      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.courseHeader}>
              <span className={styles.courseCode}>{course.code}</span>
              <span className={styles.status}>{course.status}</span>
            </div>
            <h2 className={styles.courseName}>{course.name}</h2>
            <div className={styles.instructor}>
              <span>Instructor:</span> {course.instructor}
            </div>
            <div className={styles.schedule}>
              <span>Schedule:</span> {course.schedule}
            </div>
            <div className={styles.progressWrapper}>
              <div className={styles.progressLabel}>
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${course.progress}%` }}></div>
              </div>
            </div>
            <button className={styles.viewButton}>View Course</button>
          </div>
        ))}
      </div>
    </div>
  );
}

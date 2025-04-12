CREATE DATABASE attendance_system;

USE attendance_system;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE lectures (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  lecture_no INT,
  status ENUM('Present', 'Absent') DEFAULT 'Absent',
  FOREIGN KEY (student_id) REFERENCES students(id)
);

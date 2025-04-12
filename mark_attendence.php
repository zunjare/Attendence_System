<?php
include 'db.php';

$studentName = $_POST['name'];
$lectureNo = $_POST['lecture'];
$status = $_POST['status'];

$res = $conn->query("SELECT id FROM students WHERE name = '$studentName'");
$row = $res->fetch_assoc();
$student_id = $row['id'];

$conn->query("UPDATE lectures 
              SET status = '$status' 
              WHERE student_id = $student_id AND lecture_no = $lectureNo");

echo "Attendance updated";
?>

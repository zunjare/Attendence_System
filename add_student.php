<?php
include 'db.php';

$name = $_POST['name'];
$totalLectures = $_POST['totalLectures'];

$stmt = $conn->prepare("INSERT INTO students (name) VALUES (?)");
$stmt->bind_param("s", $name);
$stmt->execute();

$student_id = $conn->insert_id;

for ($i = 1; $i <= $totalLectures; $i++) {
  $conn->query("INSERT INTO lectures (student_id, lecture_no) VALUES ($student_id, $i)");
}

echo "Student added successfully";
?>

<?php
include 'db.php';

$result = $conn->query("SELECT s.name, COUNT(*) as total,
       SUM(l.status='Present') as present,
       SUM(l.status='Absent') as absent
       FROM students s
       JOIN lectures l ON s.id = l.student_id
       GROUP BY s.name");

$report = [];

while ($row = $result->fetch_assoc()) {
  $report[] = $row;
}

echo json_encode($report);
?>

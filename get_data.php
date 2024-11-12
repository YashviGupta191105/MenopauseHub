<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "your_username";
$password = "your_password";
$database = "your_database";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$sql = "SELECT symptom, severity, symptom_date as date, notes FROM symptom_data WHERE user_name = 'example_user'";  // Replace 'example_user' with a session-based username if available
$result = $conn->query($sql);

$symptomsData = [
    "Hot Flashes" => [],
    "Mood Swings" => [],
    "Sleep Disturbance" => [],
    "Night Sweats" => [],
    "Fatigue" => []
];

while ($row = $result->fetch_assoc()) {
    $symptomsData[$row['symptom']][] = $row;
}

echo json_encode($symptomsData);

$conn->close();
?>

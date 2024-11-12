/*
<?php
header('Content-Type: application/json');

// Database connection parameters
$servername = "vultr-prod-40a1ee94-eb56-446c-9b9c-2a9070d51f30-vultr-prod-9e9b.vultrdb.com";
$username = "vultradmin";
$password = "AVNS_GQW4P-aZuhICTqYJTu5";
$database = "tracker";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Get JSON input and decode it
$data = json_decode(file_get_contents("php://input"), true);
$symptom = $data['symptom'];
$severity = $data['severity'];
$notes = $data['notes'];
$date = $data['symptom_date'];
$user_name = 'vultradmin';  // Replace with actual username or session value

$sql = "INSERT INTO symptom_data (user_name, symptom, symptom_date, severity, notes) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssds", $user_name, $symptom, $date, $severity, $notes);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}

$stmt->close();
$conn->close();
?>
 */

<?php
header('Content-Type: application/json');

// Database connection parameters
$servername = "your_vultr_database_host";
$username = "your_database_username";
$password = "your_database_password";
$database = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Get input data
$data = json_decode(file_get_contents("php://input"), true);
$symptom = $data['symptom'];
$severity = $data['severity'];
$notes = $data['notes'];
$date = $data['date'];
$user_name = 'example_user';

// Debug: check received data
if (empty($symptom) || empty($severity) || empty($date)) {
    echo json_encode(['success' => false, 'message' => 'Missing input data']);
    exit();
}

// Prepare SQL statement
$sql = "INSERT INTO symptom_data (user_name, symptom, symptom_date, severity, notes) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'SQL prepare failed: ' . $conn->error]);
    exit();
}

$stmt


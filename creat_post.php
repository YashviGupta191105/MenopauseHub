<?php
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("your_server", "your_username", "your_password", "your_database");

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents("php://input"), true);
$user_name = $data['user_name'];
$title = $data['title'];
$content = $data['content'];

$sql = "INSERT INTO posts (user_name, title, content) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $user_name, $title, $content);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Post created successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error creating post']);
}

$stmt->close();
$conn->close();
?>

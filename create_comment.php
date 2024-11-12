<?php
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("your_server", "your_username", "your_password", "your_database");

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

$data = json_decode(file_get_contents("php://input"), true);
$post_id = $data['post_id'];
$user_name = $data['user_name'];
$content = $data['content'];

$sql = "INSERT INTO comments (post_id, user_name, content) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $post_id, $user_name, $content);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Comment added successfully']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error adding comment']);
}

$stmt->close();
$conn->close();
?>

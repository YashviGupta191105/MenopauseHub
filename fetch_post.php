<?php
header('Content-Type: application/json');

// Database connection
$conn = new mysqli("your_server", "your_username", "your_password", "your_database");

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Fetch posts with their comments
$postsQuery = "SELECT * FROM posts ORDER BY created_at DESC";
$postsResult = $conn->query($postsQuery);

$posts = [];
while ($post = $postsResult->fetch_assoc()) {
    $postId = $post['id'];

    // Fetch comments for this post
    $commentsQuery = "SELECT * FROM comments WHERE post_id = $postId ORDER BY created_at ASC";
    $commentsResult = $conn->query($commentsQuery);
    $comments = [];

    while ($comment = $commentsResult->fetch_assoc()) {
        $comments[] = $comment;
    }

    $post['comments'] = $comments;
    $posts[] = $post;
}

echo json_encode(['success' => true, 'posts' => $posts]);

$conn->close();
?>

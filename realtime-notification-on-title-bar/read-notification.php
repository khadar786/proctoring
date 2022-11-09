<?php

	// start the session
	session_start();

	// connect with database
	$conn = new PDO("mysql:host=localhost:8889;dbname=test", "root", "root");

	// get ID from AJAX
	$id = $_POST["id"];

	// mark notification as read
	$sql = "UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?";
	$statement = $conn->prepare($sql);
	$statement->execute([
		$id,
		$_SESSION["user_id"]
	]);

	// send the response back to client
	echo json_encode([
		"status" => "success"
	]);
	exit();
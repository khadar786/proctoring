<?php

	// connect with database
	$conn = new PDO("mysql:host=localhost:8889;dbname=test", "root", "root");

	// create table if not exists
	$sql = "CREATE TABLE IF NOT EXISTS notifications (
		id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
		user_id INTEGER,
		message TEXT,
		is_read BOOLEAN,
		created_at DATETIME
	)";

	// prepare the query
	$statement = $conn->prepare($sql);
	
	// execute the statement
	$statement->execute();

	// user who needs to receive the notification
	$user_id = 565; // replace this your user ID
	$message = "You have received a new message " . time() . ".";
	$is_read = 0;

	// insert in notifications table
	$sql = "INSERT INTO notifications (user_id, message, is_read, created_at) VALUES (?, ?, ?, NOW())";
	$statement = $conn->prepare($sql);
	$statement->execute([
		$user_id, $message, $is_read
	]);

?>

<!-- save user id -->
<input type="hidden" id="user-id" value="<?php echo $user_id; ?>" />

<!-- include socket IO JS -->
<script src="socket.io.js"></script>

<script>
	// connect with Node JS server
	var socketIO = io("http://localhost:3000");

	// get user ID
	var userId = document.getElementById("user-id").value;

	// send notification to the server
	socketIO.emit("newNotification", userId);
</script>
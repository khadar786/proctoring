<?php

	// start session and login the user
	session_start();

	// you might be saving the session during login,
	// I am hard-coding the value for testing purpose
	$_SESSION["user_id"] = 565;

	// connect with database
	$conn = new PDO("mysql:host=localhost:8889;dbname=test", "root", "root");

	// get number of unread notifications
	$sql = "SELECT COUNT(*) AS total_unread_notifications FROM notifications WHERE user_id = ? AND is_read = 0";
	$statement = $conn->prepare($sql);
	$statement->execute([
		$_SESSION["user_id"]
	]);
	$row = $statement->fetch();
	$total_unread_notifications = $row["total_unread_notifications"];
?>

<!-- title where notification number will be displayed -->
<title>My Website</title>

<!-- include socket IO JS -->
<script src="socket.io.js"></script>

<!-- save variables in hidden input field to access in Javascript -->
<input type="hidden" id="total-unread-notifications" value="<?php echo $total_unread_notifications; ?>" />
<input type="hidden" id="user-id" value="<?php echo $_SESSION['user_id']; ?>" />

<script>
	// connect with Node JS server
	var socketIO = io("http://localhost:3000");

	// get variables in Javascript
	var totalUnreadNotifications = document.getElementById("total-unread-notifications").value;
	totalUnreadNotifications = parseInt(totalUnreadNotifications);

	// show count in title bar
	showTitleBarNotifications();

	// connect user with Node JS server
	var userId = document.getElementById("user-id").value;
	socketIO.emit("connected", userId);

	// when a new notification is received
	socketIO.on("newNotification", function (data) {
		totalUnreadNotifications++;
		showTitleBarNotifications();
	});

	socketIO.on("notificationRead", function (data) {
		totalUnreadNotifications--;
		showTitleBarNotifications();
	});

	function showTitleBarNotifications() {
		// pattern to check if there is any counter number at the start of title bar
    	var pattern = /^\(\d+\)/;

    	if (totalUnreadNotifications == 0) {
    		document.title = document.title.replace(pattern, "");
			return;
		}

		if (pattern.test(document.title)) {

			// update the counter
			document.title = document.title.replace(pattern, "(" + totalUnreadNotifications + ")");
		} else {

			// prepend the counter
			document.title = "(" + totalUnreadNotifications + ") " + document.title;
		}
	}
</script>
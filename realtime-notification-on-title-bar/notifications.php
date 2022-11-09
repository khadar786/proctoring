<?php

	// start session
	session_start();

	// connect with database
	$conn = new PDO("mysql:host=localhost:8889;dbname=test", "root", "root");

	// get all notifications sorting by unread goes first
	$sql = "SELECT * FROM notifications WHERE user_id = ? ORDER BY is_read ASC";
	$statement = $conn->prepare($sql);
	$statement->execute([
		$_SESSION["user_id"]
	]);
	$notifications = $statement->fetchAll();

?>

<!-- include socket IO JS -->
<script src="socket.io.js"></script>

<!-- show all notifications in a table -->
<table>
	<tr>
		<th>Message</th>
		<th>Action</th>
	</tr>

	<?php foreach ($notifications as $notification): ?>
		<tr>
			<td><?php echo $notification['message']; ?></td>
			<td>
				<!-- show 'read' button only if the notification is un-read -->
				<?php if (!$notification['is_read']): ?>
					<form onsubmit="return markAsRead();">
						<input type="hidden" name="id" value="<?php echo $notification['id']; ?>" />
						<input type="hidden" name="user_id" value="<?php echo $notification['user_id']; ?>" />
						<input type="submit" value="Read" />
					</form>
				<?php endif; ?>
			</td>
		</tr>
	<?php endforeach; ?>
</table>

<script>
	// connect with Node JS server
	var socketIO = io("http://localhost:3000");

	// when the read button is clicked
	function markAsRead() {
		// prevent the form from submitting
		event.preventDefault();

		// get the form node
		var form = event.target;

		// create AJAX object
		var ajax = new XMLHttpRequest();

		// set method and URL of request
		ajax.open("POST", "read-notification.php", true);

		// when the status of request changes
		ajax.onreadystatechange = function () {

			// when the response is received from server
			if (this.readyState == 4) {

				// if the response is successful
				if (this.status == 200) {

					// convert the JSON string into Javascript object
					var data = JSON.parse(this.responseText);
					console.log(data);

					// if there is no error
					if (data.status == "success") {

						// send notification to the server
						socketIO.emit("notificationRead", form.user_id.value);

						// remove the 'read' button
						form.remove();
					}
				}
			}
		};

		// create form data object with the form
		var formData = new FormData(form);

		// send the AJAX request with the form data
		ajax.send(formData);
	}
</script>
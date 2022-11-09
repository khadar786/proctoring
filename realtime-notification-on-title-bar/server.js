// initialize express server
var express = require("express");
var app = express();

// create http server from express instance
var http = require("http").createServer(app);

// include socket IO
var socketIO = require("socket.io")(http, {
	cors: {
		origin: ["http://localhost:8888"]
	}
});

// start the HTTP server at port 3000
http.listen(process.env.PORT || 3000, function () {
	console.log("Server started running...");

	// an array to save all connected users IDs
	var users = [];

	// called when the io() is called from client
	socketIO.on("connection", function (socket) {

		// called manually from client to connect the user with server
		socket.on("connected", function (id) {
			users[id] = socket.id;
		});

		socket.on("notificationRead", function (userId) {
			socketIO.to(users[userId]).emit("notificationRead", userId);
		});

		// when a new notification is received
		socket.on("newNotification", function (userId) {

			// send notification to the selected user
			socketIO.to(users[userId]).emit("newNotification", userId);
		});
	});
});
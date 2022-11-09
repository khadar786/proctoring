<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Socket Connection</title>
</head>
<body>
  <h1>Hello</h1>
  <script src="socket.io.js"></script>
  <script>
    // connect with Node JS server
    var socketIO = io("http://localhost:4000");

    socketIO.on("connect",()=>{
      console.log("successfully connected socket.io server");
      console.log(socketIO.id);
    });
  </script>
</body>
</html>
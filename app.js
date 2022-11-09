const http=require('http');
const express=require('express');
const app=express();
const PORT=process.PORT || 4000;
const server=http.createServer(app);

var allowedOrigins = "http://localhost:* http://127.0.0.1:*";
const io=require('socket.io')(server,{
  cors: {
    origins:allowedOrigins,
  }
});

app.get('/',(req,res)=>{
  res.send('Hi');
});



/* app.listen(PORT,()=>{

}); */
let connectedPeers=[];

io.on("connection",(socket)=>{
  console.log("user connected to socket.IO server");
  console.log(socket.id);

  connectedPeers.push(socket.id);

  socket.on("disconnect",()=>{
    console.log("user disconnected");

    let newConnectedPeers=connectedPeers.filter(peerSocketID=>peerSocketID!=socket.id);

    connectedPeers=newConnectedPeers;

    console.log(connectedPeers);
  });
  console.log(connectedPeers);
});

server.listen(PORT,()=>{

});
const http=require('http');
const express=require('express');
const app=express();
const PORT=process.PORT || 4000;
const server=http.createServer(app);

//var allowedOrigins = "http://localhost:* http://127.0.0.1:* http://192.168.2.127:*";
var allowedOrigins = "http://localhost:* http://127.0.0.1:*  http://192.168.2.127:*";
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

//io('http://192.168.2.127:8080',{secure: true});
io.on("connection", (socket) => {
  
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    //console.log("pre-offer-came");
    const { calleePersonalCode, callType } = data;
    //console.log(calleePersonalCode);
    //console.log(connectedPeers);
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    console.log(connectedPeer);

    if(connectedPeer){
      const data = {
        callerSocketId: socket.id,
        callType,
      };

      /* const newConnectedPeers = connectedPeers.filter(
        (peerSocketId) => peerSocketId !== calleePersonalCode
      );
      
      const toCallee=newConnectedPeers[0];
      io.to(toCallee).emit("pre-offer", data); */
      io.to(calleePersonalCode).emit("pre-offer", data);
    }else {
      const data = {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      };
      io.to(socket.id).emit("pre-offer-answer", data);
    }

  });

  socket.on("pre-offer-answer", (data) => {
    console.log("pre offer answer came");
    console.log(data);

    const { callerSocketId }=data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === callerSocketId
    );

    if(connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer",data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;

    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    const newConnectedPeers = connectedPeers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    connectedPeers = newConnectedPeers;
    console.log(connectedPeers);
  });

  console.log(connectedPeers);
});

/* server.listen(PORT,()=>{

}); */

server.listen(PORT);
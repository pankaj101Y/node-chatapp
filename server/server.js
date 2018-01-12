const path=require('path');
const express=require('express');
const socketIO=require('socket.io');
const http=require('http');

const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('disconnect',()=>{
    console.log('client disconnected');
  });

  socket.emit('newMessage',{
    "from":"pankaj",
    "message":"hi",
    "timeStamp":new Date().getTime()
  });

  socket.on('createMessage',(message)=>{
    var m={
      "from":message.from,
      "message":message.message,
      "timeStamp":new Date().getTime()
    }

    console.log('message',m);
  });
});

app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`server is up on ${port}`);
});

const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users")

io.on("connection", (socket) => {

    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({id: socket.id, name, room});

        if(error) return callback(error);

        socket.emit("message", { user: "admin", text: `Welcome to the ${user.room}, ${user.name}`})
        socket.broadcast
          .to(user.room)
          .emit("message", {
            user: "admin",
            text: `${user.name} has joined the room!`
          });

        socket.join(user.room);

        callback();
    });
    
    socket.on("sendMessage", ( message, callback ) => {
      const user = getUser(socket.id);

      io.to(user.room).emit('message', { user: user.name, text: message})

      callback()
    });

    socket.on("disconnect", callback => {
      const user = getUser(socket.id);

      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left the room!`
      });

      callback();
    });
})

const port = 5000

const router = require("./router")

app.use(router)

server.listen(port, () => console.log(`Server started on port ${port}`))



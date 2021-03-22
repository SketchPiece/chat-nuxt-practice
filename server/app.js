const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  allowEIO3: true // false by default
});
const users = require("./users")();

const m = (name, text, id) => ({ name, text, id });

io.on("connection", socket => {
  socket.on("USER_JOINED", (data, cb) => {
    if (!data.name || !data.room) {
      return cb("Uncorrected data");
    }

    socket.join(data.room);
    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });

    cb({ userId: socket.id });
    io.to(data.room).emit("UPDATE_USERS", users.getByRoom(data.room));
    socket.emit("NEW_MESSAGE", m("system", `Welcome ${data.name}!`));
    socket.broadcast
      .to(data.room)
      .emit("NEW_MESSAGE", m("system", `User ${data.name} joined.`));
  });

  socket.on("CREATE_MESSAGE", (data, cb) => {
    if (!data.text) {
      return cb("Text shoudn't be empty");
    }

    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit("NEW_MESSAGE", m(user.name, data.text, data.id));
    }
    cb();
  });
  socket.on("USER_LEFT", (id, cb) => {
    const user = users.remove(id);
    if (user) {
      io.to(user.room).emit("UPDATE_USERS", users.getByRoom(user.room));
      io.to(user.room).emit(
        "NEW_MESSAGE",
        m("system", `User ${user.name} left.`)
      );
      cb();
    }
  });

  socket.on("disconnect", () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit("UPDATE_USERS", users.getByRoom(user.room));
      io.to(user.room).emit(
        "NEW_MESSAGE",
        m("system", `User ${user.name} left.`)
      );
    }
  });
});

module.exports = {
  app,
  server
};

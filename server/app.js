const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  allowEIO3: true // false by default
});

io.on("connection", socket => {
  console.log("IO Connected");
  socket.on("CREATE_MESSAGE", data => {
    setTimeout(() => {
      socket.emit("NEW_MESSAGE", { text: data.text + " SERVER" });
    }, 500);
  });
  socket.emit("NEW_MESSAGE", { text: "WHAT" });
});

module.exports = {
  app,
  server
};

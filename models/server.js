const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // HTTP SERVER
    this.server = http.createServer(this.app);

    // SOCKETS CONFIG
    this.io = socketio(this.server, {
      /* Configs */
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  socketsConfig() {
    new Sockets(this.io);
  }

  execute() {
    // Init middlewares
    this.middlewares();

    // Init sockets
    this.socketsConfig();

    this.server.listen(this.port, () => {
      console.log(`Sever running on port: ${this.port}`);
    });
  }
}

module.exports = Server;

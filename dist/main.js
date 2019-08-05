"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_router_1 = require("./users/users.router");
const Server_1 = require("./server/Server");
const server = new Server_1.Server();
server.bootstrap([users_router_1.usersRouter]).then(server => {
    console.log('Server is listening on: ', server.application.address());
}).catch(error => {
    console.log('Server failed do start');
    console.error(error);
    process.exit(1);
});

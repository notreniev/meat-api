import { usersRouter } from './users/users.router';
import { Server } from './server/Server'

const server = new Server()
server.bootstrap([usersRouter]).then(server => {
    console.log('Server is listening on: ', server.application.address())
}).catch(error => {
    console.log('Server failed do start')
    console.error(error)
    process.exit(1)
})

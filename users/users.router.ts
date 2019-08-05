import { authenticate } from './../security/auth-handler';
import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import { User } from './users.model'

class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined // delete document.password
        })
    }

    findByCPF = (req: restify.Request, res: restify.Response, next: restify.Next) => {
        let cpf = req.query.cpf || req.params.cpf

        if (cpf) {
            User.findByCPF(cpf)
                .then(user => (user) ? [user] : [])
                .then(this.renderAll(res, next, {
                    url: req.url
                }))
                .catch(next)
        } else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateid, this.findById])
        application.post(`${this.basePath}`, this.save)
        application.put(`${this.basePath}/:id`, [this.validateid, this.replace])
        application.patch(`${this.basePath}/:id`, [this.validateid, this.update])
        application.del(`${this.basePath}/:id`, [this.validateid, this.delete])
        application.get('/cpf/:cpf', this.findByCPF)

        application.post(`${this.basePath}/authenticate`, authenticate)
    }
}

export const usersRouter = new UsersRouter()
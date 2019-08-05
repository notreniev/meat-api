"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_handler_1 = require("./../security/auth-handler");
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users.model");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByCPF = (req, res, next) => {
            let cpf = req.query.cpf || req.params.cpf;
            if (cpf) {
                users_model_1.User.findByCPF(cpf)
                    .then(user => (user) ? [user] : [])
                    .then(this.renderAll(res, next, {
                    url: req.url
                }))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined; // delete document.password
        });
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateid, this.findById]);
        application.post(`${this.basePath}`, this.save);
        application.put(`${this.basePath}/:id`, [this.validateid, this.replace]);
        application.patch(`${this.basePath}/:id`, [this.validateid, this.update]);
        application.del(`${this.basePath}/:id`, [this.validateid, this.delete]);
        application.get('/cpf/:cpf', this.findByCPF);
        application.post(`${this.basePath}/authenticate`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();

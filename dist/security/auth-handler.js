"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const environment_1 = require("./../common/environment");
const users_model_1 = require("../users/users.model");
const restify_errors_1 = require("restify-errors");
const jwt = require("jsonwebtoken");
exports.authenticate = (req, res, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, '+password') //1st
        .then(user => {
        if (user && user.matches(password)) { //2nd
            //user o token
            //3nd
            const token = jwt.sign({ sub: user.email, iss: 'bcpf-api' }, environment_1.environment.security.saltRounds.toString());
            res.json({ name: user.name, email: user.email, accessToken: token });
            console.log('token: ', token);
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalide Credentials'));
        }
    }).catch(next);
};

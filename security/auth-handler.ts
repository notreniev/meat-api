import { environment } from './../common/environment';
import * as restify from 'restify'
import { User } from '../users/users.model'
import { NotAuthorizedError } from 'restify-errors'
import * as jwt from 'jsonwebtoken'

export const authenticate: restify.RequestHandler = (req, res, next) => {
    const { email, password } = req.body
    User.findByEmail(email, '+password') //1st
        .then(user => {
            if (user && user.matches(password)) { //2nd
                //user o token
                //3nd
                const token = jwt.sign({ sub: <any>user.email, iss: 'bcpf-api' }, environment.security.saltRounds.toString())
                res.json({ name: user.name, email: user.email, accessToken: token })
                console.log('token: ', token)
                return next(false)
            } else {
                return next(new NotAuthorizedError('Invalide Credentials'))
            }
        }).catch(next)
}
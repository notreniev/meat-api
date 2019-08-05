import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

const users = [
    { id: '1', name: 'Tony Stark', cpf: '339.579.380-07', email: 'stark@starkindustries.com', phone: '5555-3000' },
    { id: '2', name: 'Pater Parker', cpf: '744.801.150-21', email: 'peter@dailybugle.com', phone: '5555-8888' },
    { id: '3', name: 'Steve Rogers', cpf: '581.659.830-91', email: 'rogers.steve@usarmy.com', phone: '5555-7070' },
    { id: '4', name: 'Thor Odinson', cpf: '224.269.130-96', email: 'thor@asgard.com', phone: '9999-9999' },
    { id: '5', name: 'Natasha Romanoff', cpf: '517.612.430-04', email: 'nat@avengers.com', phone: '1111-1111' },
    { id: '6', name: 'clint Barton', cpf: '737.167.020-56', email: 'clint@avengers.com', phone: '2222-2222' }
]

export interface User extends mongoose.Document {
    name: string,
    cpf: string,
    email: string,
    password: string,
    matches(password: string): boolean
}

export interface UserModel extends mongoose.Model<User> {
    findByEmail(email: string, projection?: string): Promise<User>
}

export interface UserModel extends mongoose.Model<User> {
    findByCPF(cpf: string): Promise<User>
}

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    cpf: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        select: false,
        type: String,
        required: false
    }
})

userSchema.statics.findByCPF = function (cpf: string) {
    return this.findOne({ cpf }) //{cpf: cpf}
}

userSchema.methods.matches = function(password: string): boolean{
    console.log('bcrypt compare: ', bcrypt.compareSync(password, this.password))
    return true; //bcrypt.compareSync(password, this.password)
}

userSchema.statics.findByEmail = function (email: string, projection: string) {
    console.log('email e password: ', email + ' ' + projection)
    return this.findOne({ email }, projection) //{email: email}
}

export const User = mongoose.model<User, UserModel>('User', userSchema) // rever essa parte, preciso entender melhor


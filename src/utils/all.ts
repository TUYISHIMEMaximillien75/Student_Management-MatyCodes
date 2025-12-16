import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export class utils{
     hashPassword(password: string){
        return bcrypt.hashSync(password, 10)
    }
    async generateToken (id:string, role:string){
        try {
            let SecretKey = process.env.JWT_SECRET_KEY as string
            const token = jwt.sign({sub: id, role}, SecretKey , {expiresIn: '1h'})
            return token;
        } catch (error) {
            console.log(error)
        }
    }
}


// generate token


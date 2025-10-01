import {Strategy} from 'passport-local'
import passport from 'passport'
import User from '../models/users.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { response } from 'express'

const generateToken = async(payload)=>{

    const token = jwt.sign({payload},process.env.JWT_SECRET_KEY)

    return token

}

passport.serializeUser((user,done)=>{
    try {

        done(null,user)

        
    } catch (error) {
        done(error,null)
        
    }

})


passport.deserializeUser(async(id,done)=>{
    try {
        const user = await User.findById(id)

        if(!user)
            throw new Error("user not found")

        return done(null,id)
    } catch (error) {

        return done(error,null)
        
    }
})



export default passport.use(new Strategy({usernameField:'email'},async(username,password,done)=>{
    

    try {
        const user = await User.findOne({'email':username})
           

        if(!user)
            return done(null,false)

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(!passwordMatch)
            return done(null,false)


        const payload = {
            id:user._id,
            role:user.role
        }

        const token = generateToken(payload)
        console.log(token)
        return done(null,user)        




        
    } catch (error) {
        done(error,null)
        console.log(error)
        
    }
    

}))


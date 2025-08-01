import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../models/users.mjs";



passport.use(new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_KEY,
    callbackURL:process.env.CALLBACKURL
},

function(accessToken,refreshToken,profile,callback){
    User.findOrCreate({googleID:profile.id}, function(err,user){
        return callback(err,user)
    })
}

))

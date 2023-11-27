import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { controlWrapper } from "../decorators/index.js";
// import { HttpError } from "../helpers/index.js";
import User from "../models/User.js";
import { HttpError } from "../helpers/HttpError.js";

const {JWT_SECRET} = process.env;

const signUp = async (req, res, next)=>{
   console.log('signup');
   const {email, password}=req.body;
   const user = await User.findOne({email});
   if (user){
      next(new HttpError(409, 'Such e-mail already exest'))
   } else{
      const hashPasswd = await bcrypt.hash(password, 10);
      const newUser = await User.create({...req.body, password: hashPasswd});
      res.status(201).json({usename: newUser.username, email: newUser.email, subscription: newUser.subscription});
   }
};

const signIn = async (req, res, next)=>{
   const {email, password}=req.body;
   const user=await User.findOne({email});
   if (!user){
      return next(new HttpError(401, 'E-mail or password invalid'))
   }
   const isPasswdOK = await bcrypt.compare(password, user.password);
   if (!isPasswdOK){
      return next(new HttpError(401, 'E-mail or password invalid'))
   }
   const payload = {id: user.id};
   const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "72h"});
   console.log(token)
   await User.findByIdAndUpdate(user._id, {token});
   res.json({token, user: {email: user.email, subscription: user.subscription}});
}

const signOut = async (req, res, next)=>{
   await User.findByIdAndUpdate(req.user._id, {token: ""});
   res.json('Signout successful');
}

const current = async (req, res, next)=>{
   const {username, email, subscription} = req.user;
   res.json({username, email, subscription});
}

export default{
   signUp: controlWrapper(signUp),
   signIn: controlWrapper(signIn),
   signOut: controlWrapper(signOut),
   current: controlWrapper(current),
}
import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/index.js";
import User from "../models/User.js";

const {JWT_SECRET} = process.env;

const signUp = async (req, res, next)=>{
   const {email, password}=req.body;
   const user = await User.findOne(email);
   if (user){
      next(new HttpError(409, 'Such e-mail already exest'))
   } else{
      const hashPasswd = await bcrypt.hash(password, 10);
      const newUser = await User.create({...req.body, password: hashPasswd});
      res.status(201).json({usename: newUser.username, email: newUser.email});
   }
};

const signIn = async (req, res, next)=>{
   const {email, password}=req.body;
   const user=await User.findOne(email);
   if (!user){
      next(new HttpError(401, 'E-mail or password invalid'))
   } else{
      const isPasswdOK = await bcrypt.compare(password, user.password);
      if (!isPasswdOK){
         next(new HttpError(401, 'E-mail or password invalid'))
      } else{
         const payload = {id: user.id};
         const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "72h"});
         res.json({token,});
      }
   }
}

export default{
   signUp: controlWrapper(signUp),
   signIn: controlWrapper(signIn),
}
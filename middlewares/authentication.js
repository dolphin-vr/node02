import { controlWrapper } from "../decorators/index.js";
import { HttpError } from "../helpers/HttpError.js";
import User from "../models/User.js";

const {JWT_SECRET} = process.env;

const authentication = async (req, res, next)=>{
   const {authorization} = req.headers;
   if (!authorization){
      console.log('auth no header');
      return next(new HttpError(401, "Authorization header not found"));
      // throw new HttpError(401, "Authorization header not found");
   }
   const [bearer, token] = authorization;
   if (bearer !== "Bearer"){
      return next(new HttpError(401));      
   }
   try {
      const {id}=jwt.verify(token, JWT_SECRET);
      const user = await User.findById(id);
      if (!user || !user.token || user.token !== token){
         return next(new HttpError(401, "User not found"));         
      }
      req.user = user;
      next();
   } catch (error) {
      next(new HttpError(401, error.message))
   }
}

export default controlWrapper(authentication);
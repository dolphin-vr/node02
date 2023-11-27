import { controlWrapper } from "../decorators/index.js";
import User from "../models/User.js";

const subscriptionUpdate = async (req, res, next)=>{
   // const {_id, subscription} req.user;
   const result = await User.findByIdAndUpdate(req.user._id, req.body, {projection: "username email subscription"});
   res.json(result)
}

export default{
   subscriptionUpdate: controlWrapper(subscriptionUpdate),
}
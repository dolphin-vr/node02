import Joi from "joi";
import { Schema, model } from "mongoose";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const userSchema = new Schema({
   username: {
      type: String,
      minLength: 3,
      required: [true, 'Choose your username'],
   },   
  password: {
   type: String,
   required: [true, 'Set password for user'],
 },
 email: {
   type: String,
   required: [true, 'Email is required'],
   match: emailRegexp,
   unique: true,
 },
 subscription: {
   type: String,
   minLength: 7,
   enum: ["starter", "pro", "business"],
   default: "starter"
 },
 token: String
}, {versionKey: false, timestamps: true});

const User = model("user", userSchema);

export const SignUpSchema = Joi.object({
   username: Joi.string().required().min(3).messages({
      "any.required": 'missing required field "username"',
      "string.base": '"username" must be string',
   }),
   email: Joi.string().required().pattern(emailRegexp).messages({
      "any.required": 'missing required field "email"',
      "string.base": '"email" must be valid e-mail',
   }),
   password: Joi.string().required().min(7).messages({
      "any.required": 'missing required field "password"',
      "string.base": '"password" must be string',
   }),
});

export const SignInSchema = Joi.object({
   email: Joi.string().required().pattern(emailRegexp).messages({
      "any.required": 'missing required field "email"',
      "string.base": '"email" must be valid e-mail',
   }),
   password: Joi.string().required().min(7).messages({
      "any.required": 'missing required field "password"',
      "string.base": '"password" must be string',
   }),
});

export default User;
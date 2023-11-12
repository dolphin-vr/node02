import Joi from "joi";

export const contactsAddSchema = Joi.object({
   name: Joi.string().required().messages({
       "any.required": `"name" must be exist`,
       "string.base": `"name" must be text`,
   }),
   email: Joi.string().required().messages({
      "any.required": `"name" must be exist`,
      "string.base": `"name" must be text`,
  }),
   phone: Joi.string().required().messages({
      "any.required": `"name" must be exist`,
      "string.base": `"name" must be text`,
  }),
})

export const contactsUpdateSchema = Joi.object({
   name: Joi.string(),
   email: Joi.string(),
   phone: Joi.string(),
})
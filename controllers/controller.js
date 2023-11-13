import { HttpError } from '../helpers/index.js';
import * as contactsService from '../models/contacts.js';
import { contactsAddSchema, contactsUpdateSchema } from '../schemas/contacts-schemas.js';

const getAll = async (req, res, next) => {
   try {
      const result = await contactsService.listContacts();
      res.json(result);
   } catch (error) {
      next(error)
   }
}

const getById = async (req, res, next) => {
   try {
      const result = await contactsService.getContactById(req.params.id);
      if (!result){
         throw HttpError(404, `Contact with id=${req.params.id} not found`);
      }
      res.json(result);
   } catch (error) {
      next(error)
   }
}

const add = async (req, res, next)=>{
   try {
      const {error} = contactsAddSchema.validate(req.body);
      if (error){
         throw HttpError(400, error.message);
      }
      const result = await contactsService.addContact(req.body);
      res.status(201).json(result);
   } catch (error) {
      next(error)
   }
}

const updateById = async (req, res, next)=>{
   try {
      const {error} = contactsUpdateSchema.validate(req.body);
      if (error){
         throw HttpError(400, error.message);
      };
      const result = await contactsService.updateContact(req.params.id, req.body);
      if (!result){
         throw HttpError(404, `Contacts with id=${req.params.id} not found`)
      };
      res.json(result);
   } catch (error) {
      next(error)
   }
}

const deleteById = async (req, res, next)=>{
   try {
      const result = await contactsService.removeContact(req.params.id);
      if (!result){
         throw HttpError(404, `Contacts with id=${req.params.id} not found`)
      };
      res.json({message: "contact deleted"});
   } catch (error) {
      next(error)
   }
}

export default {
   getAll,
   getById,
   add,
   updateById,
   deleteById,
}
import { controlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';
import Contact from '../models/Contact.js';

const getAll = async (req, res) => {
   const result = await Contact.find();
   res.json(result);
}

const getById = async (req, res, next) => {
   const result = await Contact.findById(req.params.id);
   console.log('res on get id= ', result)
   if (!result){
      console.log('null -> error 404')
      const err1 = new HttpError(404, `Contact with id=${req.params.id} not found`)
      next(err1)
      console.log('err1= ', err1)
      // next(new HttpError(404, `Contact with id=${req.params.id} not found`));
   } else{      
   console.log('normal res', result)
   res.json(result);
   }
}

const add = async (req, res, next)=>{
   const result = await Contact.create(req.body);
   res.status(201).json(result);
}

const updateById = async (req, res, next)=>{
   const result = await Contact.findByIdAndUpdate(req.params.id, req.body);
   console.log('res on update= ', result)
   if (!result){
      console.log('null -> error 404')
      next(new HttpError(404, `Contacts with id=${req.params.id} not found`));
   };
   console.log('normal res', result)
   res.json(result);
}

const deleteById = async (req, res, next)=>{
   const result = await Contact.findByIdAndDelete(req.params.id);
   console.log('res on del= ', result)
   if (!result){
      console.log('null -> error 404')
      next(new HttpError(404, `Contacts with id=${req.params.id} not found`));
   };
   console.log('normal res', result)
   res.json({message: "contact deleted"});
}

export default {
   getAll: controlWrapper(getAll),
   getById: controlWrapper(getById),
   add: controlWrapper(add),
   updateById: controlWrapper(updateById),
   deleteById: controlWrapper(deleteById),
}
const { type } = require("express/lib/response");
const joi = require("joi");

const types = {};

types.string = ()=>
  joi.string();

types.object = (o)=> 
  joi.object(o);

types.array = (a)=>
  joi.array(a);

types.boolean = ()=>
  joi.boolean();

types.username = ()=> 
  joi.string().min(4).max(12);

types.email = ()=> 
  joi.string().email();

types.password = ()=> 
  joi.string().min(8).max(64);

types.limit = ()=> 
  joi.number().integer();

types.skip = ()=>
  joi.number().integer();

types.objectId = ()=>
  joi.string().length(24).alphanum();

module.exports = types;

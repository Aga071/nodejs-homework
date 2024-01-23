import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .regex(/^\+\d{1,3}\d{6,14}$/)
    .optional(),
});

const shcemaUsers = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export { schema, shcemaUsers };

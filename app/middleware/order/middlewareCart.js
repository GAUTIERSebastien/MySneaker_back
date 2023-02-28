const Joi = require('joi');

const middlewareCart = {

  isvalid(cart) {
    const productSchema = Joi.object({
      id: Joi.string().required(),
      size: Joi.number().required().min(16).max(60),
      quantity: Joi.number().required().min(1).max(10),
    });

    const schema = Joi.array().item(productSchema)
      .min(1)
      .max(100);

    const joiOptions = {
      abortEarly: false,
    };

    const { error, value } = schema.validate(cart, joiOptions);

    if (error) {
      return error;
    }
    return value;
  },

};

module.exports = middlewareCart;

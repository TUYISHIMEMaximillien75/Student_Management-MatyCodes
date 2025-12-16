import Joi from "joi";

export const leaveValSchema = Joi.object({
  description: Joi.string().min(3).required()
});

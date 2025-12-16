import Joi from "joi";

export const attendanceValSchema = Joi.object({
  // user_id ❌ removed
  isPresent: Joi.boolean().required()
});

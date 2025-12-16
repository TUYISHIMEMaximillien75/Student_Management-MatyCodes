import Joi from "joi"
export const attendanceValSchema = Joi.object({
    user_id: Joi.string().required(),
    // isPresent: Joi.boolean().required()
})
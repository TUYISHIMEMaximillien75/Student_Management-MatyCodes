import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateUser = (schema: Joi.ObjectSchema, type: "body" | "query" | "params") => {

    return (req: Request, res: Response, next: NextFunction) => {

        const datatobevalitated = req[type];

        const {error} = schema.validate(datatobevalitated)

        if(error){
            return res.status(400).json({message: error.details[0].message, success: false});
        }
        
        next();
    }
}
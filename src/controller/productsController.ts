import { Request, Response } from "express";
import { Services } from "../services/productService";
import { utils } from "../utils/all";
import { AuthRequest } from "../middleware/auth.middleware";
const services = new Services();
const utls = new utils()
export class Controllers {
    async allProducts(req: Request, res: Response) {
        return res.status(200).json({ message: "well", data: await services.productService() })
    }
    async attendance(req: Request, res: Response) {
        try {
            let { user_id } = req.body;
            console.log("user_id");
            return res.status(200).json({
                message: "well",
                data: await services.attendanceService(user_id),
            });

        } catch (error) {
            console.log(error);
        }
    }
    async leave(req: AuthRequest, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user_id = req.user.id; // ✅ FROM TOKEN

            const result = await services.leaveService(user_id);

            return res.status(200).json({
                message: "Leave updated successfully",
                data: result,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Server error" });
        }
    }

    async setLeave(req: Request, res: Response){
        try {

            let {user_id, description} = req.body;

            return res.status(200).json({message: "Leave requested",data: services.setLeaveService({user_id, description, isPresent: false})})
        } catch (error) {
            console.log(error)
        }
    }

    async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body;
            return res.status(200).json({
                data: await services.loginService(email, password),
            });


        } catch (err) {
            console.log(err)
        }
    }
    async users(req: Request, res: Response) {
        try {
            let { name, email, password } = req.body;

            const newUser = await services.usersService({ name, email, password: utls.hashPassword(password), role: "student" })
            return res.status(200).json({
                message: "well",
                data: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                data: error,
            });
        }
    }
    async usersAdmin(req: Request, res: Response) {
        try {
            let { name, email, password } = req.body;
            const newUser = await services.usersService({ name, email, password: utls.hashPassword(password), role: "admin" })
            return res.status(200).json({
                message: "well",
                data: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal server error",
                data: error,
            });
        }
    }

    async profile(req: AuthRequest, res: Response) {
        return res.status(200).json({
            message: "Access granted",
            user: req.user, // comes from token
        });
    }


}
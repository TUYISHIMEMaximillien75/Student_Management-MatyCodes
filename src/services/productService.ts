import { StudentsModel } from "../models/student";
import { AttendanceModel } from "../models/student";
import { LeaveModel } from "../models/student";
import { UserModel } from "../models/student";
import { UserInterface } from "../types/usertypes";
import { LeaveInterface } from "../types/usertypes";
import { utils } from "../utils/all";
import bcrypt from 'bcrypt';

const tokenutil = new utils();
export class Services {
    async productService() {
        try {
            const allProducts = await StudentsModel.find().lean();
            return allProducts
        } catch (error) {
            return "failed to fetch in services"
        }
    }
    async attendanceService(user_id: string) {
        try {
            console.log("Services respondnig")
            const attendance = await AttendanceModel.create({ user_id: user_id });
            return attendance;
        } catch (error) {
            return "failed to insert attendance in services"

        }
    }
    async leaveService(user_id: string) {
        try {
            const result = await LeaveModel.findOneAndUpdate(
                { user_id }, //conditions
                { isPresent: true }, // new datas
                { new: true, upsert: true } // create if not alrdy exists
            );

            return result;
        } catch (error) {
            console.log(error)
        }
    }
    async loginService(email: string, password: string) {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error("Invalid credentials")
            }

            const correctPassword = await bcrypt.compare(password, user.password);

            if (!correctPassword) {
                throw new Error("Invalid credentials")
            }

            const token = await tokenutil.generateToken(
                user._id.toString(),
                user.role
            );

            const { password: _, ...loggeduser } = user.toObject();
            console.log(loggeduser)
            return {
                user: loggeduser,
                token
            };

        } catch (error) {
            console.log(error)
        }
    }

    // async usersExistService(email:string){
    //     const exist = UserModel.findOne(email);
    //     if(exist){
    //         return true
    //     }
    // }

    async usersService(user: UserInterface) {
        // name:string, email:string, password:string
        try {
            // const newUser = {}
            const addUser = await UserModel.create({ ...user })
            await addUser.save();
            return {
                ...addUser,
                password: undefined,
            };
        } catch (error) {
            console.log(error)
        }
    }

    async setLeaveService(leave:LeaveInterface){
        try {
            
            const newLeave =await LeaveModel.create({...leave});
            await newLeave.save();

            return {
                ...newLeave
            }
        } catch (error) {
            return error
        }
    }
}
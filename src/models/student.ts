import mongoose, { Schema } from "mongoose";

export const StudentsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    class: {
        type: Number,
        required: true
    }
});

export const AttendanceSchema = new Schema({
    user_id: { type: String, required: true }
});

export const LeaveSchema = new Schema({
    user_id: { type: String, required: true },
    description: { type: String, required: true },
    isPresent: {type: Boolean, require: true},
    doneAt: {type: Date, default: Date.now}

});

export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
/// models
export const StudentsModel = mongoose.model("student", StudentsSchema);

export const AttendanceModel = mongoose.model("attendance", AttendanceSchema);

export const LeaveModel = mongoose.model("leave", LeaveSchema);

export const UserModel  = mongoose.model("user", UserSchema )
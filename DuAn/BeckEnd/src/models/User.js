import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String,
        default : "https://i.pinimg.com/736x/07/66/d1/0766d183119ff92920403eb7ae566a85.jpg"
    },
    role:{
        type : String,
        default : "member",
        enum : ["member", "admin"]
    }
}, {versionKey : false, timestamps : true});
export default mongoose.model("User", userSchema);
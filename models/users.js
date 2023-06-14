import mongoose from "mongoose";
import {Schema} from "mongoose";

const user = new Schema({
    username: String,
    email : String,
    password : String,
    pin : String,
    role : String
});

export default mongoose.model("Users", user);
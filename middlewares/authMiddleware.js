import Users from "../models/users.js";
import encrypt from "encryptjs";

export const checkRegister = (req,res,next) =>{
    try{
        const {username, email, password, confirmPassword, pin, role} = req.body;
        if(!username) return res.send("Username is required.");
        if(!email) return res.send("Email is required.");
        if(!password) return res.send("Password is required.");
        if(!confirmPassword) return res.send("Confirm Password is required.");
        if(!pin) return res.send("Pin is required.");
        if(!role) return res.send("Role is required.");
        next();
    }catch(err){
        return res.send(err);
    }
}

export const checkPin = async (req, res, next) =>{
    try{
        const {_id, pin} = req.body;
        if(!_id) return res.send("ID is required.");
        if(!pin) return res.send("Pin is required.");

        const user = await Users.find({_id}).exec();
        if(!user.length) return res.send("User not found.");

        let secretKeyPin = "secretKeyPin";
        const decryptPin = encrypt.decrypt(user[0].pin, secretKeyPin, 256);
        let flag = false;
        if(decryptPin === pin && (user[0].role == "seller" || user[0].role == "admin")){
            flag = true;
        }
        if(flag){
            next();
        }else{
            return res.send("Pin is incorrect or you are not a designated seller.");
        }
    }catch(err){
        return res.send(err);
    }
}
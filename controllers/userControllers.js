import Users from "../models/users.js";
import encrypt from "encryptjs";

export const userRegister = async (req,res) =>{
    try{
        const {username, email, password, confirmPassword, pin, role} = req.body;

        const user = await Users.find({email}).exec();
        if(user.length) return res.send("User is already registered.");

        if(password.length <8 && confirmPassword.length < 8){
            return res.send("Password should be more than 8 characters.");
        }
        if(password !== confirmPassword){
            return res.send("Passwords do not match.");
        }
        let secretKeyPass = "secretKeyPass";
        const encryptPass = encrypt.encrypt(password, secretKeyPass, 256);
        let secretKeyPin = "secretKeyPin";
        const encryptPin = encrypt.encrypt(pin, secretKeyPin, 256);
        const newUser = new Users({
            username,
            email,
            password : encryptPass,
            pin : encryptPin,
            role
        });
        await newUser.save();
        return res.send("You have registered successfully.");
    }catch(err){
        return res.send(err);
    }
}
import User from "../models/user.model.js"
import urlSchema from "../models/shorturl.model.js";

export const findByEmail = async(email)=>{
    return await User.findOne({email:email})      
}
export const findById = async(id)=>{
    return await User.findById(id);

}

export const createUser = async(username,email,password)=>{
    const newUser = new User({
        username:username,
        email:email,
        password:password
    })
     await newUser.save();
     return newUser;
}

        

export const getCustomShortUrl = async (slug) => {
    return await urlSchema.findOne({short_url:slug});
}

export const getUserUrls = async(userId)=>{
    return await urlSchema.find({user:userId}); 
}
import authModel from '../models/authModel.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userRegistration = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const isUser = await authModel.findOne({email: email});
      if(isUser){
        return res.status(400).json({message: "User Already Exist" });
      }
      else{
        //Password Hashing
        const genSalt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, genSalt);

        //save the user
        const newUser = authModel({
          name,
          email,
          password: hashedPassword,
        })
        const resUser = await newUser.save();
        if(resUser){
          return res.status(201).json({message: "Registered Successfully", user: resUser})
        }
      }
    } catch (error) {
      return res.status(400).json({message: error.message });
    }
};

const userLogin = async(req, res) =>{
  const { email, password } = req.body;
  try {
    const isUser = await authModel.findOne({ email: email})
    if(isUser){
      if(email === isUser.email && (await bcryptjs.compare(password, isUser.password))){
        
        const token = jwt.sign({userID: isUser._id}, "helloIamACoder", {expiresIn: "2d"});
        
        return res.status(200).json({message: "Login Successfully", token, name: isUser.name})
      }
      else{
        return res.status(400).json({message: "Invalid Credentials!!" });
      }
    }
    else{
      return res.status(400).json({message: "User Not Registered!!" });
    }
  } catch (error) {
    return res.status(400).json({message: error.message });
  }
};

export default { userRegistration , userLogin};
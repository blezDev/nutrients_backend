const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NUTRIENTKEY";

const signup = async (req,res)=>{

    const {name,email, password} = req.body;

    const existingUser = await  userModel.findOne({email : email});

    if (existingUser){
        return res.status(400).json({message:"User already exists."});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const result = await userModel.create({
        name : name,
        email : email,
        password : hashedPassword
    });
    const token = jwt.sign({email : result.email, id : result._id }, SECRET_KEY);
    res.status(200).json({user : result,token : token});

    try{}
    catch (e) {
        console.log(e);
        res.status(500).json({message: "Something went wrong  "+ e});
    }
};

const signin = async (req,res)=>{
  try{
      const {email,password} = req.body;
      const existingUser = await userModel.findOne({email : email});
      if (!existingUser){
          return res.status(404).json({message: "User not found"});
      }
      const matchingPassword = await bcrypt.compare(password,existingUser.password);
      if (!matchingPassword){
          return res.status(401).json({message : "Invalid Credentials"});
      }
      const token = jwt.sign({email : existingUser.email,id : existingUser._id},SECRET_KEY);
      res.status(200).json({message : "login success",token : token});
  }
  catch (e) {
      console.log(error);
      res.status(500).json({message: "Something went wrong  "+ error});
  }  
};
module.exports = {signup,signin}
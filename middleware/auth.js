const jwt = require("jsonwebtoken");
const SECRET_KEY = "NUTRIENTKEY";

const auth = (req,res,next)=>{
    try{
        let token = req.body.token;
        if (token){
            jwt.verify(token,SECRET_KEY,(error,data)=>{
                if (error){
                    res.status(401).json({
                        message:'session expired.',
                    });
                }
                req.user = data;
            });
        }
        else{
            return res.status(401).json({message: "Unauthorized User"});
        }
    }
    catch (e) {
        console.log(error);
        res.status(500).json({message: "Unauthorized User"});
    }
};

module.exports = auth;
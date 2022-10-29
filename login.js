const express=require('express');
const cookieParser = require('cookie-parser')
const Joi=require('joi'); 
const registerUser=require('./model/register'); 
const jwt=require('jsonwebtoken');

const router=express.Router(); 


const loginJoiSchema={
    email:Joi.string().min(5).max(20).required(),
    password:Joi.string().min(5).max(20).required()
};


router.post('/',async(req,res)=>{
    const {error}=validateLogin(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    } 

    try{
        var user=await registerUser.findOne({email:req.body.email,password:req.body.password});
        if(!user){
            return res.status(400).send('INVALID USERNAME OR PASSWORD') ;
        } 
        else{

            // res.cookie('username',`${user.username}`);
            // res.cookie('email',`${user.email}`); 

            const token=jwt.sign({user},'jwtprivatekey');
            res.header('x-auth',`username=${user.username}, email=${user.email}`); 
            res.header('x-token-jwt',token);
        // this part is for the integration team, 
        //please add the successful login file as the response 

        return res.status(200).send('User Logged In');

        }

    }
    catch(err){
        return res.status(500).send('INTERNAL SERVER ERROR');
    }
})




function validateLogin(user)
{
    return Joi.validate(user,loginJoiSchema);
}


module.exports=router;
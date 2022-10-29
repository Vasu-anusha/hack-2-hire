const express=require('express');
const Joi=require('joi');
const registerUser=require('./model/register');


const router=express.Router(); 


const registerJoiSchema={
    username:Joi.string().min(5).max(20).required(),
    email:Joi.string().min(5).max(20).required(),
    phone:Joi.string().min(5).max(20).required(),
    password:Joi.string().min(5).max(20).required(),
    confirm_password:Joi.string().min(5).max(20).required()
}



router.post('/',async(req,res)=>{

    const {error}=validateRegister(req.body); 
    if(error){
        return res.status(400).send(error.details[0].message);
    } 

    if(req.body.password!=req.body.confirm_password){
        return res.status(400).send('password and confirm password are not same');
    } 

    try{
        const user=await registerUser.findOne({email:req.body.email});
        if(user){
            return res.status(400).send('USER ALREADY REGISTER WITH THE GIVEN EMAIL');
        } 
        else{

            const newUser=new registerUser({
         username:req.body.username,
         email:req.body.email,
         password:req.body.password,
         confirm_password:req.body.confirm_password
            });

            newUser.save(); 


         return res.status(200).send('User successfully registered');

            // This is the part of integration team
            // please add the successfully logged in message as the html file


        }

    }
    catch(err){
        return res.status(500).send('INTERNAL ERROR');
    }

})


function validateRegister(user)
{
    return Joi.validate(user,registerJoiSchema);
}



module.exports=router;

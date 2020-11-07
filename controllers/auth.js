const { response } = require("express");
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");


const createUser = async (req,res = response)=>{

    const {email, password} = req.body;

    try{
        const existsEmail = await User.findOne({email});

        if(existsEmail){
            return res.status(400).json({
                ok: false,
                message:'Registered email'
            })
        }

        const user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id);
    
        res.json({
            ok: true,
            user,
            token
        });
    }catch(error){
        res.status(500).json({
            ok:false,
            message:'talk to the administrator'
        });
    }
}

const loginUser = async (req, res = response) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                ok:false,
                message:'Email not found'
            });
        }

        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                message:'Invalid password'
            });
        }

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'talk to the administrator'
        })
    }
}

const renewToken = async (req,res = response)=>{

    const user = await User.findById(req.uid);
    const token = await generateJWT(user.id);

    res.json({
        ok: true,
        user,
        token
    });

}

module.exports = {
    createUser,
    loginUser,
    renewToken
}
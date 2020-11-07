const { response } = require('express');
const User = require('../models/user');

const getUsers = async (req, res = response) =>{

    try {
        const from = Number(req.query.from) || 0;
        const users = await User
                    .find({_id: {$ne: req.uid}})
                    .sort('-online')
                    .skip(from)
                    .limit(20);
                    

        res.json({
            ok: true,
            users: users
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }

}

module.exports = {
    getUsers
}
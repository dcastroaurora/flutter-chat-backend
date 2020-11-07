const { response } = require("express");
const Message = require('../models/message');

const getMessages = async(req, res = response)=>{
    try {
        const meUid = req.uid;
        const fromUid = req.params.from;
        const messages = await Message.find({
            $or:[{from: meUid, to: fromUid},{from: fromUid, to: meUid}]
        })
        .sort({createdAt: 'asc'})
        .limit(30);

        res.json({
            ok: true,
            messages
        });
    } catch (error) {
        res.status(500).json({
            ok:false,
            message: 'Internal server error'
        });
    }
}

module.exports = {
    getMessages
}
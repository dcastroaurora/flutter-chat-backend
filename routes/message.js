
const { Router } = require("express");
const { getMessages } = require("../controllers/message");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/:from', validateJWT, getMessages);


module.exports = router;
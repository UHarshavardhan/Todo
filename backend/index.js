const express = require("express");
const { signUp,LogIn}=require('./src/controllers/auth');

const router = express.Router();


router.post("/api/v1/login",LogIn)
router.post("/api/v1/signup",signUp)

module.exports=router;
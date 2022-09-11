const jwt = require("jsonwebtoken");
const User_Model = require("../database/connect.js");
require("dotenv").config({});

const requireAuth = (req,res,next) => {
	const token = req.cookies.user_auth;
	if(token){
		jwt.verify(token, process.env.JWT_SECRECT_KEY, (err,decoded) => {
			if(err){
				res.status(401).json({status: "unAuthorized", redirect: true})
			}
			else{
				res.locals.user = decoded.user_id
				next();
			}
		})
	}
	else{
		res.status(401).json({status: "unAuthorized", redirect: true})
	}
}

module.exports = {requireAuth}
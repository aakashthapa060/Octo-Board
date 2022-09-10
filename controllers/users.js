const User_Model = require("../database/connect.js");
const create_token = require("../utils/createJWT_token.js");
const hashPassword = require("../utils/hashPassword.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({});

const {
	authErrorHandler,
	loginCredential_ErrorHandler
} = require("../utils/ErrorHandler.js");


const get_user = async (req,res) => {
	const token = req.cookies.user_auth;
	const QUERY = "SELECT user_name FROM users WHERE user_id = $1";
	const values = []
	let user = null;
	try {
		if(token) {
			jwt.verify(token, process.env.JWT_SECRECT_KEY, async (err,decoded) => {
				if(err){
					res.status(400).json({status: "Not Authenticated"})
				}
				else{
					console.log(decoded)
					values.push(decoded.user_id)
					user = await User_Model.query(QUERY,values);
					res.status(200).json({user:user.rows})
				}
			})
		}
	} catch(e) {
		user = null;
		res.status(400).json({status: "Not Authenticated"})
	}
}
const MAX_AGE = 60 * 60 * 24;

const create_user = async (req,res) => {
	let QUERY = "INSERT INTO users(user_id,first_name,last_name,user_name,email,password, gender) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6) RETURNING *;"
	const user_value = req.body;
	const values = [
		user_value.first_name,
		user_value.last_name,
		user_value.user_name,
		user_value.email,
		user_value.password,
		user_value.gender
	];
	try {
		values[4] = await hashPassword(values[4]);
		const user = await User_Model.query(QUERY, values);
		console.log(user.rows[0].user_id)
		const token = create_token(user.rows[0].user_id,MAX_AGE);
		res.cookie("user_auth", token, {httpOnly: true, maxAge: MAX_AGE * 1000});
		res.status(201).json({user:user.rows[0]});
	} catch(e) {
		const errors = authErrorHandler(e);
		res.status(400).json({errors})
	}
}

const authenticate_user = async (req,res) => {
	let QUERY = "SELECT user_id,email,password FROM users WHERE email = $1";
	const values = [req.body.email];
	try {
		const user = await User_Model.query(QUERY, values);

		// Throwing an Error If The Email is Not Registered
		if(!user.rows.length) throw Error("EMAIL NOT REGISTERED");
		const password = req.body.password;
		const validate = await bcrypt.compare(password, user.rows[0].password);

		// Throwing an Error If The Password didn't match
		if(!validate) throw Error("PASSWORD NOT MATCH");
		const token = create_token(user.rows[0].user_id,MAX_AGE);
		res.cookie("user_auth", token, {httpOnly: true, maxAge: MAX_AGE * 1000});
		res.status(200).json({message: "Success"})

	} catch(e) {
		const errors = loginCredential_ErrorHandler(e);
		res.status(400).json({errors})
	}
}

const logout_user = async(req,res) => {
	res.cookie("user_auth", "",{max_age: 1});
	res.redirect("/")
}

module.exports = {
	get_user,
	create_user,
	authenticate_user,
	logout_user
}
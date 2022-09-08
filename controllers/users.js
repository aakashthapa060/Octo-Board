const User_Model = require("../database/connect.js");
const create_token = require("../utils/createJWT_token.js");
const {
	authErrorHandler
} = require("../utils/ErrorHandler.js");


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
		const user = await User_Model.query(QUERY, values)
		const token = create_token(user.user_id,MAX_AGE);
		res.cookie("user_auth", token, {httpOnly: true, max_age: MAX_AGE});
		res.status(201).json({user:user.rows[0]});
	} catch(e) {
		const errors = authErrorHandler(e);
		res.status(400).json({errors})
	}
}
module.exports = {
	create_user
}
const jwt = require("jsonwebtoken");
require("dotenv").config({});

const JWT_SECRECT = process.env.JWT_SECRECT_KEY;
const create_token = (user_id, max_age) => {
	const token = jwt.sign({id:user_id}, JWT_SECRECT, {expiresIn: max_age})
	return token;
}

module.exports = create_token
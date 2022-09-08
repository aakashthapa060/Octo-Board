
const authErrorHandler = (e) => {
	console.log(e.message)
	const errors = {
		"username": "",
		"email": "",
	}
	if(e.message.includes("users_user_name_key")){
		errors.username = "Username Already Exists"
	}
	if(e.message.includes("users_email_key")){
		errors.email = "Email Already Exists"
	}
	return errors
}

module.exports = {
	authErrorHandler
}

const authErrorHandler = (e) => {
	console.log(e.message)
	const errors = {
		"username": "",
		"email": "",
	}
	if(e.message.includes("users_user_name_key")) errors.username = "Username Already Exists"
	if(e.message.includes("users_email_key")) errors.email = "Email Already Exists"
	return errors;
}

const loginCredential_ErrorHandler = (e) => {
	console.log(e.message)
	const errors = {
		"email": "",
		"password": ""
	}
	if(e.message.includes("EMAIL NOT REGISTERED")) errors.email = "Email is not Registered"
	if(e.message.includes("PASSWORD NOT MATCH")) errors.password = "User Credentials didn't Match"
	return errors;
}

module.exports = {
	authErrorHandler,
	loginCredential_ErrorHandler
}
const {Router} = require("express");
const router = Router();
const {
	get_user,
	create_user,
	authenticate_user,
	logout_user
} = require("../controllers/users");

router.route("/user").get(get_user)
router.route("/create-user").post(create_user)
router.route("/authenticate-user").post(authenticate_user)
router.route("/logout-user").post(logout_user)


module.exports = router
const {Router} = require("express");
const router = Router();
const {
	create_user
} = require("../controllers/users");

router.route("/user").get();
router.route("/create-user").post(create_user)
router.route("/authenticate-user").post()

module.exports = router
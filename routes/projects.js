const {Router} = require("express");
const router = Router();
const {
	get_all_projects,
	create_project,
} = require("../controllers/projects.js");

router.route("/projects").get(get_all_projects);
router.route("/create-project").post(create_project);
// router.route("/authenticate-user").post(authenticate_user)
// router.route("/logout-user").post(logout_user)


module.exports = router
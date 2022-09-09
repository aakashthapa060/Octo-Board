const Project_Model = require("../database/connect.js");

const create_project = async (req,res) => {
	let QUERY = "INSERT INTO projects (project_id, project_name, project_description, project_status, superuser_uuid) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *";
	const project_value = req.body;
	const values = [
		project_value.project_name,
		project_value.project_description,
		project_value.project_status,
		project_value.superuser_uuid
	]
	try {
		const project = await Project_Model.query(QUERY, values);
		res.status(201).json({project: project.rows[0]})
	} catch(e) {
		// statements
		console.log(e);
	}
}



module.exports = {
	create_project
}
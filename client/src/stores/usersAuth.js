import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const userStore = defineStore("user", () => {
	const user = ref("");
	const isAuthenticated = ref(false); 
	
	async function getUser () {
		const user_uri = "http://localhost:3000/api/v1/users/user";
		try {
			const response = await fetch(user_uri, {
				method: "GET",
				credentials:"include"
			});
			const data = response.json();
			return data;
		} catch(e) {
			// statements
			console.log(e);
		}
	}

	function checkUser(){
		getUser()
		.then(res => {
			console.log(res)
			user.value = res.user[0].user_name
			if(res.user){
				isAuthenticated.value = true
			}
			else{
				isAuthenticated.value = false
			}
		})
	}


	return {user,isAuthenticated,checkUser}
})
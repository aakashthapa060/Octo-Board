<script setup>
import AuthContainerForm from "../components/AuthContainerForm.vue";
import ErrorText from "../components/ErrorComponents/ErrorText.vue";

import { ref, reactive } from "vue";

const header_data = ref({
  title: "Sign up",
  des: "Start your journey with us.",
});
const user_data = reactive({
	firstname: "",
	lastname: "",
	username: "",
  email: "",
  password: "",
  gender: ""
});

const errors = reactive({
  username: "",
  email: "",
});
const create_user = async () => {
	const register_uri = "http://localhost:3000/api/v1/users/create-user";
	try {
		const response = await fetch(register_uri, {
	      method: "POST",
	      mode: "cors",
	      headers: {
	        "Content-Type": "application/json",
	      },
	      credentials: "include",
	      body: JSON.stringify({
	      	"first_name": user_data.firstname,
	      	"last_name": user_data.lastname,
	      	"user_name": user_data.username,
	        email: user_data.email,
	        password: user_data.password,
	        gender: user_data.gender
	      }),
		})
		const data = await response.json();
		if(data.errors){
			errors.username = data.errors.username;
			errors.email = data.errors.email;
		}
		else{
			window.location.href = "/";
		}
	} catch(e) {
		// statements
		console.log(e);
	}
}
</script>

<template>
  <AuthContainerForm :title="header_data.title" :des="header_data.des">
    <form class="form">
      <div class="form-group-row">
        <div class="form-group">
          <label for="email">First Name</label>
          <input
          required
            type="text"
            name="firstname"
            placeholder="First Name"
            id="First Name"
            v-model="user_data.firstname"
          />
        </div>
        <div class="form-group">
          <label for="lastname">Last Name</label>
          <input

          required
            type="text"
            name="lastname"
            placeholder="Last Name"
            id="lastname"
            v-model="user_data.lastname"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input
        required
          type="text"
          name="username"
          placeholder="Username"
          id="username"
            v-model="user_data.username"

        />
        <ErrorText v-if="errors.username" :errorMessage="errors.username" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
        required
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          v-model="user_data.email"
        />
        <ErrorText v-if="errors.email" :errorMessage="errors.email" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
        required
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          v-model="user_data.password"
        />
        <ErrorText v-if="errors.password" :errorMessage="errors.password" />
      </div>
      <div class="form-group">
      	<label for="gender">Gender</label>
      	<select name="gender" id="gender" v-model = "user_data.gender">
      		<option value="M" selected>Male</option>
      		<option value="F">Female</option>
      		<option value="O">Others</option>

      	</select>
      </div>
      <button @click.prevent="create_user">Sign In</button>
    </form>
    <div class="help-text">
      <p>Already have an account? <a>Sign in</a></p>
    </div>
  </AuthContainerForm>
</template>

<style lang="scss" scoped></style>

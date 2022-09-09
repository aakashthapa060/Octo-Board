<script setup>
import AuthContainerForm from "../components/AuthContainerForm.vue";
import {ref,reactive,onMounted} from 'vue';

const header_data = ref({
	title: "Welcome back",
	des: "Welcome Back! Please enter your details."
})

const user_data = reactive({
	"email": "",
	"password": ""
})
const authenticate_user = async () => {
	const login_uri = "http://localhost:3000/api/v1/users/authenticate-user";
	try {
		const response = await fetch(login_uri, {
			method: "POST",
			headers: {
				'Content-Type': "application/json"
			},
			mode: "cors",
			credentails: 'include',
			body: JSON.stringify({email:user_data.email,password:user_data.password})
		})
	} catch(e) {
		// statements
		console.log(e);
	}
}


</script>

<template>
  <AuthContainerForm :title="header_data.title" :des="header_data.des">
    <form class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" placeholder="Email" id="email" v-model="user_data.email"/>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          v-model="user_data.password"
        />
      </div>
      <button @click.prevent="authenticate_user">Sign In</button>
    </form>
    <div class="help-text">
      <p>Don't have an account? <a>Sign up</a></p>
    </div>
  </AuthContainerForm>
</template>

<style scoped lang="scss">
.form {
  width: 100%;
  margin-bottom: 40px;

  .form-group {
    width: 100%;
    margin-bottom: 20px;
    label {
      display: block;
      font-size: 18px;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      height: 40px;
      padding: 10px;
      border-radius: 5px;
      outline: none;
      border: 1px solid $primary-black;
    }
    &:nth-child(2) {
      margin-bottom: 50px;
    }
  }

  button {
    width: 100%;
    height: 40px;
    background: $primary-black;
    color: $primary-white;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
  }
}
.help-text {
  text-align: center;
  p {
    color: gray;
    a {
      cursor: pointer;

      color: $primary-black;
      font-weight: bold;
      font-family: $font-two;
    }
  }
}
</style>

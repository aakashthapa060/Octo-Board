<script setup>
import AuthContainerForm from "../components/AuthContainerForm.vue";
import ErrorText from "../components/ErrorComponents/ErrorText.vue";
import { ref, reactive } from "vue";

const header_data = ref({
  title: "Welcome back",
  des: "Welcome Back! Please enter your details.",
});

const user_data = reactive({
  email: "",
  password: "",
});

const errors = reactive({
  email: "",
  password: "",
});
const authenticate_user = async () => {
  const login_uri = "http://localhost:3000/api/v1/users/authenticate-user";
  try {
    const response = await fetch(login_uri, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: user_data.email,
        password: user_data.password,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      errors.email = data.errors.email;
      errors.password = data.errors.password;
    } else {
      window.location.href = "/";
    }
  } catch (e) {
    // statements
    console.log(e);
  }
};
</script>

<template>
  <AuthContainerForm :title="header_data.title" :des="header_data.des">
    <form class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
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
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          v-model="user_data.password"
        />
        <ErrorText v-if="errors.password" :errorMessage="errors.password" />
      </div>
      <button @click.prevent="authenticate_user">Sign In</button>
    </form>
    <div class="help-text">
      <p>Don't have an account? <a>Sign up</a></p>
    </div>
  </AuthContainerForm>
</template>

<style scoped lang="scss"></style>

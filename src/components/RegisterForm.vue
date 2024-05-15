<template>
    <div class="container my-5">
      <div class="container shadow p-3 mb-5 bg-body-tertiary rounded">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" v-model="registerForm.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" v-model="registerForm.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" v-model="registerForm.password" required>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Register</button>
          <router-link to="/" class="btn btn-link mt-3">Login</router-link>
        </form>
      </div>
    </div>
</template>
  
<script>
  import axios from 'redaxios';

  export default {
    data() {
      return {
        registerForm: {
          name: '',
          email: '',
          password: ''
        }
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://api_2105551050.local.net/api/register', this.registerForm);
          // Logika untuk penanganan respons dari API
          if (response.data.success) {
            // Jika login sukses, arahkan ke halaman dashboard
            this.$router.push('/');
          } else {
            // Jika login gagal, tampilkan notifikasi
            this.loginFailed = true;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: auto;
  }
  </style>
  
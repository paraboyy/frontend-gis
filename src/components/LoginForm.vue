<template>
  <div>
    <div class="container my-5">
      <div class="container shadow p-3 mb-5 mb-5 bg-body-tertiary rounded">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" class="form-control" id="email" v-model="loginForm.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" class="form-control" id="password" v-model="loginForm.password" required>
          </div>
          <button type="submit" class="btn btn-primary mt-3">Login</button>
          <router-link to="/register" class="btn btn-link mt-3">Register</router-link>
        </form>
        <div v-if="loginFailed" class="alert alert-primary mt-3" role="alert">
          Login Gagal. Cek lagi Email dan Password anda.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'redaxios';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      loginFailed: false, // Untuk menampilkan notifikasi jika login gagal
      passwordTooShort: false 
    };
  },
  methods: {
    async login() {
      try {
        // Validasi formulir sebelum mengirim permintaan
        if (!this.loginForm.email || !this.loginForm.password || this.loginForm.password.length < 8) {
          if (this.loginForm.password.length < 8) {
            this.passwordTooShort = true;
            return;
          } else {
            this.passwordTooShort = false;
          }
          this.loginFailed = true;
          return;
        }

        const response = await axios.post('http://api_2105551050.local.net/api/login', this.loginForm);
        // Logika untuk penanganan respons dari API
        if (response.data.success) {
          const Token = response.data.data.token;
          localStorage.setItem('token', Token);
          this.$router.push('/dashboard');
        } else {
          // Jika login gagal, tampilkan notifikasi
          this.loginFailed = true;
        }
      } catch (error) {
        console.error(error);
        this.loginFailed = true;
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

.background-container {
  /* Atur ukuran dan posisi background */
  width: 100%;
  height: 50rem;
  background-image: url('../assets/Maps.jpg'); /* Path ke gambar background */
  background-size: cover; /* Sesuaikan ukuran gambar agar selalu menutupi area */
  background-position: center; /* Posisikan gambar di tengah */
  /* Tambahan gaya CSS lainnya jika diperlukan */
}
</style>
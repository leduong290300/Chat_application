<template>
  <div>
    <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
    <form>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputUsername"
          placeholder="myusername"
          required
          autofocus
        />
        <label for="floatingInputUsername">Username</label>
      </div>

      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInputEmail"
          placeholder="name@example.com"
        />
        <label for="floatingInputEmail">Email address</label>
      </div>

      <hr />

      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="floatingPasswordConfirm"
          placeholder="Confirm Password"
        />
        <label for="floatingPasswordConfirm">Confirm Password</label>
      </div>

      <div class="d-grid mb-2">
        <b-button size="lg" variant="outline-primary">
          Register Account</b-button
        >
      </div>

      <div class="login-link">
        Have an account?
        <router-link class="d-block text-center small" to="/login"
          >Login</router-link
        >
      </div>

      <hr class="my-4" />
    </form>
  </div>
</template>
<script>
export default {
  name: "FormRegister",
};
</script>

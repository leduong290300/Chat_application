<template>
  <div>
    <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
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

      <div class="d-grid mb-2">
        <b-button variant="outline-primary" size="lg"> Login</b-button>
      </div>
      <div class="register-link">
        Don't have an account?
        <router-link class="d-block text-center small" to="/register"
          >Register Here</router-link
        >
      </div>
      <hr class="my-4" />
    </form>
  </div>
</template>
<script>
export default {
  name: "FormLogin",
};
</script>

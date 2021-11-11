<template>
  <div>
    <h5 class="card-title text-center mb-5 fw-light fs-5">Đăng nhập</h5>
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
        <label for="floatingInputUsername">Tên đăng nhập</label>
      </div>

      <hr />

      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
        <label for="floatingPassword">Mật khẩu</label>
      </div>

      <div class="d-grid mb-2">
        <b-button variant="outline-primary" size="lg"> Đăng nhập</b-button>
      </div>
      <div class="register-link">
        Bạn chưa có tài khoản?
        <router-link class="d-block text-center small" to="/register"
          >Đăng kí tại đây</router-link
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

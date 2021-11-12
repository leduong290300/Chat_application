<template>
  <div>
    <h5 class="card-title text-center mb-5 fw-light fs-5">Đăng nhập</h5>
    <b-alert v-model="hasErrors" variant="danger">
      <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </b-alert>
    <b-form>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          v-model.trim="forms.email"
          required
          autofocus
        />
        <label for="floatingInputUsername">Email</label>
      </div>

      <hr />

      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          v-model.trim="forms.password"
        />
        <label for="floatingPassword">Mật khẩu</label>
      </div>

      <div class="d-grid mb-2">
        <b-button variant="outline-primary" size="lg" v-on:click="loginAccount">
          Đăng nhập</b-button
        >
      </div>
      <div class="register-link">
        Bạn chưa có tài khoản?
        <router-link class="d-block text-center small" to="/register"
          >Đăng kí tại đây</router-link
        >
      </div>
      <hr class="my-4" />
    </b-form>
  </div>
</template>
<script>
import {
  signInWithEmailAndPassword,
  authentication,
} from "../../firebase/config";
export default {
  name: "FormLogin",
  data() {
    return {
      forms: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  methods: {
    loginAccount() {
      this.errors = [];
      if (this.isFormValid()) {
        signInWithEmailAndPassword(
          authentication,
          this.forms.email,
          this.forms.password,
        )
          .then((UserCredentialImpl) => {
            const user = UserCredentialImpl.user;

            if (user) {
              this.$store.dispatch("setUser", user);
              this.$router.push({ name: "Home" });
            }
          })
          .catch((error) => {
            if (error.code === "auth/user-not-found") {
              this.errors.push("Tài khoản chưa tồn tại");
            }
            if (error.code === "auth/wrong-password") {
              this.errors.push("Mật khẩu không đúng");
            }
          });
      }
    },
    // Kiểm tra thông tin các trường
    isEmpty() {
      if (this.forms.email.length == 0 || this.forms.password.length == 0) {
        return true;
      }
      return false;
    },
    // Kiểm tra trường mật khẩu
    passwordValid() {
      if (this.forms.password.length < 6) {
        return false;
      }
      return true;
    },
    // Kiểm tra địa chỉ email
    validateEmail() {
      const regex =
        /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
      const regexEmail = regex.test(this.forms.email);
      if (regexEmail) {
        return false;
      }
      return true;
    },
    isFormValid() {
      if (this.isEmpty()) {
        this.errors.push("Vui lòng kiểm tra các trường");
        return false;
      }
      if (!this.passwordValid()) {
        this.errors.push("Mật khẩu không được ít hơn 6 kí tự");
        return false;
      }
      if (this.validateEmail()) {
        this.errors.push("Email không hợp lệ");
        return false;
      }
      return true;
    },
  },
};
</script>

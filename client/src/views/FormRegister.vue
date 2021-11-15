<template>
  <div>
    <h5 class="card-title text-center mb-5 fw-light fs-5">Đăng kí tài khoản</h5>
    <b-alert v-model="hasErrors" variant="danger">
      <span v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </b-alert>
    <b-form>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInputUsername"
          name="username"
          required
          autofocus
          v-model.trim="forms.username"
        />
        <label for="floatingInputUsername">Tên đăng nhập</label>
      </div>

      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInputEmail"
          name="email"
          v-model.trim="forms.email"
        />
        <label for="floatingInputEmail">Email</label>
      </div>

      <hr />

      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          name="password"
          v-model.trim="forms.password"
        />
        <label for="floatingPassword">Mật khẩu</label>
      </div>

      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="floatingPasswordConfirm"
          name="password_confirmation"
          v-model.trim="forms.password_confirmation"
        />
        <label for="floatingPasswordConfirm">Nhập lại mật khẩu</label>
      </div>

      <div class="d-grid mb-2">
        <b-button
          size="lg"
          variant="outline-primary"
          v-on:click="registerAccount"
        >
          Đăng kí</b-button
        >
      </div>

      <div class="login-link">
        Bạn đã có tài khoản?
        <router-link class="d-block text-center small" to="/login"
          >Đăng nhập</router-link
        >
      </div>

      <hr class="my-4" />
    </b-form>
  </div>
</template>
<script>
import {
  createUserWithEmailAndPassword,
  authentication,
  database,
  updateProfile,
  ref,
  set,
} from "../../firebase/config";

import md5 from "md5";
export default {
  name: "FormRegister",
  data() {
    return {
      forms: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  // Hàm hasErrors sẽ được gọi khi mảng errors thay đổi
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  methods: {
    registerAccount() {
      this.errors = [];

      if (this.isFormValid()) {
        createUserWithEmailAndPassword(
          authentication,
          this.forms.email,
          this.forms.password,
        )
          .then((UserCredentialImpl) => {
            const user = UserCredentialImpl.user;
            updateProfile(user, {
              displayName: this.forms.username,
              photoURL:
                "http://www.gravatar.com/avatar/" +
                md5(user.email) +
                "?d=identicon",
            }).then(() => {
              set(ref(database, "users/" + user.uid), {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
              });
              this.$store.dispatch("setUser", user);
              this.$router.push("/login");
            });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              this.errors.push(
                "Email đã được sử dụng.Vui lòng chọn email khác!",
              );
            }
          });
      }
    },
    // Kiểm tra độ dài các trường
    isEmpty() {
      if (
        this.forms.username.length == 0 ||
        this.forms.email.length == 0 ||
        this.forms.password.length == 0 ||
        this.forms.password_confirmation.length == 0
      ) {
        return true;
      }
      return false;
    },
    // Kiểm tra mật khẩu người dùng nhập vào
    passwordValid() {
      if (
        this.forms.password.length < 6 ||
        this.forms.password_confirmation.length < 6
      ) {
        return false;
      }

      return true;
    },
    // Kiểm tra mật khẩu nhập lại
    passwordConfirm() {
      if (this.forms.password_confirmation !== this.forms.password) {
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
    // Xác thực form
    isFormValid() {
      if (this.isEmpty()) {
        this.errors.push("Vui lòng kiểm tra các trường!");
        return false;
      }
      if (!this.passwordValid()) {
        this.errors.push("Mật khẩu không được ít hơn 6 kí tự ");
        return false;
      }
      if (!this.passwordConfirm()) {
        this.errors.push("Mật khầu nhập lại không đúng");
        return false;
      }
      if (this.validateEmail()) {
        this.errors.push("Địa chỉ email không hợp lệ");
        return false;
      }
      return true;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div
          class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden"
        >
          <div class="card-img-left d-none d-md-flex">
            <!-- Background image for card set in CSS! -->
          </div>
          <div class="card-body p-4 p-sm-5">
            <router-view></router-view>
            <div class="d-grid mb-2">
              <b-button size="sm" class="btn-google btn-login">
                <b-icon icon="google"></b-icon> Đăng nhập với Google</b-button
              >
            </div>

            <div class="d-grid">
              <b-button
                size="sm"
                class="btn-facebook btn-login"
                v-on:click="loginWithFacebook"
              >
                <b-icon icon="facebook"></b-icon>
                Đăng nhập với Facebook</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO Others
import {
  FacebookAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { authentication, databaseCloudStore } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
export default {
  name: "Form",
  methods: {
    // MODULE: Login facebook
    loginWithFacebook() {
      const providerFacebook = new FacebookAuthProvider();
      signInWithPopup(authentication, providerFacebook)
        .then((result) => {
          const newUser = getAdditionalUserInfo(result);
          const dataUser = result.user;
          if (newUser.isNewUser) {
            addDoc(collection(databaseCloudStore, "usersFB"), {
              displayName: dataUser.displayName,
              email: dataUser.email,
              photoURL: dataUser.photoURL,
              uid: dataUser.uid,
              provider: newUser.providerId,
            });
          }
          this.$store.dispatch("setUser", dataUser);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.card-img-left {
  width: 45%;
  /* Link to your background image using in the property below! */
  background: scroll center
    url("https://source.unsplash.com/WEQbe2jBg40/414x512");
  background-size: cover;
}

.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}

.btn-google {
  color: white !important;
  background-color: #ea4335 !important;
}

.btn-facebook {
  color: white !important;
  background-color: #3b5998 !important;
}
.register-link,
.login-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.register-link a,
.login-link a {
  text-decoration: none;
  /* color: #333; */
}
.register-link a :hover,
.login-link a:hover {
  cursor: pointer;
}
</style>

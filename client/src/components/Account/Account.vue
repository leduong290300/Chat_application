<template>
  <b-row id="header">
    <b-col sm="6" xs="6">
      <b-avatar
        size="3rem"
        variant="info"
        :src="currentUser.photoURL"
      ></b-avatar>
      <span class="header-username">{{ currentUser.displayName }}</span>
    </b-col>
    <b-col sm="6" xs="6" class="header-button">
      <b-row class="header-option">
        <b-col sm="2" xs="2">
          <b-icon
            class="add-contact"
            icon="person-plus"
            v-b-tooltip.hover
            title="Thêm liên hệ"
          ></b-icon>
        </b-col>
        <b-col sm="2" xs="2">
          <b-icon
            class="add-group"
            icon="bookmark-plus"
            v-b-tooltip.hover
            title="Thêm nhóm chat"
            v-b-modal.modal-create-room
          ></b-icon>
          <CreateRoom />
        </b-col>
        <b-col sm="2" xs="2">
          <b-icon
            class="btn-logout"
            icon="power"
            v-b-tooltip.hover
            title="Đăng xuất"
            v-on:click="logOutAccount"
          ></b-icon>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
// TODO:Import componenet
import CreateRoom from "../Modal/CreateRoom.vue";
import { signOut, authentication } from "../../../firebase/config";
import { mapGetters } from "vuex";
export default {
  name: "Account",

  components: { CreateRoom },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    // Đăng xuất tài khoản
    logOutAccount() {
      signOut(authentication)
        .then(() => {
          this.$store.dispatch("setUser", null);
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
#slidebar #header {
  padding: 10px 16px 10px 15px;
  margin: 0;
  height: 80px;
  width: 100%;
  background-color: transparent;
  z-index: 1000;
  border-bottom: 1px solid #fff;
}
#header {
  align-items: center;
}
#header .header-username {
  margin-left: 15px;
  font-size: 16px;
  color: #fff;
}
#header .header-button {
  text-align: center;
  display: flex;
  justify-content: flex-end;
}
#header .header-button .header-option {
  display: flex;
  justify-content: space-evenly;
}
#header .header-button .add-contact,
#header .header-button .add-group,
#header .header-button .btn-logout {
  color: #fff;
  width: 20px;
  height: 20px;
}
#header .header-button .add-contact:hover,
#header .header-button .add-group:hover,
#header .header-button .btn-logout:hover {
  cursor: pointer;
}
#header .header-button .add-group:focus {
  outline: none;
}
</style>

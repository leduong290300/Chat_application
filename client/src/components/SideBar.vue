<template>
  <div id="slidebar">
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
        <b-button
          variant="outline-primary"
          size="sm"
          v-on:click="logOutAccount"
        >
          <b-icon icon="power"></b-icon>
          Đăng xuất
        </b-button>
      </b-col>
    </b-row>
    <b-row id="searchBox">
      <b-col sm="12" class="searchBox-inner">
        <div class="form-group has-feedback">
          <input
            id="searchText"
            type="text"
            class="form-control"
            name="searchText"
            placeholder="Tìm kiếm liên hệ/nhóm"
          />
        </div>
      </b-col>
    </b-row>
    <b-row id="contact">
      <b-row class="contact-body">
        <b-col sm="3" xl="3" class="contact-avatar">
          <div class="avatar-icon">
            <img
              class="avatar-user"
              src="https://bootdey.com/img/Content/avatar/avatar1.png"
            />
          </div>
        </b-col>
        <b-col sm="9" xl="9" class="contact-main">
          <b-row class="contact-row">
            <b-col sm="8" xs="8" class="contact-name">
              <span class="name-meta">John Doe </span>
            </b-col>
            <b-col sm="3" xs="3" class="contact-time pull-right">
              <span class="time-meta pull-right">18:18 </span>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-row>
  </div>
</template>
<script>
import { signOut, authentication } from "../../firebase/config";
import { mapGetters } from "vuex";
export default {
  name: "SideBar",
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
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
#slidebar {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  display: block;
  top: 0;
}
#slidebar #header {
  padding: 10px 16px 10px 15px;
  margin: 0;
  height: 80px;
  width: 100%;
  background-color: #32465a;
  z-index: 1000;
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
}
#searchBox {
  width: 100%;
  height: 60px;
}
#searchBox .searchBox-inner {
  height: 100%;
  width: 100%;
  padding: 10px !important;
  background-color: #fbfbfb;
}
#searchBox,
#contact,
.contact-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#contact {
  background-color: #fff;
  overflow-y: auto;
  border: 1px solid #f7f7f7;
  height: calc(100% - 140px);
}
#contact .contact-body {
  position: relative;
  padding: 10px !important;
  border-bottom: 1px solid #f7f7f7;
  height: 72px;
  margin: 0 !important;
  cursor: pointer;
  align-items: center;
}
#contact .contact-body:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
#contact .contact-avatar {
  text-align: center;
  padding: 0 !important;
}
#contact .contact-avatar .avatar-icon {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#contact .contact-avatar .avatar-icon .avatar-user {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
#contact .contact-main {
  padding: 0 !important;
}
#contact .contact-name,
#contact .contact-time {
  padding: 10px !important;
}
#contact .time-meta {
  text-align: right;
  font-size: 12px;
  padding: 1% !important;
  color: rgba(0, 0, 0, 0.4);
  vertical-align: baseline;
}
</style>

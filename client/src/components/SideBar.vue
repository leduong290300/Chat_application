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
              v-b-modal.modal-prevent-closing
            ></b-icon>
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
    <b-row id="room">
      <span class="title" v-b-toggle.collapse-a
        >Danh sách nhóm ({{ countRooms }})
        <b-icon class="icon-arrow" icon="arrow-right-circle"></b-icon
      ></span>
      <b-collapse
        visible
        id="collapse-a"
        class="mt-2 room-list"
        v-for="(room, key, index) in rooms"
        :key="index"
      >
        <b-card class="room-content" v-on:click="changeRoom(room)">{{
          room.name
        }}</b-card>
      </b-collapse>
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
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Tạo nhóm"
      @ok="handleCreateGroup"
      @hidden="resetModal"
    >
      <form ref="form" v-on:submit.prevent="createGroupChat">
        <b-form-group label="Tên nhóm">
          <b-form-input
            id="name-input"
            v-model="roomName"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { signOut, authentication, ref, database } from "../../firebase/config";

import { mapGetters } from "vuex";
import { onChildAdded, child, push, update } from "@firebase/database";
export default {
  name: "SideBar",
  data() {
    return {
      rooms: [],
      roomName: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
    // Đếm số nhóm trong db đã tạo
    countRooms() {
      return this.rooms.length;
    },
  },
  mounted() {
    this.addListener();
  },
  methods: {
    addListener() {
      let dataCurrent = ref(database, "rooms");
      onChildAdded(dataCurrent, (snapshot) => {
        this.rooms.push(snapshot.val());
      });
    },
    // Thay đổi phỏng chat
    changeRoom(room) {
      this.$store.dispatch("setRoom", room);
    },
    // Reset modal sau khi tạo nhóm thành công
    resetModal() {
      this.groupName = "";
    },
    // Xử lí sự kiện thêm nhóm mới
    handleCreateGroup(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.createGroupChat();
    },
    // Tạo group chat mới
    createGroupChat() {
      const newPostKey = push(child(ref(database), "rooms")).key;
      const newRooms = { id: newPostKey, name: this.roomName };
      const updates = {};
      updates["rooms/" + newPostKey] = newRooms;

      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
      return update(ref(database), updates);
    },
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
#slidebar {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  display: block;
  top: 0;
  background-color: #4a204b;
}
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
#searchBox {
  width: 100%;
  height: 60px;
}
#searchBox .searchBox-inner {
  height: 100%;
  width: 100%;
  padding: 10px !important;
  background-color: transparent;
}
#searchBox,
#contact,
#room,
.contact-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#room {
  color: #fff;
}
#room .room-content:hover {
  cursor: pointer;
}
#room .title {
  margin-left: 10px;
}
#room .icon-arrow {
  margin-left: 10px;
}
#room .card {
  background: transparent !important;
}
#room .room-list {
  overflow-x: auto;
  height: 63px;
}
#contact {
  background-color: transparent;
  overflow-x: auto;
  border: 1px solid #4a204b;
  height: auto;
}
#contact .contact-body {
  position: relative;
  padding: 10px !important;
  border-bottom: 1px solid transparent;
  height: 72px;
  margin: 0 !important;
  cursor: pointer;
  align-items: center;
}
#contact .contact-body:hover {
  /* background-color: #f2f2f2; */
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
#contact .name-meta {
  color: #fff;
}
#contact .time-meta {
  text-align: right;
  font-size: 12px;
  padding: 1% !important;
  color: #fff;
  vertical-align: baseline;
}
</style>

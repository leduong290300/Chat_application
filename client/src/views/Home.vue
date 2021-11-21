<template>
  <b-container id="home_container" fluid>
    <b-row id="home_row">
      <b-col id="home_col_sidebar" md="4" lg="4" xl="3">
        <SideBar />
      </b-col>
      <b-col id="home_col_windowchat" md="8" lg="8" xl="9">
        <div v-if="this.currentChatRoom">
          <ChatRoom />
        </div>
        <div v-else-if="this.currentChatUser">
          <ChatSingle />
        </div>
        <div v-else>
          <Pending />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import SideBar from "../components/SideBar.vue";
import ChatRoom from "../components/ScreenChat/ChatRoom.vue";
import ChatSingle from "../components/ScreenChat/ChatSingle.vue";
import Pending from "../components/ScreenChat/Pending.vue";
// Other
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { SideBar, ChatRoom, ChatSingle, Pending },
  computed: {
    ...mapGetters(["currentChatUser", "currentChatRoom"]),
  },
};
</script>
<style>
#home_container {
  height: 100vh;
}
#home_col_sidebar,
#home_col_windowchat {
  height: auto;
}
#home_container,
#home_col_sidebar,
#home_col_windowchat {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
#home_col_windowchat {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}
#home_row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>

<template>
  <div id="wrapper">
    <b-row id="header">
      <b-col sm="6" xs="6" class="header-avatar">
        <b-avatar size="3rem" variant="info"></b-avatar>
        <span class="name-meta">{{ this.currentChatUser.displayName }}</span>
      </b-col>

      <b-col sm="6" xs="6" class="header-option">
        <b-icon class="more" icon="three-dots"></b-icon>
      </b-col>
    </b-row>
    <!-- Message -->
    <Message v-bind:storeMessage="storeMessage" />
    <!-- Reply -->
    <Reply />
  </div>
</template>
<script>
import Message from "./../Message/Message.vue";
import Reply from "./../Controls/Reply.vue";
// Others
import { mapGetters } from "vuex";
import { database, ref } from "../../../firebase/config";
import { onChildAdded, off } from "@firebase/database";
export default {
  name: "ChatSingle",
  data() {
    return {
      storeMessage: [],
      user: null,
    };
  },
  components: { Message, Reply },
  computed: {
    ...mapGetters(["currentChatUser", "isPrivate", "currentChatRoom"]),
  },
  mounted() {
    this.loadMessage();
  },
  watch: {
    currentChatUser() {
      this.storeMessage = [];
      this.loadMessage();
      this.user = this.currentChatUser;
    },
  },
  methods: {
    // Load message
    loadMessage() {
      const messageRef = ref(
        database,
        "privateMessage/" + this.currentChatUser.id,
      );

      onChildAdded(messageRef, (snapshot) => {
        const data = snapshot.val();
        data["id"] = snapshot.key;
        this.storeMessage.push(data);
      });
    },
    // Unsubscribe
    unsubscribe() {
      off(ref(database, `privateMessage/${this.currentChatUser.id}`));
    },
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
<style scoped>
#wrapper {
  height: 100vh;
  position: relative;
}
#header {
  padding: 10px 16px 10px 15px;
  margin: 0;
  height: 80px;
  width: 100%;
  background-color: #eee;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;
}
#header .header-avatar {
  padding: 0 !important;
  margin: 0 !important;
}
#header .name-meta {
  font-weight: 700;
  font-size: 100%;
  padding: 5px;
  padding-bottom: 0;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}
#header .header-option .more {
  float: right;
}
</style>

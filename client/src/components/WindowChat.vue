<template>
  <div id="wrapper">
    <div v-if="this.currentChatRoom === null">
      <ChatSingle />
    </div>
    <div v-if="this.currentChatRoom !== null">
      <ChatRoom />
    </div>
    <!-- Message -->
    <Message v-bind:storeMessage="storeMessage" />
    <!-- Reply -->
    <Reply />
  </div>
</template>
<script>
// Components
import ChatSingle from "./ScreenChat/ChatSingle.vue";
import ChatRoom from "./ScreenChat/ChatRoom.vue";
import Message from "./Message/Message.vue";
import Reply from "./Controls/Reply.vue";
// Others
import { mapGetters } from "vuex";
import { database, ref } from "../../firebase/config";
import { onChildAdded } from "@firebase/database";

export default {
  name: "WindowChat",
  components: { ChatSingle, ChatRoom, Message, Reply },
  data() {
    return {
      storeMessage: [],
      room: null,
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentChatRoom"]),
  },

  watch: {
    currentChatRoom() {
      this.storeMessage = [];
      this.loadMessage();
      this.room = this.currentChatRoom;
    },
  },

  methods: {
    // Load tin nhắn
    loadMessage() {
      const messageRef = ref(database, `message/${this.currentChatRoom.id}`);
      onChildAdded(messageRef, (snapshot) => {
        const data = snapshot.val();
        this.storeMessage.push(data);
      });
    },
  },
};
</script>
<style scoped>
#wrapper {
  height: 100vh;
  position: relative;
}
</style>

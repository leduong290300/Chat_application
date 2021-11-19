<template>
  <div id="wrapper">
    <div v-if="this.currentChatRoom === null">
      <ChatSingle />
    </div>
    <div v-if="this.currentChatRoom !== null">
      <ChatRoom />
    </div>
    <Message />
    <b-row id="reply">
      <b-col sm="1" xs="1" class="reply-enjoy">
        <b-icon icon="emoji-smile" class="icon icon-smile"></b-icon>
      </b-col>
      <b-col sm="9" xs="9" class="reply-main">
        <textarea
          rows="1"
          v-model.trim="message"
          class="form-control"
        ></textarea>
      </b-col>
      <b-col sm="1" xs="1" class="reply-recording">
        <b-icon icon="mic-fill" class="icon icon-mic"></b-icon>
      </b-col>
      <b-col sm="1" xs="1" class="reply-send">
        <b-button v-on:click="sendMessage" variant="outline-primary"
          >Gửi</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { database, set, ref } from "../../firebase/config";
import { push, serverTimestamp } from "@firebase/database";
import ChatSingle from "./ScreenChat/ChatSingle.vue";
import ChatRoom from "./ScreenChat/ChatRoom.vue";
import Message from "./Message/Message.vue";
export default {
  name: "WindowChat",
  components: { ChatSingle, ChatRoom, Message },
  data() {
    return {
      message: "",
      storeMessage: [],
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentChatRoom"]),
  },
  watch: {
    currentChatRoom() {
      this.listenersSnap();
    },
  },

  methods: {
    // Gửi tin nhắn
    sendMessage() {
      const postRef = ref(database, `message/${this.currentChatRoom.id}`);
      const newPostRef = push(postRef);
      if (this.message.length > 0) {
        set(newPostRef, {
          content: this.message,
          time: serverTimestamp(),
          user: {
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL,
            id: this.currentUser.uid,
          },
        });
      }
      this.message = "";
    },
  },
};
</script>
<style scoped>
#wrapper {
  height: 100vh;
}
#reply {
  height: 80px;
  width: 100%;
  background-color: #eee;
  padding: 10px 5px 10px 5px !important;
  margin: 0 !important;
  z-index: 1000;
  align-items: center;
}
#reply .icon {
  width: 25px;
  height: 25px;
}
#reply .reply-enjoy,
#reply .reply-recording,
#reply .reply-send {
  padding: 5px !important;
  text-align: center;
}
#reply .reply-main {
  padding: 2px !important;
}
#reply .reply-main textarea {
  width: 100%;
  resize: none;
  overflow: hidden;
  padding: 5px !important;
  outline: none;
  border: none;
  text-indent: 5px;
  box-shadow: none;
  height: 100%;
  font-size: 16px;
}
#reply .reply-enjoy .icon-smile:hover,
#reply .reply-recording .icon-mic:hover {
  cursor: pointer;
}
</style>

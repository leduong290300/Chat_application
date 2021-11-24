<template>
  <b-row id="reply">
    <b-col sm="1" xs="1" class="reply-enjoy">
      <b-icon
        icon="emoji-smile"
        v-on:click="isShow = !isShow"
        class="icon icon-smile"
      ></b-icon>
    </b-col>
    <b-col sm="9" xs="9" class="reply-main">
      <textarea
        rows="1"
        v-model.trim="message"
        v-on:keyup.enter="sendMessage"
        class="form-control"
      ></textarea>
    </b-col>
    <b-col sm="1" xs="1" class="reply-file">
      <b-icon
        v-b-modal.modal-upload-file
        icon="folder-symlink-fill"
        class="icon icon-file"
      ></b-icon>
    </b-col>
    <b-col sm="1" xs="1" class="reply-send">
      <b-icon
        icon="chat-square-dots"
        v-on:click="sendMessage"
        class="icon icon-send"
      ></b-icon>
    </b-col>
    <VEmojiPicker
      class="emoji-picker"
      v-show="isShow == true"
      @select="selectEmoji"
    />
    <UploadFile />
  </b-row>
</template>
<script>
// Component
import UploadFile from "../Modal/UploadFile.vue";
// Others
import { database, set, ref } from "../../../firebase/config";
import { push, serverTimestamp } from "@firebase/database";

import { VEmojiPicker } from "v-emoji-picker";
import { mapGetters } from "vuex";
export default {
  name: "Reply",
  data() {
    return {
      message: "",
      isEmojy: "",
      isShow: false,
    };
  },
  components: { VEmojiPicker, UploadFile },
  computed: {
    ...mapGetters([
      "currentUser",
      "currentChatRoom",
      "currentChatUser",
      "isPrivate",
    ]),
  },

  methods: {
    // Tạo tin nhắn`
    createMessage(url = null) {
      let value = {
        time: serverTimestamp(),
        user: {
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
          id: this.currentUser.uid,
        },
      };
      if (url == null) {
        value["content"] = this.message;
      } else {
        value["image"] = url;
      }
      return value;
    },

    // Gửi tin nhắn
    sendMessage() {
      const postRef = this.getMessageRef();
      const newPostRef = push(postRef);
      set(newPostRef, this.createMessage());
      this.isShow = false;
      this.message = "";
    },

    getMessageRef() {
      if (this.isPrivate) {
        return ref(database, "privateMessage/" + this.currentChatUser.id);
      } else {
        return ref(database, `message/${this.currentChatRoom.id}`);
      }
    },

    // Thêm icon
    selectEmoji(emoji) {
      this.message += emoji.data;
    },
  },
};
</script>
<style scoped>
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
#reply .reply-file,
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
#reply .reply-file .icon-file:hover,
#reply .reply-send .icon-send:hover {
  cursor: pointer;
}
#reply .reply-enjoy .icon-smile:focus,
#reply .reply-file .icon-file:focus,
#reply .reply-send .icon-send:focus {
  outline: none;
}
#reply .emoji-picker {
  position: absolute;
  top: 28%;
}
</style>

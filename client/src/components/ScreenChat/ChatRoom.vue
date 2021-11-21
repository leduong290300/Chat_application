<template>
  <div id="wrapper">
    <b-row id="header">
      <b-col sm="6" xs="6" class="header-avatar">
        <span class="name-meta">{{ this.currentChatRoom.name }}</span>
      </b-col>

      <b-col sm="6" xs="6" class="header-option">
        <b-icon
          icon="person-plus"
          v-b-tooltip.hover
          title="Thêm thành viên"
          class="invite"
        ></b-icon>
        <b-icon
          class="more"
          icon="three-dots"
          v-b-tooltip.hover
          title="Lựa chọn"
        ></b-icon>
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
// Other
import { mapGetters } from "vuex";
import { database, ref } from "../../../firebase/config";
import { onChildAdded } from "@firebase/database";
export default {
  name: "ChatRoom",
  components: { Message, Reply },
  computed: {
    ...mapGetters(["currentChatRoom"]),
  },
  data() {
    return {
      storeMessage: [],
      room: null,
    };
  },
  mounted() {
    this.loadMessage();
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
        data["id"] = snapshot.key;
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
#header .header-option {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#header .invite,
#header .more {
  width: 20px;
  height: 20px;
}
#header .invite:hover,
#header .more:hover {
  cursor: pointer;
}
#header .invite {
  margin-right: 20px;
}
</style>

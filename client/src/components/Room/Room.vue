<template>
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
</template>
<script>
import { ref, database } from "../../../firebase/config";
import { mapGetters } from "vuex";
import { onChildAdded } from "@firebase/database";
export default {
  name: "Room",
  data() {
    return {
      rooms: [],
      roomName: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentChatRoom"]),
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
      this.$store.dispatch("setPrivate", false);
    },
  },
};
</script>
<style scoped>
#room {
  color: #fff;
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#room .room-content:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1) !important;
}
.is_active:active {
  background: rgba(255, 255, 255, 0.1) !important;
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
</style>

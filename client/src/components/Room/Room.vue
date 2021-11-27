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
      <b-card class="room-content" v-on:click="changeRoom(room)"
        >{{ room.name }}
        <b-badge
          variant="primary"
          v-if="getNotification(room) > 0 && room.id !== currentChatRoom.id"
          >{{ getNotification(room) }}</b-badge
        >
      </b-card>
    </b-collapse>
  </b-row>
</template>
<script>
import { databaseCloudStore, ref, database } from "../../../firebase/config";
import { mapGetters } from "vuex";
import { onValue } from "@firebase/database";
import { collection, query, where, onSnapshot } from "firebase/firestore";
export default {
  name: "Room",
  data() {
    return {
      rooms: [],
      notificationCounts: [],
    };
  },

  computed: {
    ...mapGetters(["currentUser", "currentChatRoom", "isPrivate"]),
    // Đếm số nhóm trong db đã tạo
    countRooms() {
      return this.rooms.length;
    },
  },

  mounted() {
    this.loadRoomFromDatabase();
  },

  methods: {
    // MODULE Load rooms
    loadRoomFromDatabase() {
      // let dataCurrent = ref(database, "rooms");
      // onChildAdded(dataCurrent, (snapshot) => {
      //   this.rooms.push(snapshot.val());
      //   this.countNotification(snapshot.key);
      // });
      const roomRef = query(
        collection(databaseCloudStore, "rooms"),
        where("members", "array-contains", this.currentUser.uid),
      );
      onSnapshot(roomRef, (snapshot) => {
        snapshot.docs.map((doc) => {
          this.rooms.push({
            ...doc.data(),
            id: doc.id,
          });
        });
      });
    },

    // Thay đổi phỏng chat
    changeRoom(room) {
      this.$store.dispatch("setRoom", room);
      this.$store.dispatch("setPrivate", false);
    },

    // Đếm thông báo
    countNotification(roomId) {
      onValue(ref(database, `message/${roomId}`), (snapshot) => {
        this.handleCountNotification(roomId, snapshot);
      });
    },

    // Xử lí thông báo
    handleCountNotification(roomId, snapshot) {
      let lastTotal = 0;
      let index = this.notificationCounts.findIndex(
        (data) => data.id === roomId,
      );

      if (index !== -1) {
        if (roomId !== this.currentChatRoom.id) {
          lastTotal = this.notificationCounts[index].total;
          if (snapshot.size - lastTotal > 0) {
            this.notificationCounts[index].notification =
              snapshot.size - lastTotal;
          }
        }
        this.notificationCounts[index].peviousTotal = snapshot.size;
      } else {
        this.notificationCounts.push({
          id: roomId,
          total: snapshot.size,
          peviousTotal: snapshot.size,
          notification: 0,
        });
      }
    },

    //TODO: Hiển thị số thông báo
    getNotification(room) {
      let notifi = 0;

      this.notificationCounts.forEach((data) => {
        if (data.id === room.id) {
          notifi = data.notification;
        }
      });
      return notifi;
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
#room .badge {
  background-color: #0d6efd;
  position: absolute;
  right: 0;
}
</style>

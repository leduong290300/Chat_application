<template>
  <b-row id="contact">
    <span class="title" v-b-toggle.collapse-b
      >Danh sách liên hệ ({{ countUser }})
      <b-icon class="icon-arrow" icon="arrow-right-circle"></b-icon
    ></span>
    <b-collapse
      visible
      id="collapse-b"
      class="mt-2 contact-list"
      v-for="(user, index) in users"
      v-bind:key="index"
    >
      <b-card class="contact-body" v-on:click="changeUser(user)">
        <div class="avatar-icon">
          <img class="avatar-user" :src="user.photoURL" />
        </div>
        <div class="contact-name">{{ user.displayName }}</div>
        <b-badge
          variant="primary"
          v-if="getNotification(user) > 0 && user.uid !== currentUser.uid"
          >{{ getNotification(user) }}</b-badge
        >
      </b-card>
    </b-collapse>
  </b-row>
</template>
<script>
import { ref, database } from "../../../firebase/config";
import { mapGetters } from "vuex";
import { onChildAdded, off, onValue } from "@firebase/database";
export default {
  name: "Contact",
  data() {
    return {
      users: [],
      notificationCounts: [],
    };
  },
  computed: {
    ...mapGetters(["currentUser", "isPrivate"]),
    countUser() {
      return this.users.length;
    },
  },
  mounted() {
    this.addListener();
  },
  methods: {
    // Load user
    addListener() {
      let dataCurrent = ref(database, "users");
      onChildAdded(dataCurrent, (snapshot) => {
        if (this.currentUser.uid !== snapshot.key) {
          let data = snapshot.val();
          data["uid"] = snapshot.key;
          this.users.push(data);
          let userId = this.getUserId(snapshot.key);
          this.countNotification(userId);
        }
      });
    },
    // Change user
    changeUser(user) {
      const userId = this.getUserId(user.uid);
      const channel = { id: userId, displayName: user.displayName };

      this.$store.dispatch("setRoom", null);
      this.$store.dispatch("setPrivate", true);
      this.$store.dispatch("setChatUser", channel);
    },
    // Get user id
    getUserId(userId) {
      return userId < this.currentUser.uid
        ? userId + "/" + this.currentUser.uid
        : this.currentUser.uid + "/" + userId;
    },

    // Đếm thông báo
    countNotification(userId) {
      onValue(ref(database, `privateMessage/${userId}`), (snapshot) => {
        this.handleCountNotification(userId, snapshot);
      });
    },

    // Xử lí thông báo
    handleCountNotification(userId, snapshot) {
      let lastTotal = 0;
      let index = this.notificationCounts.findIndex(
        (data) => data.id === userId,
      );

      if (index !== -1) {
        if (userId !== this.currentUser.id) {
          lastTotal = this.notificationCounts[index].total;
          if (snapshot.size - lastTotal > 0) {
            this.notificationCounts[index].notification =
              snapshot.size - lastTotal;
          }
        }
        this.notificationCounts[index].peviousTotal = snapshot.size;
      } else {
        this.notificationCounts.push({
          id: userId,
          total: snapshot.size,
          peviousTotal: snapshot.size,
          notification: 0,
        });
      }
    },

    // Hiển thị số thông báo
    getNotification(user) {
      let notifi = 0;
      this.notificationCounts.forEach((data) => {
        if (data.id === this.getUserId(user.uid)) {
          notifi = data.notification;
        }
      });
      return notifi;
    },
    // Unsubscribe
    unsubscribe() {
      off(ref(database, "users"));
    },
  },
  beforeDestroy() {
    this.unsubscribe();
  },
};
</script>
<style scoped>
#contact .contact-list {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#contact {
  background-color: transparent;
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#contact .title {
  margin: 15px 0 0 10px;
  color: #fff;
}
#contact .icon-arrow {
  margin-left: 10px;
  color: #fff;
}
#contact .contact-body {
  position: relative;

  border-bottom: 1px solid transparent;

  margin: 0 !important;
  cursor: pointer;
  align-items: center;
  background: transparent;
}
#contact .contact-body:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  cursor: pointer;
}
#contact .card-body {
  width: 100%;
  display: flex;
  align-items: center;
}
#contact .contact-body .avatar-icon {
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  padding: 0 !important;
}
#contact .contact-body .avatar-icon .avatar-user {
  border-radius: 50%;
  width: 48px;
  height: 48px;
}
#contact .contact-main {
  padding: 0 !important;
}
#contact .contact-name {
  padding: 10px !important;
  color: #fff;
}
#contact .badge {
  background-color: #0d6efd;
  position: absolute;
  right: 0;
}
</style>

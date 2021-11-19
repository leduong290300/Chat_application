<template>
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
</template>
<script>
// Other
import { mapGetters } from "vuex";
export default {
  name: "ChatRoom",
  computed: {
    ...mapGetters(["currentChatRoom"]),
  },
};
</script>
<style scoped>
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

<template>
  <b-row id="message">
    <b-row
      class="message-body"
      v-for="(message, index) in storeMessage"
      :key="index"
    >
      <b-col md="1" lg="1" xl="1" class="avatar">
        <b-avatar
          size="2rem"
          variant="info"
          :src="message.user.photoURL"
        ></b-avatar>
      </b-col>
      <b-col md="11" lg="11" xl="11" class="message">
        <div class="main">
          <div class="message-text">{{ message.content }}</div>
          <div class="message-time">{{ message.time | timeNow() }}</div>
        </div>
      </b-col>
    </b-row>
  </b-row>
</template>
<script>
import moment from "moment";
export default {
  name: "Message",
  props: {
    storeMessage: Array,
  },
  // Xắp sếp thời gian tin nhắn
  filters: {
    timeNow(value) {
      return moment(value).fromNow();
    },
  },
};
</script>
<style scoped>
#message {
  padding: 0 !important;
  margin: 0 !important;
  border: 1px solid #f7f7f7;
  height: calc(100% - 160px);
  flex-direction: column;
  justify-content: flex-end;
}
#message .message-body,
#message .avatar,
#message .message {
  padding: 0 !important;
  margin: 0 !important;
}
#message .avatar {
  width: auto;
  margin-right: 10px !important;
}
#message .message-body {
  margin-bottom: 15px !important;
}
#message .message {
  max-width: 60%;
}
#message .main {
  width: auto !important;
  padding: 4px 10px 7px !important;
  border-radius: 10px 10px 10px 0;
  background: #dcf8c6;
  font-size: 12px;
  text-shadow: 0 1px 1px rgb(0 0 0 / 20%);
  word-wrap: break-word;
  display: inline-block;
}
#message .message-text {
  margin: 0 !important;
  padding: 5px !important;
  word-wrap: break-word;
  font-weight: 200;
  font-size: 14px;
  padding-bottom: 0 !important;
}
#message .message-time {
  margin: 0 !important;
  margin-left: 50px !important;
  font-size: 12px;
  text-align: right;
  color: #9a9a9a;
}
</style>

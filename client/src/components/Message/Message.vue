<template>
  <b-row id="message">
    <b-row class="message-body">
      <b-col md="1" lg="1" xl="1" class="avatar">
        <b-avatar size="3rem" variant="info"></b-avatar>
      </b-col>
      <b-col md="11" lg="11" xl="11" class="message">
        <div class="main">
          <div class="message-text">Hi,Hello Cac Ban</div>
          <div class="message-time">12:21AM 14/11/2021</div>
        </div>
      </b-col>
    </b-row>
    <b-row class="message-body">
      <b-col md="1" lg="1" xl="1" class="avatar">
        <b-avatar size="3rem" variant="info"></b-avatar>
      </b-col>
      <b-col md="11" lg="11" xl="11" class="message">
        <div class="main">
          <div class="message-text">Hi,Hello Cac Ban</div>
          <div class="message-time">12:21AM 14/11/2021</div>
        </div>
      </b-col>
    </b-row>
    <b-row class="message-body">
      <b-col md="1" lg="1" xl="1" class="avatar">
        <b-avatar size="3rem" variant="info"></b-avatar>
      </b-col>
      <b-col md="11" lg="11" xl="11" class="message">
        <div class="main">
          <div class="message-text">Hi,Hello Cac Ban</div>
          <div class="message-time">12:21AM 14/11/2021</div>
        </div>
      </b-col>
    </b-row>
  </b-row>
</template>
<script>
export default {
  name: "Message",
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
}
#message .message-body {
  margin-bottom: 10px !important;
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

<template>
  <div id="wrapper">
    <b-row id="header">
      <b-col sm="6" xs="6" class="header-avatar">
        <b-avatar size="3rem" variant="info"></b-avatar>
        <span class="name-meta">John</span>
      </b-col>

      <b-col sm="6" xs="6" class="header-option">
        <b-icon class="more" icon="three-dots"></b-icon>
      </b-col>
    </b-row>
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
    <b-row id="reply">
      <b-col sm="1" xs="1" class="reply-enjoy">
        <b-icon icon="emoji-smile" class="icon icon-smile"></b-icon>
      </b-col>
      <b-col sm="9" xs="9" class="reply-main">
        <textarea rows="1" class="form-control"></textarea>
      </b-col>
      <b-col sm="1" xs="1" class="reply-recording">
        <b-icon icon="mic-fill" class="icon icon-mic"></b-icon>
      </b-col>
      <b-col sm="1" xs="1" class="reply-send">
        <b-button variant="outline-primary">Gửi</b-button>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "WindowChat",
};
</script>
<style scoped>
#wrapper {
  height: 100vh;
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
#header .header-avatar {
  padding: 0 !important;
  margin: 0 !important;
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
#header .header-option .more {
  float: right;
}
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

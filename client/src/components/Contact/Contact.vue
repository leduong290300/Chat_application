<template>
  <b-row id="contact">
    <span class="title" v-b-toggle.collapse-b
      >Danh sách liên hệ
      <b-icon class="icon-arrow" icon="arrow-right-circle"></b-icon
    ></span>
    <b-collapse visible id="collapse-b" class="mt-2 contact-list">
      <b-card class="contact-body">
        <div class="avatar-icon">
          <img
            class="avatar-user"
            src="https://bootdey.com/img/Content/avatar/avatar1.png"
          />
        </div>
        <div class="contact-name">Le Duong</div>
        <b-badge variant="primary">+5</b-badge>
      </b-card>
    </b-collapse>
  </b-row>
</template>
<script>
export default {
  name: "Contact",
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

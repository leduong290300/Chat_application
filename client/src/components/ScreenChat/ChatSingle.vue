<template>
  <b-row id="header">
    <b-col sm="6" xs="6" class="header-avatar">
      <b-avatar size="3rem" variant="info"></b-avatar>
      <span class="name-meta">John</span>
    </b-col>

    <b-col sm="6" xs="6" class="header-option">
      <b-icon class="more" icon="three-dots"></b-icon>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "ChatSingle",
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
</style>

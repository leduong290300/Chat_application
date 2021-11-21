<template>
  <div id="wrapper">
    <b-row id="header">
      <b-col sm="12" xs="12" class="header-avatar">
        <span class="name-meta">Chào mừng các bạn đến với Chat App</span>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "Pending",
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
</style>

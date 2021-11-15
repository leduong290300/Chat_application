<template>
  <b-container id="home_container" fluid>
    <b-row id="home_row">
      <b-col id="home_col_sidebar" md="4" lg="4" xl="3">
        <SideBar />
      </b-col>
      <b-col id="home_col_windowchat" md="8" lg="8" xl="9">
        <WindowChat />
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import SideBar from "../components/SideBar.vue";
import WindowChat from "../components/WindowChat.vue";
export default {
  name: "Home",
  components: { SideBar, WindowChat },
};
</script>
<style>
#home_container {
  height: 100vh;
}
#home_col_sidebar,
#home_col_windowchat {
  height: 100%;
}
#home_container,
#home_col_sidebar,
#home_col_windowchat {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
#home_col_windowchat {
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}
#home_row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>

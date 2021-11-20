<template>
  <div id="slidebar">
    <!-- Account -->
    <Account />
    <!-- Search -->
    <Search />
    <!--Room-->
    <Room />
    <!--Contact-->
    <Contact />
  </div>
</template>
<script>
// Component
import Contact from "./Contact/Contact.vue";
import Room from "./Room/Room.vue";
import Search from "./Search/Search.vue";
import Account from "./Account/Account.vue";

export default {
  name: "SideBar",
  components: { Contact, Room, Search, Account },
};
</script>
<style scoped>
#slidebar {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  position: relative;
  display: block;
  top: 0;
  background-color: #4a204b;
}
</style>

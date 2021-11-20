<template>
  <b-row id="searchBox">
    <b-col sm="12" class="searchBox-inner">
      <div class="form-group has-feedback">
        <input
          id="searchText"
          type="text"
          class="form-control"
          name="searchText"
          placeholder="Tìm kiếm liên hệ/nhóm"
        />
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "Search",
};
</script>
<style scoped>
#searchBox {
  width: 100%;
  height: 60px;
}
#searchBox .searchBox-inner {
  height: 100%;
  width: 100%;
  padding: 10px !important;
  background-color: transparent;
}
#searchBox {
  margin-right: 0 !important;
  margin-left: 0 !important;
}
</style>

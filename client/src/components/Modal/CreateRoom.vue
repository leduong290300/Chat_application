<template>
  <b-modal
    id="modal-create-room"
    ref="modal"
    title="Thêm nhóm chat"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleCreateRoom"
  >
    <form ref="form" @submit.stop.prevent="createRoomChat">
      <b-form-group label="Tên phòng">
        <b-form-input v-model="name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Mô tả" class="mt-2">
        <b-form-input v-model="description" required></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>
<script>
// TODO:Others
import { ref, database } from "../../../firebase/config";
import { push, child, update } from "@firebase/database";

import { mapGetters } from "vuex";
export default {
  name: "CreateRoom",
  data() {
    return {
      name: "",
      description: "",
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    // MODULE: Reset modal
    resetModal() {
      this.name = "";
      this.description = "";
    },

    // MODULE: Create room news
    handleCreateRoom(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.createRoomChat();
    },

    // MODULE: Create room
    createRoomChat() {
      const newPostKey = push(child(ref(database), "rooms")).key;
      const newRooms = {
        id: newPostKey,
        name: this.name,
        description: this.description,
        members: [this.currentUser.uid],
      };
      let updates = {};
      updates["rooms/" + newPostKey] = newRooms;
      this.$nextTick(() => {
        this.$bvModal.hide("modal-create-room");
      });
      return update(ref(database), updates);
    },
  },
};
</script>

<template>
  <b-modal
    id="invite-members"
    title="Thêm thành viên"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleInviteMembers"
  >
    <b-form-group>
      <b-form-input
        v-model.trim="email"
        placeholder="Tìm theo email"
        v-on:keyup.enter="searchMembers"
      ></b-form-input>
    </b-form-group>
    <b-list-group class="mt-2" v-if="isShowListMember == false">
      <div v-if="errors == null">
        <b-list-group-item
          class="d-flex align-items-center"
          v-for="(member, index) in listMemeber"
          :key="index"
        >
          <b-avatar
            variant="info"
            :src="member.photoURL"
            class="mr-10"
          ></b-avatar>
          <span class="mr-auto">{{ member.displayName }}</span>
        </b-list-group-item>
      </div>
      <div v-if="errors !== null">
        <b-alert show variant="danger"
          >Kết quả tìm kiếm cho {{ this.email }} không tồn tại</b-alert
        >
      </div>
    </b-list-group>
  </b-modal>
</template>
<script>
// TODO Other
import { ref, database } from "../../../firebase/config";
import { query, orderByChild, equalTo, get, update } from "@firebase/database";
import { mapGetters } from "vuex";
export default {
  name: "InviteMembers",
  data() {
    return {
      email: "",
      key: null,
      newKey: [],
      listMemeber: [],
      isShowListMember: true,
      errors: null,
    };
  },
  computed: {
    ...mapGetters(["currentChatRoom"]),
  },
  methods: {
    // MODULE Reset
    resetModal() {
      this.email = "";
    },

    // MODULE Search user
    searchMembers() {
      const userEmailRef = ref(database, "usersEmail");
      const queryConstraints = [orderByChild("email"), equalTo(this.email)];
      get(query(userEmailRef, ...queryConstraints))
        .then((data) => {
          this.handleSearchMember(data.val());
        })
        .catch((err) => {
          this.errors = err;
        });

      if (this.listMemeber !== null) {
        this.isShowListMember = false;
      } else {
        this.isShowListMember = true;
      }
    },

    // MODULE Hanle search memeber
    handleSearchMember(value) {
      Object.keys(value).forEach((key) => {
        if (typeof value[key] === "object") {
          this.listMemeber.push(value[key]);
          this.key = key;
        }
      });
      const roomRef = ref(database, `rooms/${this.currentChatRoom.id}`);
      const queryConstraints = [orderByChild("members")];
      get(query(roomRef, ...queryConstraints)).then((data) => {
        let uidCurrent = data.val().members;
        let uidNew = uidCurrent.concat(this.key);

        return update(roomRef, { members: uidNew })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      });
    },

    // MODULE Invite members
    handleInviteMembers(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.acceptInviteMembers();
    },

    // MODULE Accept invite members
    acceptInviteMembers() {
      this.$nextTick(() => {
        this.$bvModal.hide("invite-members");
      });
      this.errors = null;
    },
  },
};
</script>
<style scoped>
.mr-10 {
  margin-right: 10px;
}
</style>

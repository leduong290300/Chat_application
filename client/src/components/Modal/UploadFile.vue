<template>
  <b-modal
    id="modal-upload-file"
    title="Thêm files"
    ref="modal"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleUpload">
      <b-form-file plain @change="addFile"></b-form-file>
    </form>
    <b-progress
      class="mt-2"
      :value="value"
      :max="max"
      show-progress
      animated
    ></b-progress>
  </b-modal>
</template>
<script>
import { ref, database, storage } from "../../../firebase/config";
import {
  ref as refStorage,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import { mapGetters } from "vuex";
export default {
  name: "UploadFile",
  data() {
    return {
      file: null,
      contentType: null,
      value: 0,
      max: 100,
      types: ["image/jpeg", "image/png"],
      uploadTask: null,
    };
  },
  computed: {
    ...mapGetters(["isPrivate", "currentChatUser", "currentChatRoom"]),
  },
  methods: {
    resetModal() {
      this.file = null;
      this.value = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleUpload();
    },
    // Load file ảnh
    addFile(e) {
      const file = e.target.files;
      if (file.length === 1) {
        this.file = file[0];
      }
      if (this.file !== null) {
        if (this.isValid(this.file.name)) {
          const data = { contentType: mime.lookup(this.file.name) };
          this.contentType = data;
        }
      }
    },
    // Xác thực loại ảnh (png/jpeg)
    isValid(filename) {
      const index = this.types.indexOf(mime.lookup(filename));
      return index !== -1;
    },
    // Tải ảnh lên storage
    handleUpload() {
      if (this.file === null) return false;
      if (this.isPrivate) {
        const pathUploadUser = this.currentChatUser.id;
        console.log(pathUploadUser);
      } else {
        const pathUploadRoom = this.currentChatRoom.id;
        console.log(pathUploadRoom);
      }
      //   const ref = this.getMessageRef();
      const filePath = this.getPath() + "/" + uuidv4() + ".jpg";
      const storageRef = refStorage(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      // Tải file ảnh lên
      this.uploadTask = uploadBytes(storageRef, this.file, this.contentType);
      // Quản lý tiến độ tải lên
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.value = progress;
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.$nextTick(() => {
            this.$bvModal.hide("modal-upload-file");
          });
          this.resetModal();
        },
      );
    },
    // Lấy đường dẫn ảnh
    getPath() {
      if (this.isPrivate) {
        return `chat_app/private/${this.currentChatUser.id}`;
      } else {
        return "chat_app/public/";
      }
    },
    // Lấy kho lưu trữ tin nhắn và phân loại
    getMessageRef() {
      if (this.isPrivate) {
        return ref(database, `privateMessage/${this.currentChatUser.id}`);
      } else {
        return ref(database, `message/${this.currentChatRoom.id}`);
      }
    },
  },
};
</script>

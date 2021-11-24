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
      :percent="percent"
      :max="max"
      show-progress
      animated
    ></b-progress>
  </b-modal>
</template>
<script>
import mime from "mime-types";
import { storage, set } from "../../../firebase/config";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { mapGetters } from "vuex";
export default {
  name: "UploadFile",
  data() {
    return {
      file: null,
      max: 100,
      uploadTask: null,
      percent: 0,
      types: ["image/jpeg", "image/png"],
    };
  },
  computed: {
    ...mapGetters([
      "isPrivate",
      "currentChatUser",
      "currentChatRoom",
      "currentUser",
    ]),
  },
  methods: {
    // Reset modal
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
          const contentType = { contentType: mime.lookup(this.file.name) };
          this.handleUpload(this.file, contentType);
        }
      }
    },

    // Xác thực loại ảnh (png/jpeg)
    isValid(filename) {
      const index = this.types.indexOf(mime.lookup(filename));
      return index !== -1;
    },

    // Tải ảnh lên storage
    handleUpload(file, contentType) {
      if (file === null) return false;

      const filePath = this.getPath() + "/" + uuidv4() + ".jpg";
      const storageRef = ref(storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Tải file ảnh lên
      this.uploadTask = uploadBytes(storageRef, file, contentType);

      // Quản lý tiến độ tải lên
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.percent = progress;
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Lấy đường dẫn ảnh sau khi lưu lên đám mây thành công
          getDownloadURL(storageRef).then((url) => {
            this.sendMessageFile(url);
          });
          this.$nextTick(() => {
            this.$bvModal.hide("modal-upload-file");
          });
          this.resetModal();
        },
      );
    },

    //
    sendMessageFile(url) {
      const messageRef = this.$parent.getMessageRef();
      const pathToUpload = push(messageRef);
      set(pathToUpload, this.$parent.createMessage(url));
    },
    // Lấy đường dẫn ảnh
    getPath() {
      if (this.isPrivate) {
        return "chat_app/private/" + this.currentChatUser.id;
      } else {
        return "chat_app/public/";
      }
    },
  },
};
</script>

<script setup>
import { ref, defineEmits } from "vue";
import Modal from "../shared/Modal.vue";
import ModalStore from "../store/modal.js";
import { API_URL } from "../store/api.js";
import ActionButton from "../shared/ActionButton.vue";
import axios from "axios";

const emit = defineEmits(["addUser"]);

const newUser = ref({ name: "", email: "" });

const addUser = async () => {
  if (!newUser.value.name || !newUser.value.email) return;
  try {
    const response = await axios.post(API_URL, newUser.value);
    const addedUser = { ...newUser.value, id: response.data.id };
    emit("addUser", addedUser);
    newUser.value = { name: "", email: "" };
    ModalStore.hide("add");
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <Modal name="add">
    <div class="modal__title">Add User</div>
    <div class="modal__input name">
      <p class="modal__input-name">Name</p>
      <input v-model="newUser.name" type="text" placeholder="name" />
    </div>
    <div class="modal__input email">
      <p class="modal__input-email">Email</p>
      <input v-model="newUser.email" type="text" placeholder="Email" />
    </div>
    <div class="modal__actions">
      <ActionButton class="close" @click="ModalStore.hide('add')">Close</ActionButton>
      <ActionButton class="save" @click="addUser">Save</ActionButton>
    </div>
  </Modal>
</template>

<style lang="scss" scoped></style>

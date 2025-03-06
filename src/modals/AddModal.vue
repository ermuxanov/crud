<script setup>
import { ref, defineEmits } from "vue";
import Modal from "../shared/Modal.vue";
import ModalStore from "../store/modal.js";
import ActionButton from "../shared/ActionButton.vue";
import axios from "axios";

const newUser = ref({ name: "", email: "" });
const emit = defineEmits(["addUser"]);
const apiUrl = "https://67c884670acf98d07086e289.mockapi.io/users/users";

const addUser = async () => {
  if (!newUser.value.name || !newUser.value.email) return;
  try {
    const response = await axios.post(apiUrl, newUser.value);
    const addedUser = { ...newUser.value, id: response.data.id };
    emit("addUser", addedUser);
    newUser.value = { name: "", email: "" };
    ModalStore.hide("add");
  } catch (error) {
    console.error("Ошибка при добавлении пользователя:", error);
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

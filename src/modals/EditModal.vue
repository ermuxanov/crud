<script setup>
import { ref, watch, defineEmits } from "vue";
import Modal from "../shared/Modal.vue";
import ModalStore from "../store/modal.js";
import { API_URL } from "../store/api.js";
import ActionButton from "../shared/ActionButton.vue";
import axios from "axios";

const props = defineProps({
  editUser: Object,
});

const emit = defineEmits(["updateUser"]);

const editUser = ref({ id: null, name: "", email: "" });


watch(
  () => props.editUser,
  (newVal) => {
    if (newVal) {
      editUser.value = { ...newVal };
    }
  },
  { immediate: true }
);

const saveEdit = async () => {
  try {
    await axios.put(`${API_URL}/${editUser.value.id}`, {
      name: editUser.value.name,
      email: editUser.value.email,
    });
    emit("updateUser", { ...editUser.value });
    ModalStore.hide("edit");
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <Modal name="edit">
    <div class="modal__title">Edit User</div>
    <div class="modal__input name">
      <p class="modal__input-name">Name</p>
      <input v-model="editUser.name" type="text" placeholder="name" />
    </div>
    <div class="modal__input email">
      <p class="modal__input-name">Email</p>
      <input v-model="editUser.email" type="text" placeholder="Email" />
    </div>
    <div class="modal__actions">
      <ActionButton class="close" @click="ModalStore.hide('edit')">Close</ActionButton>
      <ActionButton class="save" @click="saveEdit">Save</ActionButton>
    </div>
  </Modal>
</template>

<style lang="scss" scoped></style>

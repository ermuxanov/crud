<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UserRow from "../shared/UserRow.vue";
import ActionButton from "../shared/ActionButton.vue";
import EditModal from "../modals/EditModal.vue";
import AddModal from "../modals/AddModal.vue";
import ModalStore from "../store/modal.js";

const users = ref([]);
const editUser = ref(null);
const apiUrl = "https://67c884670acf98d07086e289.mockapi.io/users/users";

const getUsers = async () => {
  try {
    const response = await axios.get(apiUrl);
    users.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки постов:", error);
  }
};

const editFn = (user) => {
  editUser.value = { ...user };
  ModalStore.show("edit");
};

const updateUserInList = (updatedUser) => {
  const index = users.value.findIndex((user) => user.id === updatedUser.id);
  if (index !== -1) users.value[index] = updatedUser;
};

const addUserToList = (user) => {
  users.value.push(user);
};

const deleteFn = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    users.value = users.value.filter((user) => user.id !== id);
  } catch (error) {
    console.error("Ошибка удаления поста:", error);
  }
};

onMounted(() => {
  getUsers();
});
</script>

<template>
  <div class="container">
    <div class="block">
      <ActionButton class="add" @click="ModalStore.show('add')"> Add New User </ActionButton>
      <UserRow class="block__top">
        <p>Name</p>
        <p>Email</p>
        <p>Action</p>
      </UserRow>
      <div class="block__inner">
        <UserRow v-for="user in users" :key="`user-${user.id}`" class="block__wrap">
          <h3 class="block__wrap-name">{{ user.name }}</h3>
          <p class="block__wrap-email">{{ user.email }}</p>
          <div class="block__wrap-action">
            <ActionButton class="edit" @click="editFn(user)">Edit</ActionButton>
            <ActionButton class="del" @click="deleteFn(user.id)">Delete</ActionButton>
          </div>
        </UserRow>
      </div>
      <AddModal @addUser="addUserToList" />
      <EditModal :editUser="editUser" @updateUser="updateUserInList" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: max-content;
  margin: 100px auto 0;
  font-family: Arial, sans-serif;
}

.block {
  &__top {
    margin-top: 20px;
  }
  .add {
    background: dodgerblue;
    display: block;
    margin-left: auto;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }
  &__wrap {
    border-radius: 10px;
    background: #fff;
    align-items: center;
    color: #000;
    &-action {
      display: flex;
      gap: 10px;
      .edit {
        background: green;
      }
      .del {
        background: red;
      }
    }
  }
}
</style>

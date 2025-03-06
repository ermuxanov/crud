<script setup>
import Modal from "../store/modal.js";
const props = defineProps({
  name: String,
});
</script>
<template>
  <div class="modal">
    <div class="modal__inner" :class="{ show: Modal.data[name] }">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: 0.3s ease;
  &:has(.show) {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
  &__inner {
    width: 500px;
    height: fit-content;
    background: #fff;
    border-radius: 16px;
    padding: 20px 20px;
    margin-top: 100px;
  }
  &__actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 20px;
    .close {
      background: grey;
    }
    .save {
      background: dodgerblue;
      display: block;
    }
  }
  &__title {
    font-size: 24px;
    font-weight: 500;
  }
  &__input {
    margin-top: 20px;
    input {
      width: 100%;
      padding: 10px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin-top: 10px;
      border-radius: 10px;
    }
  }
}
</style>

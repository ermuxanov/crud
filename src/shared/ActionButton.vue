<script setup></script>
<template>
  <button class="add">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 16px;
  color: #fff;
  opacity: 0.7;
  transition: 0.3s ease;
  &:hover {
    opacity: 1;
  }
  &.hovered {
    opacity: 1;
  }
}
</style>

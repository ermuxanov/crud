<script setup></script>
<template>
  <div class="user-row">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.user-row {
  display: grid;
  grid-template-columns: 200px 250px auto;
  font-weight: 500;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  gap: 20px;
}
</style>

<script setup lang="ts"></script>

<template>
  <div class="empty">
    <EmptyCart style="margin-left: -15px" />
    <p class="empty__text">Cart is empty</p>
  </div>
</template>

<style scoped lang="scss">
.empty {
  position: absolute;
  top: 123px;

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 24px;

  &__text {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 19px;
    line-height: 150%;

    color: #757575;
  }
}
</style>

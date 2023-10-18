<script setup lang="ts">
const authToken = useAuthToken();
</script>

<template>
  <header class="header">
    <BoldArrow
      v-if="authToken.length > 0"
      class="header__return"
      @click="$router.push('/')"
    />
    <p v-else></p>

    <h1 class="header__title">Account details</h1>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;

  padding: 2.4rem;
  box-sizing: border-box;

  position: fixed;
  top: 0;

  display: grid;
  grid: auto / 2rem auto 2rem;
  place-items: center;

  border-radius: 0 0 0.8rem 0.8rem;
  background: var(--white-color);

  /* shadow lg */
  box-shadow: 0 12px 16px -4px rgba(54, 54, 171, 0.08),
    0 4px 6px -2px rgba(54, 54, 171, 0.03);

  z-index: 2000;

  &__title {
    color: var(--black-color);
    font: 400 normal 2.4rem/1.5 Inter, sans-serif;
  }
}
</style>

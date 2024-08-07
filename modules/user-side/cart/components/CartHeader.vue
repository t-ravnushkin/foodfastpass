<script setup lang="ts">

const router = useRouter();
</script>

<template>
  <header class="header">

    <p class="header__title">
      Cart
    </p>

    <p
      class="header__button"
      @click="router.go(-1)"
    >
      Edit
    </p>

  </header>
</template>

<style scoped lang="scss">

.header {
  width: 100%;

  padding: 2.4rem;
  box-sizing: border-box;

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 0 0 1.6rem 1.6rem;
  background: var(--white-color);

  /* shadow lg */
  box-shadow: 0 12px 16px -4px rgba(54, 54, 171, 0.08),
    0px 4px 6px -2px rgba(54, 54, 171, 0.03);

  &__title {
    margin: 0;
    color: var(--black-color);
    font: 500 normal 2.4rem/1.5 Inter, sans-serif;
  }

  &__button {
    margin: 0;
    color: var(--dark-color);
    font: 500 normal 1.4rem/1.5 Inter, sans-serif;
  }
}

</style>

<script setup lang="ts">
const scrolled = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 0;
  });
});

const { isEmpty } = useCartStore();
</script>

<template>
  <client-only>
    <OrderHeader :scrolled="scrolled" />
    <DishesList v-if="!isEmpty()" />
    <EmptyScreen v-else />
    <OrderFooter />
  </client-only>
</template>

<style scoped lang="scss">
.cart {
  padding: 10.8rem 2.4rem 20rem 2.4rem;

  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.2rem;

  &__instructions {
    max-width: 60ch;
    color: var(--dark-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__error {
    margin: 2.4rem 0;
    max-width: 60ch;
    color: var(--red-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }
}
</style>

<script setup lang="ts">
const { priceSum, customItems } = useCartStore();

const isActive = computed(() => {
  const matches = priceSum().match(/\d+\.?\d*/g) ?? ["0"];
  const num = parseFloat(matches[0]);
  return num !== 0;
});
</script>

<template>
  <section :class="['order', { order_active: isActive }]">
    <button class="order__button" @click="navigateTo('/cart-pre')">
      <span>View basket</span>

      <span class="order__price">{{ priceSum() }}</span>
    </button>
  </section>
</template>

<style scoped lang="scss">
.order {
  width: 100%;

  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem 1rem 2rem 1rem;

  background: var(--white-color);

  translate: 0 100%;

  transition: all 0.2s ease;

  &_active {
    translate: 0 0;
  }

  &__button {
    width: 100%;

    padding: 1.6rem 1.6rem 1.6rem 2.4rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: var(--white-color);
    font: 700 normal 1.8rem/1 Inter, sans-serif;

    border: none;
    background: var(--dark-color);
    border-radius: 50em;
  }

  &__price {
    padding: 0.7rem 1.6rem;
    background: var(--primary-color);
    border-radius: 50em;
  }
}
</style>

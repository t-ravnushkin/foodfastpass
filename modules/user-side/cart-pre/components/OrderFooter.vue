<script setup lang="ts">
const { priceSum, isEmpty } = useCartStore();
</script>

<template>
  <footer class="footer" v-if="!isEmpty()">
    <p class="footer__total">Total</p>

    <p class="footer__price">{{ priceSum() }}</p>

    <button
      :class="['footer__checkout-button']"
      @click="navigateTo('/checkout')"
    >
      Checkout
    </button>
  </footer>
  <footer v-else class="footer">
    <button class="footer__checkout-button" @click="navigateTo('/')">
      Back to main page
    </button>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100%;

  position: fixed;
  bottom: 0;
  left: 0;

  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.12);

  padding: 24px;
  padding-top: 8px;

  display: grid;
  grid-template-areas:
    "total price"
    "button button";
  row-gap: 15px;
  grid-template-rows: auto auto;

  background: var(--white-color);

  z-index: 5000;

  &__total {
    grid-area: total;

    color: var(--medium-color);
    font: 500 normal 2rem/1.5 Inter, sans-serif;
  }

  &__price {
    grid-area: price;

    justify-self: end;

    color: var(--dark-color);
    font: 500 normal 2rem/1.5 Inter, sans-serif;
  }

  &__checkout-button {
    grid-area: button;

    width: 100%;
    padding: 1.2rem 2rem;

    height: 58px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    color: var(--white-color);

    border: none;
    border-radius: 12px;
    background: var(--dark-color);

    font: 500 normal 1.8rem/1.5 Inter, sans-serif;

    transition: all ease 0.2s;

    &_disabled {
      background: var(--medium-color);
    }
  }
}
</style>

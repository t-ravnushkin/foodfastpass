<script setup lang="ts">
const props = defineProps<{
  totalPrice: string;
  readyForCheckout: boolean;
  discountedPrice: string;
}>();

const emits = defineEmits<{
  submit: [];
}>();

const onConfirmation = ref(false);
</script>

<template>
  <footer class="footer">
    <p class="footer__total">Total</p>

    <p v-if="!discountedPrice" class="footer__price">{{ totalPrice }}</p>
    <p v-else class="footer__price">
      <s>{{ totalPrice }}</s> {{ discountedPrice }}
    </p>

    <button
      v-if="!onConfirmation || !readyForCheckout"
      :class="[
        'footer__checkout-button',
        { 'footer__checkout-button_disabled': !readyForCheckout },
      ]"
      @click="readyForCheckout ? (onConfirmation = true) : ''"
    >
      Checkout
    </button>
    <Confirmation
      v-else
      @confirm="onConfirmation = false; emits('submit')"
      @cancel="onConfirmation = false"
    />
  </footer>
</template>

<style scoped lang="scss">
.footer {
  width: 100vw;
  padding: 2.4rem;

  position: fixed;
  bottom: 0;
  left: 0;

  display: grid;
  grid:
    "total price" auto
    "button button" auto
    / auto auto;
  gap: 3.2rem 0;
  place-content: space-between;

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

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    color: var(--white-color);

    border: none;
    border-radius: 0.8rem;
    background: var(--dark-color);

    font: 500 normal 1.8rem/1.5 Inter, sans-serif;

    transition: all ease 0.2s;

    &_disabled {
      background: var(--medium-color);
    }
  }
}
</style>

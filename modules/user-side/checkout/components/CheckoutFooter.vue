<script setup lang="ts">
const props = defineProps<{
  totalPrice: string;
  readyForCheckout: boolean;
  discountedPrice: string;
  processing: boolean;
}>();

const emits = defineEmits<{
  submit: [];
}>();

const onConfirmation = ref(false);
</script>

<template>
  <footer class="footer">
    <p class="footer__total">Total</p>

    <p class="footer__price" v-if="!discountedPrice">{{ totalPrice }}</p>
    <p class="footer__price" v-else>
      <s>{{ totalPrice }}</s> {{ discountedPrice }}
    </p>

    <button
      v-if="(!onConfirmation || !readyForCheckout) && !processing"
      :class="[
        'footer__checkout-button',
        { 'footer__checkout-button_disabled': !readyForCheckout },
      ]"
      @click="readyForCheckout ? (onConfirmation = true) : ''"
    >
      Checkout
    </button>
    <button
      v-else-if="processing"
      class="footer__checkout-button footer__checkout-button_disabled"
    >
      Processing...
    </button>
    <Confirmation
      v-else
      @confirm="
        onConfirmation = false;
        emits('submit');
      "
      @cancel="onConfirmation = false"
    />
  </footer>
</template>

<style scoped lang="scss">
.footer {
  @media screen and (max-height: 480px) {
    display: none;
  }

  width: 100%;

  position: absolute;
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

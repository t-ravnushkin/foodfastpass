<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";

defineExpose({
  payWithCard,
});

const cardElement = ref();

const stripe = await loadStripe(useRuntimeConfig().public.publishableKey);

const elements = stripe?.elements();

const cardStyle = {
  base: {
    color: "#32325d",
    fontFamily: "Arial, sans-serif",
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#a9b7c4",
    },
    borderBottom: "1px solid #a9b7c4",
  },
  invalid: {
    fontFamily: "Arial, sans-serif",
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

const card = elements?.create("card", { style: cardStyle });

onMounted(() => {
  card?.mount(cardElement.value);
});

async function payWithCard(clientSecret: string): Promise<any> {
  const result = await stripe?.confirmCardPayment(clientSecret, {
    payment_method: {
      card,
    },
  });

  return result;
}
</script>

<template>
  <form id="payment-form" class="form">
    <div ref="cardElement" id="card-element" class="form__card">
      <!-- Stripe.js injects the card element here. -->
    </div>
  </form>
  <p class="form__text">
    All the payments are securely processed through Stripe.
  </p>
  <p class="form__text" style="margin-top: -25px;">We do&nbsp;<u>not</u> &nbsp;store your card details.</p>
</template>

<style scoped lang="scss">
.form {
  width: 100%;
  margin-top: 41px;
  padding: 8px;
  box-shadow: 0px 1px 3px rgba(230, 235, 241, 0.25);
  color: #a9b7c4;

  &__text {
    width: 100%;
    margin-top: -20px;
    padding-left: 8px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    align-items: center;
    color: #a0a0a0;
  }
}
</style>

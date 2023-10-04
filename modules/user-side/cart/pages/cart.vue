<script setup lang="ts">
import { request } from "http";

const stripeForm = ref();

const currentTimeslot = ref({
  start: "13:55",
  end: "14:00",
});

const coupon = ref("");

const {
  priceSum,
  discountedPriceSum,
  isCheckoutReady,
  cart,
  discount,
  refresh: refreshCart,
} = useCartStore();

const clientSecret = ref("");

const error = ref(false);
const promocodeError = ref(false);
const promocodeSuccess = ref(false);

async function checkPromocode() {
  const { data, error } = await useCustomFetch("/order/PromoCodeInfo/", {
    method: "POST",
    body: {
      promocode: coupon.value,
      restaurant: Object.values(cart.value)[0].dish.restaurantName,
    },
  });
  discount.value = 0;
  if (data.value === -1) {
    promocodeError.value = true;
    return;
  }
  promocodeSuccess.value = true;
  discount.value = data.value.discount;
}

watch(coupon, () => {
promocodeError.value = false;
promocodeSuccess.value = false;
});

async function handlePostOrder() {
  const { response, requestError } = await postOrder(
    coupon.value,
    currentTimeslot.value.start
  );
  console.log(response);
  console.log(requestError);
  if (requestError !== null || response === "-1") {
    error.value = true;
    return;
  }

  clientSecret.value = response ?? "";

  try {
    const result = await stripeForm.value.payWithCard(response ?? "");
    if (result.hasOwnProperty("error")) {
      error.value = true;
      return;
    }
  } catch (e) {
    error.value = true;
    return;
  }

  error.value = false;

  await submitOrder();

  refreshCart();

  navigateTo("/");
}
</script>

<template>
  <client-only>
    <article class="cart" v-if="cart">
      <CartHeader />

      <PositionsList />

      <TimeSlots v-model:time-slot="currentTimeslot" />

      <CouponForm v-model:coupon="coupon" :error="promocodeError" :success="promocodeSuccess" @check-promocode="checkPromocode" :disabled="promocodeSuccess || promocodeError" />

      <p class="cart__instructions">
        Every dish in the order must be ordered at the same restaurant and
        restaurant's meal time: breakfast, lunch or dinner.
      </p>

      <p v-if="error" class="cart__error">
        Sorry, we can't proceed now. Please check your card number or try again
        later.
      </p>

      <StripeForm ref="stripeForm" />

      <CartFooter
        :total-price="priceSum()"
        :discounted-price="discount ? discountedPriceSum(): ''"
        :ready-for-checkout="isCheckoutReady()"
        @submit="handlePostOrder"
      />
    </article>
  </client-only>
</template>

<style scoped lang="scss">
.cart {
  padding: 10.8rem 2.4rem 20rem 2.4rem;

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

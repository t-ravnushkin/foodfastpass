<script setup lang="ts">
import { request } from "http";
import { client } from "process";

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

const restaurantName = computed(() => {
  return Object.values(cart.value)[0].dish?.restaurantName;
});

const clientSecret = ref("");

const error = ref(false);
const promocodeError = ref(false);
const promocodeSuccess = ref(false);

const wrongTimeError = ref(false);
const onProcessing = ref(false);

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
  discount.value = 0;
});

async function handlePostOrder() {
  onProcessing.value = true;
  wrongTimeError.value = false;
  error.value = false;
  try {
    const { response, requestError } = await postOrder(
      coupon.value,
      currentTimeslot.value.start
    );
    clientSecret.value = response ?? "";
    if (requestError !== null || response === "-1") {
      onProcessing.value;
      wrongTimeError.value = true;
      return;
    }
  } catch (e) {
    onProcessing.value = false;
    wrongTimeError.value = true;
    return;
  }

  try {
    const result = await stripeForm.value.payWithCard(clientSecret.value ?? "");
    if (result.hasOwnProperty("error")) {
      onProcessing.value = false;
      error.value = true;
      return;
    }
  } catch (e) {
    onProcessing.value = false;
    error.value = true;
    return;
  }

  error.value = false;

  console.log("Submitting order...");
  await submitOrder();

  console.log("Order submitted!");
  refreshCart();

  navigateTo("/");
}
</script>

<template>
  <client-only>
    <article class="cart" v-if="cart">
      <CartHeader />

      <PositionsList />

      <TimeSlots
        v-model:time-slot="currentTimeslot"
        :restaurant-name="restaurantName"
      />

      <CouponForm
        v-model:coupon="coupon"
        :error="promocodeError"
        :success="promocodeSuccess"
        @check-promocode="checkPromocode"
        :disabled="promocodeSuccess || promocodeError"
      />

      <p class="cart__instructions">
        Every dish in the order must be ordered at the same restaurant and
        restaurant's meal time: breakfast, lunch or dinner.
      </p>

      <p v-if="error" class="cart__error">
        Sorry, we can't proceed now. Please check your card number or try again
        later.
      </p>
      <p v-if="wrongTimeError" class="cart__error">
        Order can’t be placed because it contains products from different menus
        or times.
      </p>

      <StripeForm ref="stripeForm" />

      <CartFooter
        :total-price="priceSum()"
        :discounted-price="discount ? discountedPriceSum() : ''"
        :ready-for-checkout="isCheckoutReady()"
        :processing="onProcessing"
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

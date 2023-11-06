<script setup lang="ts">
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
  if (!verifyCart()) {
    hasOutOfStock.value = true;
    return;
  }
  onProcessing.value = true;
  wrongTimeError.value = false;
  error.value = false;
  try {
    const { response, requestError } = await postOrder(
      coupon.value,
      currentTimeslot.value.start,
      isTakeaway.value
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

const isTakeaway = ref(false);

const isTimeslotExpanded = ref(false);

const hasOutOfStock = ref(false);
</script>

<template>
  <client-only>
    <OutOfStockError v-model:open="hasOutOfStock" in-checkout />
    <CheckoutHeader :restaurantName="restaurantName" />
    <div class="checkout">
      <TakeAwayForm v-model="isTakeaway" />
      <TimeSlotForm
        style="margin-top: -16px"
        :restaurantName="restaurantName"
        v-model:timeSlot="currentTimeslot"
        v-model:isExpanded="isTimeslotExpanded"
      />
      <CheckoutCouponForm
        v-show="!isTimeslotExpanded"
        v-model:coupon="coupon"
        :error="promocodeError"
        :success="promocodeSuccess"
        @check-promocode="checkPromocode"
        :disabled="promocodeSuccess || promocodeError"
      />
      <CheckoutStripe v-if="!isTimeslotExpanded" ref="stripeForm" />
    </div>
    <CheckoutFooter
      :total-price="priceSum()"
      :discounted-price="discount ? discountedPriceSum() : ''"
      :ready-for-checkout="isCheckoutReady()"
      :processing="onProcessing"
      @submit="handlePostOrder"
    />
  </client-only>
</template>

<style scoped lang="scss">
.checkout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 27px;
  padding-left: 16.5px;
  padding-right: 15.5px;
  padding-top: 12px;
}
</style>

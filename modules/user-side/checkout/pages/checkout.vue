<script setup lang="ts">
await verifyCart();

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
  getRestaurantName,
} = useCartStore();

const restaurantName = computed(() => {
  return getRestaurantName();
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
      restaurant: getRestaurantName(),
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

const hasTimeslotError = ref(false);

async function handlePostOrder() {
  const isCartOk = await verifyCart();
  if (!isCartOk) {
    hasOutOfStock.value = true;
    return;
  }
  await refreshNuxtData("timeSlotData");
  if (hasTimeslotError.value) {
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
    console.log("xhasdfh");
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

  await refreshNuxtData("userOrderList");
  navigateTo("/");
}

const isTakeaway = ref(false);

const isTimeslotExpanded = ref(false);

const hasOutOfStock = ref(false);

const timeslotform = ref(null);
</script>

<template>
  <client-only>
    <OutOfStockError v-model:open="hasOutOfStock" in-checkout />
    <TimeSlotErrorModal
      v-model:open="hasTimeslotError"
      @close="timeslotform.fixTimeSlot()"
    />
    <div class="checkout">
      <CheckoutHeader :restaurantName="restaurantName" />
      <div class="checkout_main">
        <TakeAwayForm style="margin-bottom: 10px" v-model="isTakeaway" />
        <TimeSlotForm
          :restaurantName="restaurantName"
          v-model:timeSlot="currentTimeslot"
          v-model:isExpanded="isTimeslotExpanded"
          v-model:has-timeslot-error="hasTimeslotError"
          ref="timeslotform"
        />
        <CheckoutCouponForm
          v-show="!isTimeslotExpanded"
          v-model:coupon="coupon"
          :error="promocodeError"
          :success="promocodeSuccess"
          @check-promocode="checkPromocode"
          :disabled="promocodeSuccess || promocodeError"
        />
        <CheckoutStripe v-show="!isTimeslotExpanded" ref="stripeForm" />
      </div>
      <CheckoutFooter
        :total-price="priceSum()"
        :discounted-price="discount ? discountedPriceSum() : ''"
        :ready-for-checkout="isCheckoutReady() && !hasTimeslotError"
        :processing="onProcessing"
        @submit="handlePostOrder"
      />
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.checkout {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &_main {
    height: calc(100vh - 84px - 135px);
    flex-shrink: 0;
    overflow: hidden;
    width: 100%;
    overflow: scroll;
    padding-left: 16.5px;
    padding-right: 15.5px;
    padding-top: 12px;
  }
}
</style>

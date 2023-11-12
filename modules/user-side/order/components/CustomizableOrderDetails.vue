<script setup lang="ts">
import { Dish } from "~/modules/user-side/menu/types";

defineProps<{
  cart: Object[];
  total: number;
  currency: string;
  discount: number;
}>();

type CurrencyMapType = {
  [key: string]: string;
};
const currencyMap: CurrencyMapType = {
  eur: "€",
  "€": "€",
};

const coupon = ref("NEWCUSTOMER");
</script>

<template>
  <section class="details">
    <p class="details__heading">Your order</p>

    <div class="details__container">
      <section class="details__dishes">
        <template v-for="product in cart" :key="product.dishId">
          <div class="details__dishes_dish">
            <p style="grid-area: quant">{{ product.quantity }}x</p>
            <p style="grid-area: name">{{ product.name }}</p>
            <p style="grid-area: price" class="details__price">
              {{ product.price }}
            </p>
            <div class="details__dishes_custom" v-if="product.custom">
              <template v-for="group in product.custom">
                <p v-for="item in group" :key="item">
                    <p v-if="item.taken">
                        {{ item.name }}
                    </p>
                    <p v-else>
                        <s>{{ item.name }}</s>
                    </p>
                </p>
              </template>
            </div>
          </div>
        </template>
      </section>

      <section class="details__summary-section">
        <div class="details__section-item">
          <p>Service fee</p>
          <p class="details__price">€0.00</p>
        </div>
        <!--<div v-if="coupon" class="details__section-item">
          <p>Promotions applied</p>
          <p class="details__coupon">{{ coupon }}</p>
          <p class="details__price">-€3.00</p>
        </div>-->
      </section>

      <section class="details__summary-section">
        <div class="details__section-item">
          <p>Total</p>
          <p class="details__price">
            {{
              cart?.length > 0
                ? currencyMap[currency] + total.toFixed(2)
                : "0.00"
            }}
          </p>
        </div>
        <div class="details__section-item">
          <p>Paid with ApplePay *1234</p>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
.details {
  margin: 0 0.8rem;

  &__heading {
    margin: 0 0 0.8rem 0.8rem;
    color: var(--black-color);
    font: 500 normal 2rem/1.2 Inter, sans-serif;
  }

  &__container {
    padding: 0.8rem;

    display: flex;
    flex-direction: column;
    gap: 1.6rem;

    border-radius: 0.8rem;
    background: var(--white-color);
    box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.1),
      0 2px 4px -2px rgba(54, 54, 171, 0.06);

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__dishes {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &_dish {
      width: 100%;
      display: grid;
      grid-template-areas: "quant name price" "quant custom custom";
      grid-template-columns: min-content auto min-content;
      grid-auto-rows: auto auto;
      gap: 0rem 0.8rem;
    }

    &_custom {
      display: flex;
      grid-area: custom;
      flex-direction: column;
      color: var(--dark-gray, #909090);
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 145%; /* 17.4px */
    }
  }

  &__price {
    color: var(--dark-color);
    white-space: nowrap;
  }

  &__summary-section {
    padding-top: 1.6rem;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    border-top: solid 0.1rem var(--light-gray-color);
  }

  &__section-item {
    display: flex;
    gap: 1.2rem;
    justify-content: space-between;
  }

  &__coupon {
    color: var(--green-color);
    font: 500 normal 1.2rem/2.4rem Inter, sans-serif;
    text-transform: capitalize;
  }
}
</style>

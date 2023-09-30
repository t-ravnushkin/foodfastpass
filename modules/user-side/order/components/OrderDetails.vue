<script setup lang="ts">

import { Dish } from '~/modules/user-side/menu/types';


defineProps<{
  cart: Dish[];
  quantities: {[i: number]: number};
}>();

type CurrencyMapType = {
  [key: string]: string;
}
const currencyMap: CurrencyMapType = {
  'eur': '€',
  '€': '€',
};


const coupon = ref('NEWCUSTOMER');


</script>

<template>
  <section class="details">

    <p class="details__heading">Your order</p>

    <div class="details__container">

      <section class="details__dishes">
        <template
          v-for="product in cart"
          :key="product.id"
        >
          <p>{{ quantities[product.id] }}x</p>
          <p>{{ product.name }}</p>
          <p class="details__price">
            {{ currencyMap[product.currency]
            + (product.price * quantities[product.id]).toFixed(2) }}
          </p>
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
          <p class="details__price">{{
            cart?.length > 0 ?
              currencyMap[cart[0].currency]
              + cart
                .reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)
                .toFixed(2) :
              '0.00'
          }}</p>
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
    box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.10),
    0 2px 4px -2px rgba(54, 54, 171, 0.06);

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__dishes {
    width: 100%;

    display: grid;
    grid-template-columns: min-content auto min-content;
    grid-auto-rows: auto;
    gap: 0.8rem 1.2rem;
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

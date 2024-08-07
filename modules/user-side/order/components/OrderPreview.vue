<script setup lang="ts">
import { Order } from "~/modules/user-side/order/types";
import { Restaurant } from "~/modules/user-side/restaurants/types";

defineProps<{
  order: Order;
}>();

const currencyMap = {
  eur: "€",
  "€": "€",
};

const restaurants = await getRestaurants();

function restaurantById(restaurantId: number): Restaurant | undefined {
  for (const restaurant of restaurants)
    if (restaurant.id === restaurantId) return restaurant;
}
</script>

<template>
  <section class="order">
    <ImgDefault
      :src="restaurantById(Number(order.rest))?.photo"
      :alt="restaurantById(Number(order.rest))?.name"
      class="order__image"
    />

    <p class="order__name">
      {{ restaurantById(Number(order.rest))?.name }} #{{ order.id }}
    </p>

    <p class="order__sub-info">
      {{
        order.products?.length > 0
          ? currencyMap[order.products[0].currency] +
            (
              order.products.reduce(
                (accumulator, currentValue) =>
                  accumulator +
                  Number(currentValue.price * order.quantity[currentValue.id]),
                0
              ) *
              (1 - order.discount / 100)
            ).toFixed(2)
          : "0.00"
      }}
      •
      {{ order?.state === "Confirm" ? "Collected" : order?.state }}
    </p>
  </section>
</template>

<style scoped lang="scss">
.order {
  margin: 0 2.4rem;
  padding: 0.8rem;

  display: grid;
  grid:
    "image main" auto
    "image sub" auto
    / 5.4rem auto max-content;
  gap: 0 1.2rem;
  place-items: center start;

  background: var(--white-color);
  /* shadow md */
  box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.1),
    0 2px 4px -2px rgba(54, 54, 171, 0.06);
  border-radius: 0.8rem;

  &__image {
    grid-area: image;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50em;
  }

  &__name {
    grid-area: main;
    color: var(--black-color);
    font: 500 normal 2rem/1.2 Inter, sans-serif;
    //word-break: break-word;
  }

  &__sub-info {
    grid-area: sub;
    color: var(--black-color);
    font: 400 normal 1.3rem/1.5 Inter, sans-serif;
  }
}
</style>

<script setup lang="ts">
import { Restaurant } from "~/modules/user-side/restaurants/types";

const orders = ref(
  await getOrders().then((orders) =>
    orders?.filter((order) => {
      return order?.active;
    })
  )
);

definePageMeta({
  middleware: () => {
    getOrders().then((ordersgot) => {
      orders.value = ordersgot
        ?.filter((order) => {
          return order?.active;
        });
    });
  },
});

const restaurants = await getRestaurants();

function restaurantById(restaurantId: number): Restaurant | undefined {
  for (const restaurant of restaurants)
    if (restaurant.id === restaurantId) return restaurant;
}
</script>

<template>
  <section v-if="orders?.length > 0" class="orders">
    <div
      v-for="order in orders?.sort((a, b) => new Date(a.timepayment) < new Date(b.timepayment) ? 1 : -1)"
      :key="order.id"
      class="orders__order"
      @click="$router.push(`/order/${order.id}`)"
    >
      <ImgDefault
        :src="restaurantById(Number(order.rest))?.photo"
        :alt="restaurantById(Number(order.rest))?.name"
        class="orders__image"
      />

      <p class="orders__name">
        {{ restaurantById(Number(order.rest))?.name }}
      </p>

      <p class="orders__timeslot">Pickup at {{ order?.timeSlot }}</p>

      <p class="orders__id">#{{ order.id }}</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.orders {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  &__order {
    margin: 0 2.4rem;
    padding: 0.8rem;

    display: grid;
    grid:
      "image name id" auto
      "image timeslot id" auto
      / 5.4rem auto max-content;
    gap: 0 1.2rem;
    place-items: center start;

    background: var(--white-color);
    /* shadow md */
    box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.1),
      0 2px 4px -2px rgba(54, 54, 171, 0.06);
    border-radius: 0.8rem;
  }

  &__image {
    grid-area: image;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50em;
  }

  &__name {
    grid-area: name;
    color: var(--black-color);
    font: 500 normal 2rem/1.2 Inter, sans-serif;
    //word-break: break-word;
  }

  &__timeslot {
    grid-area: timeslot;
    color: var(--dark-gray-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__id {
    grid-area: id;
    color: var(--black-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
  }
}
</style>

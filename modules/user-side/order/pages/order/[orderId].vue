<script setup lang="ts">

import { Restaurant } from '~/modules/user-side/restaurants/types';
import { Order } from '~/modules/user-side/order/types';


const restaurants = await getRestaurants();

const orders = await getOrders() ?? [];

const orderId = useRoute().params.orderId as string;

const order = getOrderById(orderId);

const restaurant = order?.rest ? getRestaurantById(Number(order?.rest)) : undefined;


function getRestaurantById(restaurantId: number): Restaurant | undefined {
  for (const restaurant of restaurants)
    if (restaurant.id === restaurantId)
      return restaurant;
}

function getOrderById(orderId: string): Order | undefined {
  for (const order of orders)
    if (order.id.toString() === orderId)
      return order;
}

</script>

<template>
  <article class="order">

    <HeaderForOrder/>

    <main class="order__main">
      <RestaurantInfo
        :restaurant="restaurant"
        :time-slot="order?.timeSlot"
      />
      <OrderDetails
        :cart="order?.products"
        :quantities="order?.quantity"
        :discount="order?.discount"
      />
      <CollectionDetails :collection-status="order?.timestamp ?? 'pending'"/>
    </main>

  </article>
</template>

<style scoped lang="scss">

.order {
  &__main {
    margin: 10.4rem 0 5.4rem 0;

    display: flex;
    flex-direction: column;
    gap: 5.4rem;
  }
}

</style>

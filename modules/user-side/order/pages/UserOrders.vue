<script setup lang="ts">

import OrderPreview from '~/modules/user-side/order/components/OrderPreview.vue';


const orders = await getOrders();


</script>

<template>
  <article class="orders">

    <OrdersHeader/>

    <main class="orders__main">

      <p class="orders__title">Recent orders</p>

      <OrderPreview
        v-for="order in orders?.sort((a, b) => Math.random() > 0.5 ? 1 : -1)"
        :key="order.id"
        :order="order"
        @click="$router.push(`/order/${order.id}`)"
      />

    </main>

  </article>
</template>

<style scoped lang="scss">

.orders {

  &__main {
    margin-top: 10.8rem;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  &__title {
    margin: 0 2.4rem;

    color: var(--black-color);
    font: 500 normal 2rem/1.5 Inter, sans-serif;
  }
}
</style>

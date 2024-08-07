<script setup lang="ts">

</script>

<template>
  <article class="orders">

    <HeaderForBOH/>

    <main class="orders__main">

      <client-only>
        <OrdersList/>
      </client-only>

      <!--      <div class="orders__complete">
              <DoneOrder
                v-for="order in doneOrders"
                :key="order.orderId"
                :order="order"
              />
            </div>-->

    </main>

  </article>
</template>

<style scoped lang="scss">

.orders {

  &__main {
    margin-top: 12rem;
  }

  &__complete {
    margin: 0 2.4rem 5.4rem 2.4rem;
    padding-bottom: 5.4rem;

    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
}

</style>
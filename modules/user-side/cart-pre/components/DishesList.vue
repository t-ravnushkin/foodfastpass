<script setup lang="ts">
const { cart: dishes } = useCartStore();
</script>

<template>
  <div id="dishList" class="dishes">
    <h1 class="dishes__title">Order</h1>
    <OrderPosition
      v-for="(position, id) in dishes"
      :key="id"
      :dish-id="Number(id)"
    />
  </div>
</template>

<style scoped lang="scss">
.dishes {
  width: 100%;

  position: absolute;
  top: 87px;

  padding: 24px;
  padding-top: 0;

  display: flex;
  flex-direction: column;

  &__title {
    /* Order */

    // position: relative;
    // width: 67px;
    // height: 36px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 150%;
    color: #000000;
    margin-bottom: 11px;
  }
}
</style>

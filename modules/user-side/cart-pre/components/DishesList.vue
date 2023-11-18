<script setup lang="ts">
const { cart: dishes, customItems } = useCartStore();

const customDish = useCustomDish();
</script>

<template>
  <CustomizationCard v-model:dish="customDish" in-cart />
  <div id="dishList" class="dishes">
    <h1 class="dishes__title">Order</h1>
    <OrderPosition v-for="(position, id) in dishes" :key="id" :dish-id="id" />
    <CustomizedPosition
      v-for="(item, position) in customItems"
      :key="position"
      :dish="item"
      @customize="customDish = item"
    />
  </div>
</template>

<style scoped lang="scss">
.dishes {
  width: 100%;

  padding: 0 24px;

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

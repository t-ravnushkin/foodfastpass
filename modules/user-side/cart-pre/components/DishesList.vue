<script setup lang="ts">
import { Dish } from "../../menu/types";

const { cart: dishes, customItems } = useCartStore();

const customDish = useCustomDish();

function handleClick(position: number) {
  if (!customItems.value[position].custom) return;
  for (const group in customItems.value[position].custom) {
    for (const item in customItems.value[position].custom[group].items) {
      if (!customItems.value[position].custom[group].items[item].available) {
        customItems.value[position].custom[group].items[item].removed = true;
      }
    }
  }
}
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
      @customize="
        handleClick(position);
        customDish = item;
      "
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

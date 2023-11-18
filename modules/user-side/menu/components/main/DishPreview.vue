<script setup lang="ts">
import type { Dish } from "~/modules/user-side/menu/types";

defineProps<{
  dish: Dish;
  isActive: boolean;
}>();

const customDish = useCustomDish();
</script>

<template>
  <div class="dish" v-show="isActive">
    <ImgDefault :src="dish.images[0]" :alt="dish.name" class="dish__image" />

    <p class="dish__price">
      {{ dish.price }}
    </p>

    <p class="dish__food-name">
      {{ dish.name }}
    </p>

    <div class="dish__button" @click.stop="customDish = dish" v-if="dish.inStock && dish.custom">
      <span>+</span>
      <span>Add</span>
    </div>
    <DishAddButton
      :dish="dish"
      class="dish__bottom-info"
      v-else-if="dish.inStock"
    />
    <p class="dish__out_of_stock" v-else>Out of stock</p>
  </div>
</template>

<style scoped lang="scss">
.dish {
  padding: 0.8rem;
  box-sizing: border-box;

  display: grid;
  grid: min-content auto min-content / auto;
  gap: 0.8rem;

  border-radius: 1.6rem;
  background: var(--white-color);

  /* shadow md */
  box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.1),
    0 2px 4px -2px rgba(54, 54, 171, 0.06);

  &__image {
    width: 100%;
    aspect-ratio: 1;

    border-radius: 0.8rem;
    object-fit: cover;
  }

  &__food-name {
    align-self: end;
    width: 100%;

    margin: 0;

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;

    word-break: break-word;
  }

  &__price {
    margin: 0;
    color: var(--dark-color);
    font: 600 normal 1.8rem/1.5 Inter, sans-serif;
  }

  &__button {
    width: 100%;
    height: 2.7rem;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;

    border: none;
    border-radius: 50em;
    background-color: #f2f2f2;
  }

  &__bottom-info {
    align-self: end;
  }

  &__out_of_stock {
    align-self: end;
    display: flex;
    justify-content: center;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 150%;
  }
}
</style>

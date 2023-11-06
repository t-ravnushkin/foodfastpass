<script setup lang="ts">
import { Dish } from "~/modules/user-side/menu/types";
const props = defineProps<{
  dish: Dish;
}>();

const emits = defineEmits(["customize"]);

const { cart, discount, add, remove, emptyDish } = useCartStore();

const outOfStockString = computed(() => {
  const outOfStockIngredients = getDishErrors(props.dish);
  if (outOfStockIngredients.length === 0) return "";
  return `Out of Stock: ${outOfStockIngredients.join(", ")}`;
});
</script>

<template>
  <li class="dish">
    <ImgDefault :src="dish.images[0]" :alt="dish.name" class="dish__image" />

    <p class="dish__title">{{ dish.name }}</p>

    <p v-if="!discount" class="dish__price">
      {{ dish.currency }}{{ dish.priceValue.toFixed(2) }}
    </p>
    <p v-else class="dish__price">
      <s>{{ dish.currency }}{{ dish.priceValue.toFixed(2) }}</s
      >{{ dish.currency
      }}{{ (dish.priceValue * (1 - discount / 100)).toFixed(2) }}
    </p>

    <p class="dish__errors" v-if="outOfStockString.length > 0">
      {{ outOfStockString }}
    </p>

    <div class="dish__rem_btn">
      <OrderCrossIcon @click="remove(dish)" v-if="dish.inStock" />
      <RedOrderCrossIcon @click="remove(dish)" v-else />
    </div>

    <div class="button-group" v-if="dish.inStock" @click="emits('customize')">
      <button class="button-group__button">Edit</button>
    </div>
    <p v-else class="dish__out">Out of stock</p>
  </li>
</template>

<style scoped lang="scss">
.dish {
  width: 100%;
  display: grid;
  grid-template-areas:
    "image title price"
    "image errors rem_btn"
    "image buttons buttons";
  grid-template-columns: 90px calc(100% - 130px - 2.4rem) 40px;
  grid-template-rows: auto auto 27px;
  gap: 0 1.2rem;

  margin-bottom: 24px;

  &__errors {
    width: 100%;
    grid-area: errors;
    color: #f00;
    font-family: Inter;
    font-size: 14px;
    overflow-wrap: break-word;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 21px */
  }

  &__out {
    grid-area: buttons;
    color: #f00;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
  }

  &__image {
    width: 8.16rem;
    height: 8.16rem;

    grid-area: image;

    border-radius: 0.8rem;
    object-fit: cover;
  }

  &__rem_btn {
    grid-area: rem_btn;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    margin: 0;
    color: var(--black-color);
    font: 400 normal 1.6rem/1.2 Inter, sans-serif;
    text-wrap: balance;

    grid-area: title;
  }

  &__price {
    grid-area: price;
    margin: 0;
    color: var(--dark-color);
    font: 500 normal 1.4rem Inter, sans-serif;
  }
}

.button-group {
  grid-area: buttons;
  background: #f2f2f2;
  border-radius: 30px;
  width: 155px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 6px;
  padding-right: 6px;

  user-select: none;

  &__button {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 15px;

    padding: 0.4rem 0.8rem;
    color: black;
    background: #f2f2f2;
    border: none;

    &:first-child {
      border-radius: 30px 0 0 30px;
    }
    &:last-child {
      border-radius: 0 30px 30px 0;
    }
  }
}
</style>

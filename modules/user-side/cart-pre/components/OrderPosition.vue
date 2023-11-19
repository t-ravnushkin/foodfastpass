<script setup lang="ts">
const props = defineProps<{
  dishId: number;
}>();

const { cart, discount, add, remove, emptyDish } = useCartStore();

const dish = cart.value[props.dishId].dish;
</script>

<template>
  <li class="dish">
    <ImgDefault :src="dish.images[0]" :alt="dish.name" class="dish__image" />

    <p class="dish__title">{{ dish.name }}</p>

    <p v-if="!discount" class="dish__price">
      {{ dish.currency
      }}{{ (dish.priceValue * cart[dishId].quantity).toFixed(2) }}
    </p>
    <p v-else class="dish__price">
      <s
        >{{ dish.currency
        }}{{ (dish.priceValue * cart[dishId].quantity).toFixed(2) }}</s
      >{{ dish.currency
      }}{{
        (
          dish.priceValue *
          (1 - discount / 100) *
          cart[dishId].quantity
        ).toFixed(2)
      }}
    </p>

    <div class="dish__rem_btn">
      <OrderCrossIcon @click="emptyDish(dishId)" v-if="dish.inStock" />
      <RedOrderCrossIcon @click="emptyDish(dishId)" v-else />
    </div>

    <div class="button-group" v-if="dish.inStock">
      <button class="button-group__button" @click="remove(dish)">
        <MinusIcon />
      </button>
      <button class="button-group__button">{{ cart[dishId].quantity }}</button>
      <button class="button-group__button" @click="add(dish)">
        <PlusIcon />
      </button>
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
    "image edit rem_btn"
    "image buttons buttons";
  grid-template-columns: 90px auto 40px;
  grid-template-rows: auto auto 27px;
  gap: 0 1.2rem;

  margin-bottom: 24px;

  &__out {
    grid-area: buttons;
    color: #f00;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
    display: flex;
    align-items: flex-end;
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
    color: #4300b8;
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
  justify-content: space-between;
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

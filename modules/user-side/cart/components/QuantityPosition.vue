<script setup lang="ts">

const props = defineProps<{
  dishId: number;
}>();

const {cart, discount, add, remove} = useCartStore();

const dish = cart.value[props.dishId].dish;

function smth() {
  console.log(dish.price);
}

</script>

<template>
  <li class="dish">

    <ImgDefault
      :src="dish.images[0]"
      :alt="dish.name"
      class="dish__image"
    />

    <p class="dish__title">{{dish.name}}</p>

    <p v-if="!discount" class="dish__price">{{dish.currency}}{{(dish.priceValue * cart[dishId].quantity).toFixed(2)}}</p>
    <p v-else class="dish__price"><s>{{dish.currency}}{{(dish.priceValue * cart[dishId].quantity).toFixed(2)}}</s>{{dish.currency}}{{((dish.priceValue * (1 - discount / 100)) * cart[dishId].quantity).toFixed(2)}}</p>

    <div class="button-group">
      <button class="button-group__button" @click="remove(dish)">-</button>
      <button class="button-group__button">{{cart[dishId].quantity}}</button>
      <button class="button-group__button" @click="add(dish)">+</button>
    </div>

  </li>
</template>

<style scoped lang="scss">

.dish {
  display: grid;
  grid: "image title price" 5.76rem
    "image buttons buttons" 2.4rem
    / 8.16rem auto min-content;
  gap: 0 1.2rem;

  &__image {
    width: 8.16rem;
    height: 8.16rem;

    grid-area: image;

    border-radius: 0.8rem;
    object-fit: cover;
  }

  &__title {
    margin: 0;
    color: var(--black-color);
    font: 400 normal 1.6rem/1.2 Inter, sans-serif;
    text-wrap: balance;

    grid-area: title;
  }

  &__price {
    margin: 0;
    color: var(--dark-color);
    font: 500 normal 1.4rem Inter, sans-serif;
  }
}

.button-group {
  width: max-content;
  background: var(--dark-color);
  border-radius: 50em;

  user-select: none;

  &__button {
    padding: 0.4rem 0.8rem;
    color: var(--white-color);
    background: var(--dark-color);
    border: none;

    &:first-child {
      border-radius: 1rem 0 0 1rem;
    }
    &:last-child {
      border-radius: 0 1rem 1rem 0;
    }
  }
}

</style>

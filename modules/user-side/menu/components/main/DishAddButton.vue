<script setup lang="ts">
import { Dish } from "~/modules/user-side/menu/types";

defineProps<{
  dish: Dish;
}>();

const { cart, add, remove } = useCartStore();
</script>

<template>
  <button
    v-if="(cart[dish.id]?.quantity ?? 0) === 0"
    class="button"
    @click.stop="add(dish)"
  >
    <span>+</span>
    <span>Add</span>
  </button>

  <div v-else class="buttons-group">
    <div @click.stop="remove(dish)">-</div>
    <div>{{ cart[dish.id].quantity }}</div>
    <div @click.stop="add(dish)">+</div>
  </div>
</template>

<style scoped lang="scss">
.button {
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
  background: #f2f2f2;
}

.buttons-group {
  height: 2.7rem;

  display: grid;
  grid: 2.7rem / 1fr 1fr 1fr;
  place-items: center;
  align-content: stretch;
  gap: 0.8rem;

  color: var(--black-color);
  font: 400 normal 1.6rem/1 Inter, sans-serif;

  background: #f2f2f2;
  border-radius: 50em;
}
</style>

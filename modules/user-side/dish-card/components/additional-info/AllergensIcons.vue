<script setup lang="ts">
import { Dish } from "../../../dish-card/types";

interface Props {
  dish: Dish;
}

defineProps<Props>();

const filterToVerboseMap = new Map([
  ["Gluten/Wheat", "Contains wheat"],
  ["Shellfish", "Contains shellfish"],
  ["Eggs", "Contains eggs"],
  ["Soya", "Contains soy"],
  ["Nuts", "Contains nuts"],
  ["Dairy", "Contains dairy"],
  ["Peanuts", "Contains peanuts"],
  ["Celery", "Contains celery"],
  ["Mustard", "Contains mustard"],
  ["Lupin", "Contains lupin"],
  ["Sulphites", "Contains sulphites"],
  ["Molluscs", "Contains molluscs"],
  ["Fish", "Contains fish"],
  ["Sesame", "Contains sesame"],
  ["Vegetarian", "Vegetarian"],
  ["Vegan", "Vegan"],
  ["Pescetarian", "Pescetarian"],
]);
</script>

<template>
  <div class="allergens-list">
    <template v-for="filter in dish.filters" :key="filter">
      <IconByFilter :filter="filter" class="allergens-list__icon" />

      <p class="allergens-list__description">
        {{ filterToVerboseMap.get(filter) ?? "" }}
      </p>
    </template>
  </div>
</template>

<style scoped lang="scss">
.allergens-list {
  display: grid;
  grid: repeat(auto-fit, 3.6rem) / 3.6rem auto;
  gap: 1.2rem 0.8rem;
  align-items: center;

  &__icon {
    width: 3.6rem;
    height: 3.6rem;
  }

  &__description {
    margin: 0;
    color: var(--green-color);
    font: 400 normal 1.8rem/1.5 Inter, sans-serif;
    text-align: start;
  }
}
</style>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { Collapse } from "vue-collapsed";

const { chosenMealType } = useFilters();

defineProps({
  mealTypes: Array<string>,
});

const isExpanded = ref(false);

function toggleMealTypes() {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="meal">
    <p class="meal__title">Today's menu</p>

    <div
      v-if="mealTypes.length > 1"
      class="meal__dropdown"
      @click="toggleMealTypes"
      v-on-click-outside="
        () => {
          if (isExpanded) toggleMealTypes();
        }
      "
    >
      <div class="meal__current-meal">
        <span class="meal__meal-type">{{ chosenMealType }}</span>
        <DropdownArrow
          class="meal__toggle-arrow"
          :class="{ 'meal__toggle-arrow_active': isExpanded }"
        />
      </div>

      <collapse :when="isExpanded" :style="{ transition: '0s' }">
        <div class="meal__available-meals">
          <span
            v-for="possibleMeal in mealTypes"
            :key="possibleMeal"
            class="meal__meal-type"
            :class="{
              'meal__meal-type_active': chosenMealType === possibleMeal,
            }"
            @click="chosenMealType = possibleMeal"
            >{{ possibleMeal }}</span
          >
        </div>
      </collapse>
    </div>
  </div>
</template>

<style scoped lang="scss">
.meal {
  height: 3.6rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    color: var(--black-color);
    font: 500 normal 2.4rem/1.5 Inter, sans-serif;
  }

  &__dropdown {
    width: 133.81px;

    margin-top: 0.2rem;

    position: relative;

    display: flex;
    flex-flow: column nowrap;
    align-self: flex-start;
    gap: 0.8rem;

    z-index: 1000;
  }

  &__current-meal {
    padding: 0.2rem 0.8rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border-radius: 0.8rem;
    border: 1.5px solid var(--light-color);
    background: var(--white-color);
  }

  &__available-meals {
    padding: 0.2rem 0.8rem;

    display: flex;
    flex-flow: column nowrap;
    gap: 0.2rem;

    border-radius: 0.8rem;
    border: 1.5px solid var(--light-color);
    background: var(--white-color);
  }

  &__meal-type {
    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;

    &_active {
      color: var(--dark-color);
      font-weight: 500;
    }
  }

  &__toggle-arrow {
    transition: all 0.2s ease;

    &_active {
      transform: rotateX(180deg);
    }
  }
}
</style>

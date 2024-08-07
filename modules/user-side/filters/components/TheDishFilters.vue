<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";

defineProps<{
  isActive: boolean;
}>();

const emits = defineEmits<{
  "update:isActive": [value: boolean];
}>();

const { diets, allergens, chosenDiets, chosenAllergens, chosenRating, reset } =
  useFilters();

const verboseDiets = new Map([
  ["Vegan", "Vegan"],
  ["Vegetarian", "Vegetarian"],
  ["Pescetarian", "Pescetarian"],
]);

const verboseAllergens = new Map([
  ["Gluten/Wheat", "Wheat free"],
  ["Shellfish", "Shellfish free"],
  ["Eggs", "Eggs free"],
  ["Soya", "Soy free"],
  ["Nuts", "Nuts free"],
  ["Dairy", "Dairy free"],
  ["Peanuts", "Peanuts free"],
  ["Celery", "Celery free"],
  ["Mustard", "Mustard free"],
  ["Lupin", "Lupin free"],
  ["Sulphites", "Sulphites free"],
  ["Molluscs", "Molluscs free"],
  ["Fish", "Fish free"],
  ["Sesame", "Sesame free"],
]);

const filters = ref();

const isResettable = computed(() => {
  return (
    chosenDiets.length > 0 ||
    chosenAllergens.length > 0 ||
    chosenRating.value > 0
  );
});

function hideFilters() {
  emits("update:isActive", false);

  setTimeout(() => {
    if (filters?.value?.scrollTop) filters.value.scrollTop = 0;
  }, 500);
}
</script>

<template>
  <section
    ref="filters"
    v-on-click-outside="hideFilters"
    class="filters"
    :class="{ filters_active: isActive }"
  >
    <FiltersHeader
      :is-resettable="isResettable"
      class="filters__header"
      @reset="reset"
      @exit="emits('update:isActive', false)"
    />

    <GroupCheckboxes
      title="Diets"
      :toggleable="diets"
      :verbose-map="verboseDiets"
      :toggled="chosenDiets"
    />

    <GroupCheckboxes
      title="Allergens"
      :toggleable="allergens"
      :verbose-map="verboseAllergens"
      :toggled="chosenAllergens"
    />

    <RatingFilter v-model:rating-value="chosenRating" />

    <ApplyButton class="filters__apply-button" @click="hideFilters" />
  </section>
</template>

<style scoped lang="scss">
.filters {
  width: calc(100% - 2.4rem);
  height: calc(100dvh);

  padding: 1.6rem;
  box-sizing: border-box;

  position: fixed;
  bottom: 0;
  right: -100%;

  display: flex;
  flex-flow: column nowrap;
  gap: 3.2rem;

  border-radius: 1.6rem 0 0 1.6rem;
  background: var(--white-color);

  /* shadow 3xl */
  box-shadow: 0 32px 64px -12px rgba(54, 54, 171, 0.14);

  overflow-y: scroll;

  z-index: 2000;

  transition: all 0.5s ease;

  &_active {
    right: 0;
  }

  &__apply-button {
    margin-top: 6.4rem;
  }
}
</style>

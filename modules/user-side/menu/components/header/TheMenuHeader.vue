<script setup lang="ts">
defineProps<{
  restaurantName: string;
  isSideBarActive: boolean;
}>();

const emits = defineEmits<{
  "update:isSideBarActive": [value: boolean];
}>();

const { filtersAmount } = useFilters();

const showFilters = inject("showFilters") as Function;
</script>

<template>
  <header class="header">
    <BoldArrow @click="$router.go(-1)" />

    <h1 class="header__title">
      {{ restaurantName }}
    </h1>

    <div class="header__filter-icon-container">
      <FiltersIcon
        class="header__filter"
        :color="filtersAmount > 0 ? 'var(--dark-color)' : 'var(--black-color)'"
        @click="showFilters"
      />

      <div v-if="filtersAmount > 0" class="header__filters-count">
        <span>{{ filtersAmount }}</span>
      </div>
    </div>

    <CategoriesSlider class="header__slider" />
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;

  padding: 2.4rem 2.4rem 0.8rem 2.4rem;
  box-sizing: border-box;

  position: fixed;
  top: 0;

  display: grid;
  grid:
    "return title filter"
    "slider slider slider" / 2rem auto 2rem;
  align-items: center;
  gap: 1.6rem;

  border-radius: 0 0 1.6rem 1.6rem;
  background: var(--white-color);

  /* shadow lg */
  box-shadow: 0 12px 16px -4px rgba(54, 54, 171, 0.08),
    0 4px 6px -2px rgba(54, 54, 171, 0.03);

  z-index: 2000;
  user-select: none;

  &__title {
    grid-area: title;
    color: var(--black-color);
    font: 500 normal 2.4rem/1.5 Inter, sans-serif;
    text-align: center;
  }

  &__filter {
    grid-area: filter;
  }

  &__filters-count {
    width: 1.6rem;
    height: 1.6rem;

    position: absolute;
    bottom: 1.5rem;
    left: 1.7rem;

    padding: 0.35rem;

    color: var(--white-color);
    background: var(--dark-color);
    border-radius: 50em;

    font: 400 normal 1rem/1 Inter, sans-serif;
    text-align: center;
  }

  &__filter-icon-container {
    grid-area: filter;
    position: relative;

    display: grid;
    place-items: center;
  }

  &__slider {
    grid-area: slider;
    place-self: center start;
  }
}
</style>

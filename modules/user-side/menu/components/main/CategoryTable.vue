<script setup lang="ts">
import type { Dish } from "~/modules/user-side/menu/types";

const props = defineProps<{
  categoryName: string;
  dishes: Dish[];
}>();

const table = ref();

const { chosenAllergens, areFiltersApproved } = useFilters();

const { scrollSetCategory } = useCategoryScrollObserver();

const showDishCard = inject("showDishCard") as Function;

const onMenuScroll = inject("onMenuScroll") as Function;

onMenuScroll((scroll: number) => {
  const top = table.value.offsetTop - scroll;
  const bottom = top + table.value.clientHeight;

  if (top < 150 && 150 < bottom) scrollSetCategory(props.categoryName);
});

function handleDishSelect(dish: Dish) {
  useCurrentDish(dish);
  showDishCard();
}
</script>

<template>
  <section
    ref="table"
    v-show="dishes.some((dish) => areFiltersApproved(dish))"
    class="table"
  >
    <header class="table__table-name">
      {{ categoryName }}
    </header>

    <main class="table__dishes">
      <DishPreview
        v-for="dish in dishes"
        :key="dish.id"
        :dish="dish"
        :is-active="areFiltersApproved(dish)"
        @click="handleDishSelect(dish)"
      />
    </main>
  </section>
</template>

<style scoped lang="scss">
.table {
  width: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  filter: drop-shadow(1px -1px 6px rgba(54, 54, 171, 0.1))
    drop-shadow(0px 4px 4px rgba(54, 54, 171, 0.25));

  &__table-name {
    height: min-content;

    padding: 0.6rem 0.8rem 0.2rem 0.8rem;

    color: var(--black-color);
    font: 300 normal 1.8rem/1.5 Inter, sans-serif;

    white-space: nowrap;

    border-radius: 1.6rem 1.6rem 0 0;
    background: var(--white-color);
    //border: 1.5px solid var(--light-color);
  }

  &__dishes {
    width: 100%;

    padding: 0.8rem;
    box-sizing: border-box;

    display: grid;
    grid: auto / repeat(auto-fill, minmax(13rem, 1fr));
    gap: 1.2rem;

    border-radius: 0 1.6rem 1.6rem 1.6rem;
    background: var(--white-color);
    //border-left: 1.5px solid var(--light-color);
  }
}
</style>

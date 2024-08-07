<script setup lang="ts">
import type { Categories, Dish } from "~/modules/menu/types";

interface Props {
  categories: Categories;
  allDishes: Dish[];
  isEmpty: boolean;
}

const props = defineProps<Props>();

const categoriesElements = {} as {
  [category: string]: ComponentPublicInstance;
};

const { onHandCategorySet } = useCategoryScrollObserver();

const setScrollTop = inject("setScrollTop") as Function;

onHandCategorySet((category) => {
  setScrollTop(categoriesElements[category].$el.offsetTop);
});

const hasDishes = ref(true);
const { chosenMealType } = useFilters();
watch([chosenMealType, props.allDishes], () => {
  console.log("Watched");
  for (const dish of props.allDishes) {
    if (dish.mealTypes.includes(chosenMealType.value)) {
      hasDishes.value = true;
      return;
    }
  }
  hasDishes.value = false;
});
</script>

<template>
  <main class="menu-list">
    <NotToday v-if="isEmpty" />
    <EmptyMenuType v-else-if="!hasDishes" />
    <CategoryTable
      v-else
      v-for="(dishes, categoryName) in categories"
      :key="categoryName"
      :ref="
        (el) => {
          categoriesElements[categoryName] = el;
        }
      "
      :category-name="categoryName"
      :dishes="dishes"
      class="menu-list__card"
    />
  </main>
</template>

<style scoped lang="scss">
.menu-list {
  position: relative;

  display: grid;
  grid: repeat(auto-fit, auto) / auto;
  gap: 4.8rem;
}
</style>

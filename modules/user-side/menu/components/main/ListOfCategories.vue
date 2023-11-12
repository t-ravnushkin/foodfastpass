<script setup lang="ts">
import type { Categories } from "~/modules/menu/types";

interface Props {
  categories: Ref<Categories>;
  isEmpty?: boolean;
}

defineProps<Props>();

const categoriesElements = {} as {
  [category: string]: ComponentPublicInstance;
};

const { onHandCategorySet } = useCategoryScrollObserver();

const setScrollTop = inject("setScrollTop") as Function;

onHandCategorySet((category) => {
  setScrollTop(categoriesElements[category].$el.offsetTop);
});
</script>

<template>
  <main class="menu-list">
    <CategoryTable
      v-if="!isEmpty"
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
    <NotToday v-else />
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

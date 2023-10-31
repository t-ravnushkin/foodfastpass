<script setup lang="ts">
import { Restaurant } from "~/modules/user-side/restaurants/types";

const restaurantName = useRoute().params.restaurantName as string;

const categories = useCategories(restaurantName);

const { chosenMealType, onFiltersChange } = useFilters();

const mealTypes = useMenuTypes(restaurantName);

// const mealTypes = useRestaurantByName(restaurantName).allMenuTypes;

const menu = ref();

const dishCard = ref();

const header = ref();

const isSidebarActive = ref(false);

const areFiltersActive = ref(false);

const menuScroll = createEventHook();

const { height: headerHeight } = useElementBounding(header);

provide("showDishCard", showDishCard);
provide("showFilters", showFilters);
provide("setScrollTop", setScrollTop);
provide("onMenuScroll", menuScroll.on);

useEventListener(menu, "scroll", useThrottleFn(onMenuScroll, 100));

onFiltersChange(() => {
  onMenuScroll();
});

function showDishCard() {
  dishCard.value.showContent();
}

function showFilters() {
  areFiltersActive.value = true;
}

function setScrollTop(scroll: number) {
  menu.value.scrollTop = scroll + 64;
}

function onMenuScroll() {
  menuScroll.trigger(menu.value.scrollTop);
}

const currentDish = useCurrentDish();
</script>

<template>
  <article ref="menu" class="menu">
    <TheMenuHeader
      ref="header"
      :restaurant-name="restaurantName"
      v-model:is-side-bar-active="isSidebarActive"
    />

    <SideBar
      v-model:is-active="isSidebarActive"
      v-model:are-filters-active="areFiltersActive"
    />

    <MealType class="menu__meal" :meal-types="mealTypes" />

    <ListOfCategories :categories="categories" class="menu__categories" />

    <TheDishFilters v-model:is-active="areFiltersActive" />

    <NewDishCard @close="currentDish = null" :dish="currentDish" />

    <!-- <Teleport to="body">
      <DishCard ref="dishCard" :dish="useCurrentDish()" />
    </Teleport> -->

    <OrderPlate />

    <TheMenuFooter class="menu__footer" />
  </article>
</template>

<style scoped lang="scss">
.menu {
  --header-height: v-bind(headerHeight);

  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow-y: scroll;

  scroll-behavior: smooth;

  &__header {
    box-sizing: border-box;
  }

  &__meal {
    margin: calc(var(--header-height) * 1px + 2.4rem) 2.4rem 2.4rem 2.4rem;
  }

  &__categories {
    margin: 0 1.6rem 9.6rem 1.5rem;
  }
}
</style>

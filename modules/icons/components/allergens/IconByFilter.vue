<script setup lang="ts">
import Dairy from "./Dairy.vue";
import Eggs from "./Eggs.vue";
import Nuts from "./Nuts.vue";
import Peanuts from "./Peanuts.vue";
import Shellfish from "./Shellfish.vue";
import Soy from "./Soy.vue";
import Vegan from "./Vegan.vue";
import Vegetarian from "./Vegetarian.vue";
import Wheat from "./Wheat.vue";

import Celery from "./Celery.vue";
import Mustard from "./Mustard.vue";
import Lupin from "./Lupin.vue";
import Sulphites from "./Sulphites.vue";
import Molluscs from "./Molluscs.vue";
import Sesame from "./Sesame.vue";
import Fish from "./Fish.vue";
import Pescetarian from "./Pescetarian.vue";

interface Props {
  filter: string;
}

const props = defineProps<Props>();

const filterToIcon = {
  "Gluten/Wheat": Wheat,
  Shellfish: Shellfish,
  Eggs: Eggs,
  Soya: Soy,
  Nuts: Nuts,
  Dairy: Dairy,
  Peanuts: Peanuts,
  Vegetarian: Vegetarian,
  Vegan: Vegan,
  Celery: Celery,
  Mustard: Mustard,
  Lupin: Lupin,
  Sulphites: Sulphites,
  Molluscs: Molluscs,
  Sesame: Sesame,
  Fish: Fish,
  Pescetarian: Pescetarian,
};
</script>

<template>
  <component :is="filterToIcon[filter]"></component>
</template>

<style scoped lang="scss"></style>

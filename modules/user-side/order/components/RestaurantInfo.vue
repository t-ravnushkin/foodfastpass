<script setup lang="ts">

import type { Restaurant } from '~/modules/user-side/restaurants/types';


defineProps<{
  restaurant?: Restaurant;
  timeSlot: string;
}>();

</script>

<template>
  <section class="restaurant">

    <ImgDefault
      :src="restaurant?.photo"
      :alt="restaurant?.name"
      class="restaurant__image"
    />

    <p class="restaurant__name">
      {{ restaurant?.name }}
    </p>

    <p class="restaurant__timeslot">
      Pickup at {{ timeSlot }}
    </p>

    <a
      :href="restaurant?.address"
      class="restaurant__directions"
    >
      Get directions
    </a>

  </section>
</template>

<style scoped lang="scss">

.restaurant {
  margin: 0 0.8rem;
  padding: 0.8rem;

  display: grid;
  grid: "image name directions" auto
        "image timeslot directions" auto
        / 5.4rem auto max-content;
  gap: 0 1.2rem;
  place-items: center start;

  background: var(--white-color);
  /* shadow md */
  box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.10),
  0 2px 4px -2px rgba(54, 54, 171, 0.06);
  border-radius: 0.8rem;

  &__image {
    grid-area: image;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50em;
  }

  &__name {
    grid-area: name;
    color: var(--black-color);
    font: 500 normal 2rem/1.2 Inter, sans-serif;
    word-break: break-word;
  }

  &__timeslot {
    grid-area: timeslot;
    color: var(--dark-gray-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__directions {
    grid-area: directions;
    color: var(--black-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
    text-decoration: underline;
  }

}

</style>

<script setup lang="ts">

import type { Restaurant } from '~/modules/user-side/restaurants/types';


const props = defineProps<{
  restaurant: Restaurant;
}>();

</script>

<template>
  <div
    ref="restaurantCard"
    class="card"
  >

    <ImgDefault
      :src="props.restaurant.photo"
      :alt="restaurant.name"
      class="card__photo"
    />

    <div class="card__info">

      <h3 class="card__name">
        {{ restaurant.name }}
      </h3>

      <a
        :href="restaurant.address"
        class="card__link"
        @click.stop
      >
        Get directions
      </a>

    </div>

  </div>
</template>

<style scoped lang="scss">

.card {
  width: 100%;

  background: var(--white-color);
  border-radius: 16px;
  box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.10),
  0 2px 4px -2px rgba(54, 54, 171, 0.06);

  overflow: hidden;

  &__photo {
    width: 100%;
    height: 16rem;
    object-fit: cover;
  }

  &__info {
    width: 100%;
    padding: 0 .8rem .6rem .8rem;

    bottom: 0;
    left: 0;

    background: var(--white-color);

    z-index: 100;
  }

  &__name {
    color: var(--black-color);
    font: 500 normal 2.4rem/1.5 Inter, sans-serif;

    background-color: var(--white-color);
    border-radius: 0 8px 0 16px;
  }

  &__link {
    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
  }
}

</style>

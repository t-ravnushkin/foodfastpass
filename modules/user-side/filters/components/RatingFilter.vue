<script setup lang="ts">
interface Props {
  ratingValue: number;
}

interface Emits {
  "update:ratingValue": [value: number];
}

defineProps<Props>();

const emits = defineEmits<Emits>();
</script>

<template>
  <div class="star-rating">
    <p class="star-rating__name">Rating</p>

    <div class="star-rating__stars-container">
      <svg
        v-for="num in 5"
        :key="num"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="star-rating__star"
        :class="{ 'star-rating__star_active': ratingValue >= num }"
        @click="emits('update:ratingValue', num)"
      >
        <g>
          <path
            d="
          m10.201,.758
          l2.478,5.865 6.344,.545
          c0.44,0.038 0.619,0.587 0.285,0.876
          l-4.812,4.169 1.442,6.202
          c0.1,0.431-0.367,0.77-0.745,0.541
          l-5.452-3.288-5.452,3.288
          c-0.379,0.228-0.845-0.111-0.745-0.541
          l1.442-6.202-4.813-4.17
          c-0.334-0.289-0.156-0.838 0.285-0.876
          l6.344-.545 2.478-5.864
          c0.172-0.408 0.749-0.408 0.921,0
          z
          "
          />
        </g>
      </svg>

      <p class="star-rating__label">&up</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.star-rating {
  &__name {
    margin: 0 0 1.6rem 0;
    color: var(--medium-color);
    font: 500 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__stars-container {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }

  &__star {
    width: 2rem;
    height: 2rem;

    fill: var(--white-color);
    stroke: #4300b8;
    stroke-width: 0.2rem;

    transition: all ease 0.2s;

    &_active {
      fill: #4300b8;
    }
  }

  &__label {
    margin: 0 0 0 0.4rem;
    color: #000;
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
  }
}
</style>

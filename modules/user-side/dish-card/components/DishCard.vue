<script setup lang="ts">
import type { Dish } from "~/modules/user-side/menu/types";

interface Props {
  dish: Ref<Dish | null>;
}

defineProps<Props>();

const card = ref();

const currentSection = ref(1);

const { showContent, hideContent, onShow, onHide } = useSwipeCard(card);

onShow(() => {
  document.body.style.overscrollBehavior = "none";
});

onHide(() => {
  document.body.style.overscrollBehavior = "auto";
  currentSection.value = 1;
});

provide("hideCard", hideContent);

defineExpose({
  showContent,
});
</script>

<template>
  <article ref="card" class="card">
    <hr class="card__top-bar" />

    <Carousel
      v-if="dish.value"
      v-model="currentSection"
      class="card__container"
    >
      <Slide key="imagesGallery" class="card__slide">
        <ImagesGallery :dish="dish.value" />
      </Slide>

      <Slide key="mainInfo" class="card__slide">
        <MainInfo :dish="dish.value" />
      </Slide>

      <Slide key="additionalInfo" class="card__slide">
        <AdditionalInfo :dish="dish.value" />
      </Slide>
    </Carousel>

    <CardNavigation
      v-model:section-index="currentSection"
      class="card__navigation"
    />
  </article>
</template>

<style scoped lang="scss">
.card {
  --hat-height: 2.4rem;
  --navigation-height: 8.2rem;

  width: 100%;
  height: 100dvh;

  padding: 0 2.4rem;
  box-sizing: border-box;

  position: relative;

  background: var(--white-color);

  z-index: 9000;

  &__top-bar {
    width: 6.7rem;

    margin: 1.2rem auto 0.7rem auto;

    border: none;
    border-top: 0.5rem solid var(--white-color);
    border-radius: 50em;

    box-shadow: 0 4px 8px -2px rgba(54, 54, 171, 0.1),
      0 2px 4px -2px rgba(54, 54, 171, 0.06);
  }

  &__container {
    height: calc(100svh - var(--hat-height));

    padding-bottom: var(--navigation-height);
    box-sizing: border-box;

    background: var(--white-color);
    border-radius: 2.4rem 2.4rem 0 0;

    /* shadow 3xl */
    box-shadow: 0 32px 64px -12px rgba(54, 54, 171, 0.14);
  }

  &__navigation {
    position: absolute;
    top: calc(100dvh - 6.4rem);
    left: 50%;

    translate: -50%;
  }
}
</style>

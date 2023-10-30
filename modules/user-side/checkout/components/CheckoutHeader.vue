<script setup lang="ts">
const props = defineProps<{
  restaurantName: string;
}>();

const router = useRouter();
</script>

<template>
  <div class="header">
    <BoldArrow @click="router.go(-1)" />
    <p class="header__title">{{ restaurantName }}</p>
    <div />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 84px;
  padding: 24px;
  box-shadow: 0px 4px 6px -2px rgba(54, 54, 171, 0.03),
    0px 12px 16px -4px rgba(54, 54, 171, 0.08);

  &__title {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
  }
}
</style>

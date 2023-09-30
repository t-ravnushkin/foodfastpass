<script setup lang="ts">

defineProps<{
  coupon: string;
}>();

const emits = defineEmits<{
  'update:coupon': [value: string];
}>();

</script>

<template>
  <div class="coupon">

    <label
      for="coupon"
      class="coupon__label"
    >
      Coupon
    </label>

    <input
      type="text"
      name="coupon"
      id="coupon"
      placeholder="coupon"
      :value="coupon"
      :size="Math.max(coupon.length, 1)"
      class="coupon__input"
      @input="event => emits('update:coupon', (event.target as HTMLInputElement)?.value)"
    >

  </div>
</template>

<style scoped lang="scss">

.coupon {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__label {
    color: var(--black-color);
    font: 400 normal 1.8rem/1.5 Inter, sans-serif;
  }

  &__input {
    min-width: 6rem;
    max-width: 100%;

    padding: 0.2rem 0.8rem;

    color: var(--black-color);
    font: 400 normal 1.2rem/1.5 Inter, sans-serif;

    border-radius: 0.4rem;
    border: 1px solid var(--light-color);

    &:focus {
      outline: none;
    }
  }
}

</style>

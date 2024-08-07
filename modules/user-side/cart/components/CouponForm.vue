<script setup lang="ts">
defineProps<{
  coupon: string;
  error: boolean;
  disabled: boolean;
  success: boolean;
}>();

const emits = defineEmits<{
  "update:coupon": [value: string];
  checkPromocode: [];
}>();
</script>

<template>
  <div class="coupon">
    <label for="coupon" class="coupon__label"> Promocode </label>

    <div style="width: 100%; display: flex; justify-content: end">
      <input
        type="text"
        name="coupon"
        id="coupon"
        placeholder="promocode"
        :value="coupon"
        :size="Math.max(coupon.length, 1)"
        class="coupon__input"
        :style="{
          'border-color': error
            ? 'var(--red-color)'
            : success
            ? 'var(--green-color)'
            : '',
        }"
        @input="event => emits('update:coupon', (event.target as HTMLInputElement)?.value)"
      />
      <button
        class="coupon__promocode_button"
        @click="emits('checkPromocode')"
        :class="{ coupon__promocode_button_disabled: disabled }"
        :disabled="disabled"
      >
        Apply
      </button>
    </div>
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
    min-width: 32%;
    max-width: 100%;
    height: 40px;

    padding: 0.2rem 0.8rem;

    color: var(--black-color);
    font: 400 normal 1.2rem/1.5 Inter, sans-serif;

    border-radius: 0.4rem;
    border: 1px solid var(--light-color);

    &:focus {
      outline: none;
    }
  }

  &__promocode_button {
    grid-area: button;

    width: 25%;
    height: 40px;
    margin-left: 10px;
    // padding: 1.2rem 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    color: var(--white-color);

    border: none;
    border-radius: 0.8rem;
    background: var(--dark-color);

    font: 500 normal 1.6rem/1.5 Inter, sans-serif;

    transition: all ease 0.2s;

    &_disabled {
      background: var(--medium-color);
    }
  }
}
</style>

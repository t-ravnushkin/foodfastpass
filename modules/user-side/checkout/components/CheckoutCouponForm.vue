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
    <div class="coupon__container">
      <input
        type="text"
        name="coupon"
        id="coupon"
        placeholder="Enter promocode"
        :value="coupon"
        class="coupon__input"
        @input="event => emits('update:coupon', (event.target as HTMLInputElement)?.value)"
      />
      <p
        v-if="coupon.length > 0 && !success"
        class="coupon__apply"
        @click="$emit('checkPromocode')"
      >
        Apply
      </p>
      <p
        v-else-if="coupon.length > 0 && success"
        class="coupon__apply_disabled"
      >
        Applied
      </p>
    </div>
    <p v-if="error" class="coupon__error">Promocode is not valid. Try again</p>
  </div>
</template>

<style scoped lang="scss">
.coupon {
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 0;
  margin-top: 38px;
  margin-bottom: 68px;

  &__container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 8px;
    padding-right: 19.5px;
  }

  &__input {
    border: none;
    border-bottom: 0.5px solid #aeaeae;
    padding: 5px;
    padding-left: 7px;
    width: 68%;

    &:focus {
      outline: none;
    }
  }

  &__apply {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #3636ab;
  }

  &__apply_disabled {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a0a0a0;
    margin-right: -11.5px;
  }

  &__error {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #a0a0a0;
    margin-top: 4px;
    margin-left: 15.5px;
  }
}
</style>

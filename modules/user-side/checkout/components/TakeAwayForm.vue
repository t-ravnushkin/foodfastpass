<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>();
const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="takeaway">
    <p class="takeaway__text">How do you want to collect it?</p>
    <div class="takeaway__button" @click="$emit('update:modelValue', false)">
      <p class="takeaway__button__text">Eat-in</p>
      <div
        :class="{
          takeaway__button__circle_unchecked: modelValue,
          takeaway__button__circle_checked: !modelValue,
        }"
      ></div>
    </div>
    <div class="takeaway__button" @click="$emit('update:modelValue', true)">
      <p class="takeaway__button__text">Takeaway</p>
      <div
        :class="{
          takeaway__button__circle_unchecked: !modelValue,
          takeaway__button__circle_checked: modelValue,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.takeaway {
  display: flex;
  flex-direction: column;
  gap: 7px;
  align-items: left;
  width: 100%;
  padding: 8px;

  &__text {
    margin-left: 2px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    height: 44px;
    display: flex;
    align-items: center;
  }

  &__button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding-left: 12px;
    padding-right: 10px;

    width: 100%;
    border-radius: 8px;
    background-color: #f1f1f1;
    height: 40px;

    &__text {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
    }

    &__circle_unchecked {
      width: 12px;
      height: 12px;
      border-radius: 100px;
      border: 1px solid black;
    }

    &__circle_checked {
      width: 12px;
      height: 12px;
      border-radius: 100px;
      background-color: var(--dark-color);
    }
  }
}
</style>

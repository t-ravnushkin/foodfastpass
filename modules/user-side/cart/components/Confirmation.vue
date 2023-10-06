<script setup>
const emits = defineEmits(["cancel", "confirm"]);
</script>

<template>
  <div class="confirmation">
    <button @click="emits('confirm')" class="confirmation__button">
      Confirm
    </button>
    <button @click="emits('cancel')" class="confirmation__button">
      Cancel
    </button>
  </div>
</template>

<style scoped lang="scss">
.confirmation {
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  &__text {
    color: var(--dark-color);
    font: 500 normal 2rem/1.5 Inter, sans-serif;
    width: 100%;
    align-self: center;
  }
  &__button {
    padding: 1.2rem 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    color: var(--white-color);

    border: none;
    border-radius: 0.8rem;
    background: var(--dark-color);

    font: 500 normal 1.8rem/1.5 Inter, sans-serif;

    transition: all ease 0.2s;
  }
}
</style>

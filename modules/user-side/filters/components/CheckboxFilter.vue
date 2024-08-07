<script setup lang="ts">

interface Props {
  filterName: string;
  isActive: boolean;
}

interface Emits {
  toggle: [ value: boolean ];
}

const props = defineProps<Props>();

const emits = defineEmits<Emits>();

</script>

<template>
  <div
    class="filter"
    @click="emits('toggle', isActive);"
  >

    <input
      ref="checkbox"
      type="checkbox"
      class="filter__checkbox"
      :checked="isActive"
    >

    <p class="filter__name">
      {{ filterName }}
    </p>

  </div>
</template>

<style scoped lang="scss">

.filter {
  display: inline-flex;
  align-items: center;
  gap: 1.2rem;

  &__checkbox {
    appearance: none;
    pointer-events: none;

    width: 1.6rem;
    height: 1.6rem;

    margin: 0;

    display: grid;
    place-items: center;

    border-radius: 4px;
    border: 1px solid #000;

    &::before {
      content: '';

      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all .2s ease;

      background: url('assets/icons/checkbox.svg') center/cover no-repeat;
      border: 1px solid #4300b8;
      border-radius: 4px;
    }

    &:checked::before {
      opacity: 1;
    }
  }

  &__name {
    margin: 0;
    color: #000;
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
  }
}


</style>

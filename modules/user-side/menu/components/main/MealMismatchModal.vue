<script setup lang="ts">
import { Dish } from "~/modules/user-side/menu/types";

const { suspendedDish, clear, add, currentMealType } = useCartStore();
const { chosenMealType } = useFilters();

function handleConfirm() {
  clear();
  add(suspendedDish.value as Dish);
  suspendedDish.value = null;
}
</script>

<template>
  <Teleport to="body" v-if="suspendedDish">
    <div class="modal-background" @click="suspendedDish = null">
      <div class="modal" @click.stop>
        <p class="modal__title">
          You have some {{ currentMealType }} items in the basket. If you wish
          to order {{ chosenMealType }}, you have to clear the basket.
        </p>
        <button
          class="modal__button_cancel"
          @click="
            suspendedDish = null;
            chosenMealType = currentMealType;
          "
        >
          Cancel
        </button>
        <button class="modal__button_confirm" @click="handleConfirm">
          Clear basket
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  z-index: 10000;
  background-color: white;
  width: 291px;
  height: 165.5px;
  flex-shrink: 0;
  border-radius: 18px;

  padding: 17.5px;

  display: grid;
  grid-template-areas: "title title" "confirm cancel";
  grid-template-rows: auto 45px;
  column-gap: 16px;

  &__title {
    width: 256px;
    height: 64px;
    grid-area: title;
    color: #000;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  }

  &__button_cancel {
    grid-area: cancel;
    height: 45px;
    width: 120px;
    background-color: #dadada;
    border-radius: 12px;
    border-style: none;

    color: black;
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
  }

  &__button_confirm {
    grid-area: confirm;
    height: 45px;
    width: 120px;
    background-color: var(--dark-color);
    border-radius: 12px;
    border-style: none;

    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    color: white;
  }
}
</style>

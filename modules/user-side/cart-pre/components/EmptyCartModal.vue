<script setup lang="ts">
const open = ref(false);
const { clear } = useCartStore();

function emptyCart() {
  clear();
  open.value = false;
}
</script>

<template>
  <TrashCan @click="open = true" />
  <Teleport to="body" v-if="open">
    <div class="modal-background" @click="open = false">
      <div class="modal" @click.stop>
        <p class="modal__title">Empty cart?</p>
        <button class="modal__button_cancel" @click="open = false">
          Cancel
        </button>
        <button class="modal__button_confirm" @click="emptyCart">Yes</button>
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
  height: 100dvh;
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
  height: 118px;
  border-radius: 18px;

  padding: 13px 17px;

  display: grid;
  grid-template-areas: "title title" "confirm cancel";
  grid-template-rows: auto 45px;
  column-gap: 16px;

  &__title {
    grid-area: title;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 150%;
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

<script setup lang="ts">
const props = defineProps<{
  inCheckout?: boolean;
  open: boolean;
}>();
const emits = defineEmits(["update:open"]);

function handleClose() {
  emits("update:open", false);
  if (props.inCheckout) navigateTo("/cart-pre/");
}
</script>

<template>
  <Teleport to="body" v-if="open">
    <div class="backdrop" @click="handleClose">
      <div class="modal" @click.stop>
        <p class="modal_text">
          One or more items in your cart are out of stock. Please remove them
        </p>
        <button class="modal_button" @click="handleClose" v-if="!inCheckout">
          Ok
        </button>
        <button class="modal_button" @click="handleClose" v-else>
          Back to cart
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  width: 291px;
  height: 133px;
  border-radius: 18px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 15px 19px;
  z-index: 2001;

  &_text {
    width: 100%;
    color: #000;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 22.5px */
  }

  &_button {
    width: 100%;
    height: 39px;
    background: #d4d4d4;
    color: #000;
    font-family: Inter;
    border-radius: 12px;
    border: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 21px */
  }
}
</style>

<script setup lang="ts">
const scrolled = ref(false);

onMounted(() => {
  document.querySelector(".cart_main")?.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 0;
  });
});

await verifyCart();

const { isEmpty } = useCartStore();
</script>

<template>
  <client-only>
    <div class="cart">
      <OrderHeader :scrolled="scrolled" />
      <div
        class="cart_main"
        @scroll="(e: Event) => (scrolled = (e.target as HTMLElement).scrollTop > 0)"
      >
        <DishesList v-if="!isEmpty()" />
        <EmptyScreen v-else />
      </div>
      <OrderFooter />
    </div>
  </client-only>
</template>

<style scoped lang="scss">
.cart {
  height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;

  &_main {
    height: calc(100dvh - 22px - 127px);
    overflow: scroll;
  }
}
</style>

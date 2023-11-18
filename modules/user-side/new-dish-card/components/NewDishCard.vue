<script setup lang="ts">
onMounted(() => {
  document.body.style.overscrollBehavior = "none";
});

import type { Dish } from "~/modules/user-side/menu/types";

const props = defineProps<{
  dish: Ref<Dish | null>;
}>();

function customize() {
  emits("customize", props.dish);
  close();
}

const emits = defineEmits(["close", "customize"]);

const { cart, add, remove } = useCartStore();

function close() {
  emits("close");
}

const swipeTarget = ref<HTMLElement | null>(null);
const containerHeight = computed(() => swipeTarget.value?.offsetHeight ?? 0);
const bottom = ref("0");
// const { direction, lengthX, lengthY } = useSwipe(swipeTarget, {
//   onSwipe(e: TouchEvent) {
//     if (containerHeight.value) {
//       if (lengthY.value < 0) {
//         bottom.value = `${lengthY.value}px`;
//       }
//     }
//   },
//   onSwipeEnd(e: TouchEvent) {
//     if (containerHeight.value) {
//       if (
//         lengthY.value >= 0 ||
//         Math.abs(lengthY.value) < containerHeight.value / 4
//       ) {
//         bottom.value = "0";
//       } else {
//         bottom.value = "0";
//         close();
//       }
//     }
//   },
// });
</script>

<template>
  <Teleport to="body">
    <div class="backdrop" @click="close" v-if="dish"></div>
    <Transition name="slide">
      <div
        ref="swipeTarget"
        :style="{ bottom }"
        class="card"
        @click="close"
        v-if="dish"
      >
        <div class="card__up_rect"></div>
        <div class="card__main" @click.stop>
          <ImgDefault
            :src="dish.images[0]"
            :alt="dish.name"
            class="card__main_image"
          />
          <div class="card__close" @click.stop="close">
            <OrderCrossIcon />
          </div>
          <div class="card__main_content">
            <div class="card__main_content_name_price">
              <p class="card__main_content_name">{{ dish.name }}</p>
              <p class="card__main_content_price">
                {{ dish.price }}
              </p>
            </div>
            <p class="card__main_content_contains">Contains:</p>
            <div class="card__main_content_allergen_list">
              <div
                v-for="filter in dish.filters"
                :key="filter"
                class="card__main_content_allergen"
              >
                <IconByFilter
                  :filter="filter"
                  class="card__main_content_allergen_icon"
                />
                <p class="card__main_content_allergen_text">
                  {{ filter === "Gluten/Wheat" ? "Gluten" : filter }}
                </p>
              </div>
            </div>
            <div class="card__buttons" v-if="dish.inStock && !dish.custom">
              <div
                class="card__buttons_add_container"
                v-if="(cart[dish.id]?.quantity ?? 0) === 0"
                @click.stop="add(dish)"
              >
                <div class="card__buttons_add">
                  <PlusIcon
                    size="15"
                    color="white"
                  />
                  <p>Add</p>
                </div>
              </div>
              <div
                class="card__buttons_minus"
                v-if="(cart[dish.id]?.quantity ?? 0) > 0"
                @click.stop="remove(dish)"
              >
                <MinusIcon size="15" color="white" />
              </div>
              <p v-if="(cart[dish.id]?.quantity ?? 0) > 0">
                {{ cart[dish.id]?.quantity }}
              </p>
              <div
                class="card__buttons_plus"
                v-if="(cart[dish.id]?.quantity ?? 0) > 0"
                @click.stop="add(dish)"
              >
                <PlusIcon
                  v-if="(cart[dish.id]?.quantity ?? 0) > 0"
                  size="15"
                  color="white"
                  @click.stop="add(dish)"
                />
              </div>
            </div>
            <div class="card__buttons" v-else-if="dish.inStock && dish.custom">
              <div
                class="card__buttons_add_container"
                @click.stop="customize()"
              >
                <p>Customize</p>
              </div>
            </div>
            <div class="card__buttons card__buttons_out" v-else>
              <p>Out of stock</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.slide-enter-active {
  transition: all 0.1s ease-out;
}

.slide-leave-active {
  transition: all 0.1s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}

.backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
}

.card {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2100;
  height: 519px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &__close {
    position: absolute;
    right: 13px;
    top: 21px;
    opacity: 85%;
    border-radius: 100px;
    background-color: #fff;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }

  &__buttons {
    height: 52px;
    width: calc(100% + 6px);
    border-radius: 30px;
    background-color: var(--dark-color);
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;

    &_add {
      display: flex;
      justify-content: space-between;
      width: 61px;
    }

    &_add_container {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &_minus {
      width: 45%;
      display: flex;
      justify-content: flex-start;
    }

    &_plus {
      width: 45%;
      display: flex;
      justify-content: flex-end;
    }

    &_out {
      background: #f1f1f1;
      display: flex;
      justify-content: center;
      color: black;
    }
  }

  &__up_rect {
    width: 45px;
    height: 5px;
    border-radius: 100px;
    background: #9f9f9f;
  }

  &__main {
    height: 508px;
    background-color: white;
    width: 100%;
    border-radius: 22px 22px 0px 0px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &_image {
      width: 100%;
      height: 236.202px;
      object-fit: cover;
      border-radius: 22px 22px 0px 0px;
    }

    &_content {
      width: 100%;
      height: 100%;
      padding: 10px;
      padding-bottom: 25px;

      display: flex;
      flex-direction: column;
      align-items: center;

      &_name_price {
        width: 100%;
        height: 82px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      &_name {
        color: #000;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        width: 230px;
      }

      &_price {
        padding-top: 10px;
        padding-left: 10px;
        color: var(--dark-color, #3636ab);
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 100%;
      }

      &_contains {
        color: #9a9a9a;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
        width: 100%;
        margin-bottom: 5px;
      }

      &_allergen_list {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 17px;
        margin-bottom: 22px;
      }

      &_allergen {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 52px;
      }

      &_allergen_icon {
        width: 34px;
        height: 34px;
      }

      &_allergen_text {
        color: #000;
        font-family: Inter;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }
    }
  }
}
</style>

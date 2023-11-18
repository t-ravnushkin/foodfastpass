<script setup lang="ts">
onMounted(() => {
  document.body.style.overscrollBehavior = "none";
});

import type { Dish } from "~/modules/user-side/menu/types";

const props = defineProps<{
  dish: Ref<Dish | null>;
  inCart?: boolean;
}>();
const emits = defineEmits(["update:dish"]);

const { cart, add, remove } = useCartStore();

function close() {
  emits("update:dish", null);
}

const swipeTarget = ref<HTMLElement | null>(null);
const containerHeight = computed(
  () => document.getElementsByClassName("card")[0].clientHeight
);
const bottom = ref("0");
const { direction, lengthX, lengthY } = useSwipe(swipeTarget, {
  onSwipe(e: TouchEvent) {
    if (containerHeight.value) {
      if (lengthY.value < 0) {
        bottom.value = `${lengthY.value}px`;
      }
    }
  },
  onSwipeEnd(e: TouchEvent) {
    if (containerHeight.value) {
      if (
        lengthY.value >= 0 ||
        Math.abs(lengthY.value) < containerHeight.value / 4
      ) {
        bottom.value = "0";
      } else {
        bottom.value = "0";
        close();
      }
    }
  },
});
</script>

<template>
  <Teleport to="body">
    <div class="backdrop" @click="close" v-if="dish"></div>
    <Transition name="slide">
      <div :style="{ bottom }" class="card" @click="close" v-if="dish">
        <div class="card__up_rect"></div>
        <div class="card__main" @click.stop>
          <ImgDefault
            ref="swipeTarget"
            :src="dish.images[0]"
            :alt="dish.name"
            class="card__main_image"
          />
          <div class="card__close" @click.stop="close">
            <OrderCrossIcon />
          </div>
          <div class="card__name_container">
            <p class="card__name_container_text">{{ dish.name }}</p>
            <p class="card__name_container_price">{{ dish.price }}</p>
          </div>
          <div class="ingredients">
            <div class="ingredients__group" v-for="group in dish.custom">
              <div
                class="ingredients__group_item"
                v-for="item in group.items"
                @click.stop="
                  if (item.available || (!item.available && !item.removed))
                    item.removed = !item.removed;
                "
              >
                <p
                  :class="{
                    ingredients__group_item_disabled:
                      !item.available && item.removed,
                    ingredients__group_item_error:
                      !item.available && !item.removed,
                  }"
                >
                  {{ item.name }}
                </p>
                <IngredientCheckbox
                  :disabled="!item.available && item.removed"
                  :checked="!item.removed"
                />
              </div>
            </div>
          </div>
          <div class="card__footer">
            <div class="card__buttons" v-if="dish.inStock && !inCart">
              <div
                class="card__buttons_add_container"
                v-if="(cart[dish.id]?.quantity ?? 0) === 0"
                @click.stop="
                  add(dish);
                  close();
                "
              >
                <div class="card__buttons_add">
                  <PlusIcon size="15" color="white" />
                  <p>Add</p>
                </div>
              </div>
            </div>
            <div
              class="card__buttons"
              @click.stop="close()"
              v-else-if="dish.inStock && inCart"
            >
              <p>Save</p>
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
.ingredients {
  width: 100%;
  height: calc(100% - 236.202px - 131px - 49px);
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 0 17px;

  &__group {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    gap: 8.5px;
    border-bottom: 1px solid #d7d7d7;
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 27px */

    &:last-child {
      border-bottom: none;
    }

    &_item {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &_error {
        color: red;
      }

      &_disabled {
        color: #a5a5a5;
      }
    }
  }
}

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
  height: calc(100% - 65px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &__buttons {
    height: 52px;
    width: calc(100% + 6px);
    border-radius: 30px;
    background-color: var(--dark-color);
    padding: 0 20px;
    display: flex;
    justify-content: center;
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
      color: black;
    }
  }

  &__button {
    display: flex;
    width: 379px;
    height: 52px;
    padding: 0px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    background: var(--dark-color, #3636ab);
    gap: 7px;
    flex-shrink: 0;

    &_text {
      color: #fff;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 30px */
    }
  }

  &__name_container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: 17px;
    padding-right: 10px;
    height: 49px;

    box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.05),
      0px 2px 4px -2px rgba(54, 54, 171, 0.04);

    &_text {
      color: #000;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%; /* 30px */
    }

    &_price {
      color: var(--dark-color, #3636ab);
      font-family: Inter;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 100%; /* 18px */
    }
  }

  &__footer {
    left: 0;
    width: 100%;
    bottom: 0;
    display: flex;
    padding: 10px 7px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 131px;
    box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.1);
  }

  &__close {
    position: absolute;
    right: 13px;
    top: 13px;
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

  &__up_rect {
    width: 45px;
    height: 5px;
    margin-top: 3px;
    position: fixed;
    border-radius: 100px;
    background: #9f9f9f;
  }

  &__main {
    height: 100%;
    background-color: white;
    width: 100%;
    border-radius: 22px 22px 0px 0px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

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

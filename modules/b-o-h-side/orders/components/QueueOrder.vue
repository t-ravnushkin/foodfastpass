<script setup lang="ts">

import type { Order } from '~/modules/b-o-h-side/orders/types';


const props = defineProps<{
  order: Order,
  openedOrderId : Number,
  setOpenedOrderId : Function,
  orderStatusChanged : Function
}>();


const now = useNow();

const refreshOrders = inject('refreshOrders');


function isSoon(timeSlot: string) {
  const [ hour, minute ] = timeSlot.split(':').map(n => parseInt(n));

  const hourDifference = hour - now.value.getHours();
  const minutesDifference = hourDifference * 60 + minute - now.value.getMinutes();
  // console.log(minutesDifference)
  return Math.abs(minutesDifference) < 10;
}

function getStateClass(){
  if(props.order.state === "Prepared"){
    return "prepared"
  }else if(props.order.state === "Cooking"){
    if(isSoon(props.order.timeSlot)){
      return "soon"
    }
  }
  return ""
}
const loading = ref(false)
function button_finished(new_state : string){
  loading.value = false
  props.orderStatusChanged(props.order.id, new_state)
}
function go_prepare(){
  loading.value = true
  postPrepareOrder(props.order.id, () => button_finished("Prepared"))
}

function go_confirm(){
  loading.value = true
  postConfirmOrder(props.order.id, () => button_finished("Confirm"))
}
function orderClicked(){
  if(props.openedOrderId === props.order.id){
    props.setOpenedOrderId(-1)
  }else{
    props.setOpenedOrderId(props.order.id)
  }
}
function getProductText(product : Object){
  const customs = []
  if(product.custom){
    for(let i in product.custom){
      for(let j in product.custom[i]){
        if(product.custom[i][j].taken){
          customs.push(product.custom[i][j].name)
        }
      }
    }
  }
  let res = product.name
  if(customs.length > 0){
    res += " ("
    res += customs.join(",")
    res += ")"
  }
  return res
}
</script>

<template>
  <section @click="orderClicked" :class="['order', getStateClass()]">
 
    <div class="order__info">

      <p class="order__number">#{{ order.id }}{{ (order.takeaway ? "T" : "") }}</p>

      <div class="order__dishes">
        <div
          v-for="product in order.customizableOrder"
          :key="product.dishName"
          class="order__position"
        >
          <p class="order__quantity">{{ order.quantity[product.id] }}x</p>
          <p class="order__dish-name">
            {{ getProductText(product) }}
          </p>
        </div>
      </div>

      <p :class="['order__timeslot',
      getStateClass()
       ]">
        {{ order.timeSlot }}
      </p>

    </div>
    <template v-if="openedOrderId == order.id">
      <button v-if="order.state === 'Cooking'" :disabled="loading"
        class="order__button"
        @click="go_prepare"
      >
        <span>Prepared</span>
        <CompleteIcon/>
      </button>
      <button v-else :disabled="loading"
        class="order__button"
        @click="go_confirm"
      >
        <span>Confirm</span>
        <CompleteIcon/>
      </button>
    </template>

  </section>
</template>

<style scoped lang="scss">

.order {
  font-family: 'Inter';
  padding: 2.4rem;

  border-radius: 1.6rem;
  background: var(--white-color);

  /* shadow lg */
  box-shadow: 0 12px 16px -4px rgba(54, 54, 171, 0.08),
  0 4px 6px -2px rgba(54, 54, 171, 0.03);

  &__info {
    // margin-bottom: 5.4rem;

    display: grid;
    grid: auto / 6.4rem auto 6.4rem;
    place-content: space-between;
  }

  &__number {
    color: var(--black-color);
    font: 400 normal 3.6rem Inter, sans-serif;
  }

  &__dishes {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  &__position {
    display: flex;
    gap: 1.2rem;
  }

  &__quantity {
    color: var(--dark-gray-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    margin-left: 30px;
  }

  &__dish-name {
    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__timeslot {
    color: var(--dark-color);
    font: 400 normal 2.4rem/1.5 Inter, sans-serif;

    &_soon {
      color: var(--black-color)
    }
  }

  &__button {
    margin-top: 4rem;
    padding: 0.8rem 1.6rem;

    display: flex;
    align-items: center;
    gap: 0.8rem;

    color: var(--white-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;

    border-radius: 0.8rem;
    border: none;
    background: #00AD00;
  }
}

.order.soon {
  background: #FF6D6D;
  box-shadow: none;
}
.order__timeslot.soon,
.order__timeslot.prepared,
.order.prepared>.order__info>.order__dishes>.order__position>.order__quantity,
.order.soon>.order__info>.order__dishes>.order__position>.order__quantity{
  color: var(--black-color) !important;
}
.order.prepared {
  background: #FFC842;
  box-shadow: none;
}
</style>

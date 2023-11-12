<script setup lang="ts">
import audioFile from '@/assets/new_order_sound.mp3'
const pk = await getManagerRest()
console.log(pk)
const allOrders = (await getBOHOrders())
function cmp(a, b){
  if(get_mins(a.timeSlot) < get_mins(b.timeSlot)){
    return -1
  }else{
    return 1
  }
}
allOrders.sort(cmp)
const orders = ref(allOrders)
var socket = new WebSocket("wss://backhelp.foodfastpass.ie/ws/restaurant/" + pk.toString() + "/");
socket.onopen = function() {
  console.log("Соединение установлено.");
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения'); // например, "убит" процесс сервера
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

function get_mins(timeSlot : String){
  const [ hour, minute ] = timeSlot.split(':').map(n => parseInt(n));
  return hour*60 + minute
}

socket.onmessage = function(event) {
  console.log("Получены данные " + event.data);
  const new_orders = [...orders.value, JSON.parse((event.data).toString())]
  new_orders.sort(cmp)
  orders.value = new_orders
  let audio = new Audio(audioFile)
  audio.play()
};

socket.onerror = function(error) {
  alert("Ошибка " + error.message);
};

// const orders = ref([])
// console.log(orders.value.length)
// console.log(orders.value)
function get_cooking_orders(){
  return orders.value.filter((e) => e.state == "Cooking")
}
function get_prepared_orders(){
  return orders.value.filter((e) => e.state == "Prepared")
}
function get_done_orders(){
  return orders.value.filter((e) => e.state == "Confirm")
}
const activeTab = ref("Active orders")
function setActiveTab(new_tab : string){
  activeTab.value = new_tab
}
const openedOrderId = ref(-1)
function setOpenedOrderId(new_id : number){
  openedOrderId.value = new_id
}
function orderStatusChanged(order_id : number, new_state : string){
  for(let i = 0; i < orders.value.length; i++){
    if(orders.value[i].id === order_id){
      orders.value[i].state = new_state
    }
  }
}
</script>

<template>
  <div class="queue__nav">
    <OrdersTab :name="'Active orders'" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
    <OrdersTab :name="'Orders history'" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
    <OrdersTab :name="'Inventory stock'" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
  </div>
  <template v-if="activeTab === 'Active orders'">
    <div class="queue done">
      <QueueOrder v-for="order in get_prepared_orders()" :key="order.orderId" :order="order"
      :opened-order-id="openedOrderId" :set-opened-order-id="setOpenedOrderId"
       :order-status-changed="orderStatusChanged" />
    </div>
    <div class="queue">
      <QueueOrder v-for="order in get_cooking_orders()" :key="order.orderId" :order="order"
      :opened-order-id="openedOrderId" :set-opened-order-id="setOpenedOrderId"
       :order-status-changed="orderStatusChanged" />
    </div>
  </template>
  <template v-else-if="activeTab === 'Orders history'">
    <div class="queue" :style="{'padding-top': '4rem'}">
      <QueueOrder v-for="order in get_done_orders()" :key="order.orderId" :order="order"
      :opened-order-id="-1" :set-opened-order-id="() => {}"
      :order-status-changed="() => {}"/>
    </div>
  </template>
  <template v-else>
    <InventoryStock/>
  </template>
</template>

<style scoped lang="scss">
.queue {
  margin: 0 2.4rem 5.4rem 2.4rem;
  padding-bottom: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
.queue.done{
  border-bottom: 2px solid #6432F4;
  padding-top: 4rem;

}
.queue__nav{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 4rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  border-bottom: 1px solid;
  border-color: #D7D6FF;
  padding-bottom: 2rem;
}

</style>

<script setup lang="ts">
const pk = await getManagerRest()
console.log(pk)
var socket = new WebSocket("wss://backhelp.foodfastpass.ie/ws/restaurant/" + pk.toString() + "/");
socket.onopen = function() {
  alert("Соединение установлено.");
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
    alert('Обрыв соединения'); // например, "убит" процесс сервера
  }
  alert('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
  alert("Получены данные " + event.data);
};

socket.onerror = function(error) {
  alert("Ошибка " + error.message);
};

// const orders = ref([])
const orders = ref((await getBOHOrders()));
console.log(orders.value.length)
console.log(orders.value)
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
</script>

<template>
  <div class="queue__nav">
    <OrdersTab :name="'Active orders'" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
    <OrdersTab :name="'Orders history'" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
    <OrdersTab :name="'Inventory stock'" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
  </div>
  <template v-if="activeTab === 'Active orders'">
    <div class="queue done">
      <QueueOrder v-for="order in get_prepared_orders()" :key="order.orderId" :order="order" />
    </div>
    <div class="queue">
      <QueueOrder v-for="order in get_cooking_orders()" :key="order.orderId" :order="order" />
    </div>
  </template>
  <template v-else-if="activeTab === 'Orders history'">
    <div class="queue">
      <QueueOrder v-for="order in get_done_orders()" :key="order.orderId" :order="order" />
    </div>
  </template>
  <template v-else>
    <InventoryStock/>
  </template>
</template>

<style scoped lang="scss">
.queue {
  margin: 0 2.4rem 5.4rem 2.4rem;
  padding-bottom: 5.4rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
.queue.done{
  border-bottom: 2px solid #6432F4;
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

<script setup lang="ts">
const products = ref(await getMenuRest())
const _meals = []
for(let i in products.value){
    if(_meals.find((e) => e===products.value[i].menuType[0]) === undefined)
        _meals.push(products.value[i].menuType[0])
}
const meals = ref(_meals)
const activeTab = ref(meals.value[0])
function setActiveTab(new_tab : string){
  activeTab.value = new_tab
}
// const props = defineProps<{
//   order: Order,
// }>();
</script>

<template>
  <section>
    <div class="invent__nav">
        <OrdersTab v-for="meal in meals" :name="meal" :key="meal" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
    </div>
    <div class="products-wrapper">
        <div class="card" v-for="product in products">
            aaa
        </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.products-wrapper{
    display: grid;
    grid-template-columns: repeat(4, auto);
}
.invent__nav{
    margin-top: 2rem;
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

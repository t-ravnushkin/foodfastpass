<script setup lang="ts">
const products = await getMenuRest()
console.log(products)
const _meals = []
const _categories = []
const products_by_category = ref({})
for(let i in products){
    if(_meals.find((e) => e===products[i].menuType[0]) === undefined)
        _meals.push(products[i].menuType[0])
    if(_categories.find((e) => e===products[i].categories) === undefined){
        _categories.push(products[i].categories)
        products_by_category.value[products[i].categories] = [products[i]]
    } else{
        products_by_category.value[products[i].categories].push(products[i])
    }
}
const meals = ref(_meals)
const categories = ref(_categories)
const activeTab = ref(meals.value[0])
function setActiveTab(new_tab : string){
  activeTab.value = new_tab
}
function setProductStock(category, id, newValue){
    for(let i = 0; i < products_by_category.value[category].length; i++){
        if(products_by_category.value[category][i].id === id)
            products_by_category.value[category][i].inStock = newValue
    }
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
    <div v-for="category in categories">
        <div class="category">{{ category }}:</div>
        <div class="products-wrapper">
            <Product v-for="product in products_by_category[category]" :key="product.id"
            :product="product" :set-product-stock="setProductStock"/>
        </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.category{
    margin-top: 2rem;
    margin-left: 2.4rem;
    margin-right: 2.4rem;
    font-size: 18px;
    font-weight: 600;
    font-family: 'Inter';
}
.products-wrapper{
    gap: 1em;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    padding-top: 2rem;
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

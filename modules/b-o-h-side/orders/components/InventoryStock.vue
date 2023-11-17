<script setup lang="ts">
const _products = await getMenuRest()
console.log(_products)
const _meals = []
const products = ref({})
for(let i in _products){
    for(let j in _products[i].menuType){
        const mt = _products[i].menuType[j]
        if(_meals.find((e) => e===mt) === undefined){
            _meals.push(mt)
            products.value[mt] = {}
        }
        if(!products.value[mt][_products[i].categories]){
            products.value[mt][_products[i].categories] = [_products[i]]
        } else{
            products.value[mt][_products[i].categories].push(_products[i])
        }
    }
}
const meals = ref(_meals)
const activeTab = ref(meals.value[0])
function setActiveTab(new_tab : string){
  activeTab.value = new_tab
}
function setProductStock(category, id, newValue){
    for(let i = 0; i < products.value[activeTab.value][category].length; i++){
        if(products.value[activeTab.value][category][i].id === id)
            products.value[activeTab.value][category][i].inStock = newValue
    }
}
function setCustomProductStock(category, id, icategory, iname, newValue){
    console.log(icategory, iname)
    for(let i = 0; i < products.value[activeTab.value][category].length; i++){
        if(products.value[activeTab.value][category][i].id === id){
            products.value[activeTab.value][category][i].customizableList[icategory][iname] = newValue
        }
    }
}
function setCustomProductOutOfStock(category, id){
    for(let i = 0; i < products.value[activeTab.value][category].length; i++){
        if(products.value[activeTab.value][category][i].id === id){
            for(let cati in products.value[activeTab.value][category][i].customizableList){
                for(let itemi in products.value[activeTab.value][category][i].customizableList[cati]){
                    products.value[activeTab.value][category][i].customizableList[cati][itemi] = false
                }
            }
        }
    }
}
function getIfOutOfStock(category, id){
    let cnt = 0;
    for(let i = 0; i < products.value[activeTab.value][category].length; i++){
        if(products.value[activeTab.value][category][i].id === id){
            for(let cati in products.value[activeTab.value][category][i].customizableList){
                for(let itemi in products.value[activeTab.value][category][i].customizableList[cati]){
                    if(products.value[activeTab.value][category][i].customizableList[cati][itemi]){
                        cnt++;
                    }
                }
            }
        }
    }
    if(cnt == 0)return 1;
    return 0;
}
console.log(products.value)
// const props = defineProps<{
//   order: Order,
// }>();
</script>

<template>
  <section>
    <div class="invent__nav">
        <OrdersTab v-for="meal in meals" :name="meal" :key="meal" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
    </div>
    <div v-for="category in Object.keys(products[activeTab])">
        <div class="category">{{ category }}:</div>
        <div class="products-wrapper">
            <template v-for="product in products[activeTab][category]" :key="product.id">
                <Product v-if="Object.keys(product.customizableList).length === 0" :product="product"
                :set-product-stock="setProductStock"/>
                <CustomProduct v-else :product="product" :set-custom-product-stock="setCustomProductStock"
                :get-if-out-of-stock="getIfOutOfStock"
                :set-custom-product-out-of-stock="setCustomProductOutOfStock"/>
            </template>
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

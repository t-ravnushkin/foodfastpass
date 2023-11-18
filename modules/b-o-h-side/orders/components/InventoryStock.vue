<script setup lang="ts">
const _products = await getMenuRest()
console.log(_products)
const meals = ref([])
const products = ref({})
function add_product(i : Object){
    for(let j in i.menuType){
        const mt = i.menuType[j]
        if(meals.value.find((e) => e===mt) === undefined){
            meals.value.push(mt)
            products.value[mt] = {}
        }
        if(!products.value[mt][i.categories]){
            products.value[mt][i.categories] = [i]
        } else{
            products.value[mt][i.categories].push(i)
        }
    }
}
for(let i in _products){
    add_product(_products[i])
}
const activeTab = ref(meals.value[0])
const pk = await getManagerRest()
var socket = new WebSocket("wss://backhelp.foodfastpass.ie/ws/newRestProduct/" + pk.toString() + "/");
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

socket.onmessage = function(event) {
  console.log("Получены данные " + event.data);
  const new_product = JSON.parse((event.data).toString())
  add_product(new_product)
};

socket.onerror = function(error) {
  alert("Ошибка " + error.message);
};
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
const mealsOrder = {
    'Breakfast' : 0,
    'Lunch' : 1,
    'Dinner' : 2
}
function cmpMeal(a : string, b : string){
    const na = (mealsOrder[a] ? mealsOrder[a] : 0)
    const nb = (mealsOrder[b] ? mealsOrder[b] : 0)
    if(na < nb)return -1
    return 1
}
// const props = defineProps<{
//   order: Order,
// }>();
</script>

<template>
  <section>
    <div class="invent__nav">
        <OrdersTab v-for="meal in meals.toSorted(cmpMeal)" :name="meal" :key="meal" :active-tab="activeTab" :set-active-tab="setActiveTab"/>
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

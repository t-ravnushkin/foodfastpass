<script setup lang="ts">
const props = defineProps<{
    product : Object,
    setProductStock : Function
}>();
const loading = ref(false)
function switchDone(newValue : boolean){
    props.setProductStock(props.product.categories, props.product.id, newValue)
    loading.value = false
}
function outOfStock(){
    if(!props.product.inStock){
        return
    }
    loading.value = true
    postProductOutOfStock(props.product.id, ()=>switchDone(false))
}
function inStock(){
    if(props.product.inStock){
        return
    }
    loading.value = true
    postProductInStock(props.product.id, ()=>switchDone(true))
}

</script>

<template>
    <div class="card">
        <span>{{ product.name }}</span>
        <div>
            <button :disabled="loading" :class="['inventory-btn in-stock', {'active' : product.inStock}]"
            @click="inStock">
                In Stock
            </button>
        </div>
        <div>
            <button :disabled="loading" :class="['inventory-btn out-stock' , {'active' : !product.inStock}]"
            @click="outOfStock">
                Out of Stock
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.inventory-btn{
    opacity: 0.5;
    width: 100%;
    border-radius: 4px;
    border: none;
    height: 50px;
    margin-top: 1rem;
    font-size: 15px;
    font-family: 'Inter';
    color: #000000;
}
.inventory-btn.active:disabled{
    opacity: 80%;
}
.in-stock{
    background: #349F4C;
    color: #FFFFFF;
}
.out-stock{
    background: #FF5353;
}
.inventory-btn.active{
    opacity: 100%;
    border: solid 1px;
}
.card{
    font-size: 15px;
    font-family: 'Inter';
    color: #000000;
    border: none;
    word-wrap: break-word;
}
</style>

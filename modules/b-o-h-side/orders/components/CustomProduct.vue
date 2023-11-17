<script setup lang="ts">

const props = defineProps<{
    product : Object,
    setCustomProductStock : Function,
    getIfOutOfStock : Function,
    setCustomProductOutOfStock : Function
}>();
const loading = ref(false)
const showModal = ref(false)
function switchDone(newValue : boolean){
    props.setCustomProductOutOfStock(props.product.categories, props.product.id)
    loading.value = false
}
function outOfStock(){
    loading.value = true
    postProductOutOfStock(props.product.id, ()=>switchDone(false))
}
function closeModal(){
    showModal.value = false
}
function openModal(){
    showModal.value = true
}
</script>

<template>
    <Modal v-if="showModal" :product="product" :close-modal="closeModal"
     :set-custom-product-stock="setCustomProductStock"/>
    <div class="card">
        <span>{{ product.name }}</span>
        <div>
            <button :disabled="loading" :class="['inventory-btn manage-stock active']"
            @click="openModal">
                Manage stock
            </button>
        </div>
        <div>
            <button :disabled="loading" :class="['inventory-btn out-stock' ,
            {'active' : getIfOutOfStock(product.categories, product.id)}]"
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
.manage-stock{
    background: #6432F4;
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

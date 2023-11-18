<script setup lang="ts">
const props = defineProps<{
    product : Object,
    closeModal : Function,
    setCustomProductStock : Function
}>();
const loading = ref(false)
function switchDone(category : string, name : string, newValue : boolean){
    props.setCustomProductStock(props.product.categories, props.product.id, category, name, newValue)
    loading.value = false
}
function outOfStock(category : string, name : string){
    loading.value = true
    postCustomProductOutOfStock(props.product.id, category, name, ()=>switchDone(category, name, false))
}

function inStock(category : string, name : string){
    loading.value = true
    postCustomProductInStock(props.product.id, category, name, ()=>switchDone(category, name, true))
}

</script>

<template>
    <div class="modal" @click="closeModal">
        <div class="modal-dialog" @click="e => e.stopPropagation()">
            <div class="modal-header">
            <span class="modal-name">
                {{product.name}}
            </span>
            <span class="modal-close" @click="closeModal">
                <Closeicon/>
            </span>
            </div>
            <div class="modal-body">
                <div class="modal-content">
                    <template v-for="category in Object.keys(product.customizableList)">
                        <template v-for="item in Object.keys(product.customizableList[category])"
                            :key="item"> 
                                <div class="item-name">
                                    {{ item }}
                                </div>
                                <button :disabled="loading" :class="['inventory-btn in-stock', {
                                    'active' : product.customizableList[category][item]
                                }]" @click="() => inStock(category, item)">
                                    In stock
                                </button>
                                <button :disabled="loading" :class="['inventory-btn out-stock', {
                                    'active' : !product.customizableList[category][item]
                                }]" @click="() => outOfStock(category, item)">
                                    Out stock
                                </button>
                                <div class="row-border"></div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal-name{
    font-size: 20px;
    font-weight: bold;
    font-family: 'Inter';
}
.row-border{
    border-top: 1px solid #B8B8B8;
    grid-column: 1 / 5;
}
.row-wrap{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
}
.item-name{
    align-self: center;
    font-size: 16px;
    font-family: 'Inter';
    word-wrap: break-word;
}
.buttons{
    display: flex;
    flex-direction: row;
    width: 100%;
}
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
.modal {
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    background : transparent;
}


.modal-dialog {
    z-index: 9999;
    padding: 2rem;
    opacity: 1;
    width: 100%;
    border-radius: 12px;
    max-width: 70%;
    border: solid 1px black;
    background-color: white;
    position: relative;
    max-height: calc(100vh - 200px);
    text-align: left;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    -webkit-animation-duration: 0.4s;
    /* animation-name: slide-in; */
    animation-duration: 0.4s;
}

.modal-header,
.modal-footer {
    display: flex;
    align-items: center;
    padding: 12px 12px 0 5px;
}

.modal-header {
    justify-content: space-between;
}

.modal-close {
    cursor: pointer;
    padding-right: 2px;
    padding-bottom: 2px;
    margin: 0 0 0 auto;
}

.modal-body {
    overflow: auto;
}

.modal-content {
    padding: 8px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    gap: 1rem;
}

.modal-title {
    margin: 0;
}


</style>

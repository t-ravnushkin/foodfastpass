<script setup lang="ts">
const props = defineProps<{
  name : string,
  activeTab : string,
  setActiveTab : Function
}>();
</script>

<template>
    <button @click="setActiveTab(name)" :class="['queue__tab', {'active' : activeTab === name}]">
      {{ name }}
    </button>
</template>

<style scoped lang="scss">
.queue__tab{
  width: 100%;
  border-radius: 8px;
  height: 40px;
  background: lightgray;
  border: none;
  color: #000000;
  font-size: 16px;
  font-weight: 600;
}
.queue__tab.active{
  color: #FFFFFF;
  background: #651DFF;
}

</style>

<script setup lang="ts">
const uid = useRoute().params.uid as string;
const token = useRoute().params.token as string;

activateUser(uid, token).then(() => {
  navigateTo("/account");
});
</script>

<template>
  <p>Redirecting...</p>
</template>

<style scoped lang="scss"></style>

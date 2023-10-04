<script setup lang="ts">
const authToken = useAuthToken();
</script>

<template>
  <article class="account">
    <HeaderForAccount />

    <client-only>
      <main class="account__main">
        <UserInfo v-if="authToken.length > 0" />
        <AuthUser v-else />
      </main>
    </client-only>
  </article>
</template>

<style scoped lang="scss">
.account {
  &__main {
    margin-top: 10.8rem;
  }
}
</style>

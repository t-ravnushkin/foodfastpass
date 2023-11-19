<script setup lang="ts">
const userInfo = await getUserInfo();

function logOut() {
  localStorage.setItem("foodfastpass_user_token", "");
  window.location.reload();
}
</script>

<template>
  <client-only>
    <section class="info">
      <div class="info__section">
        <p class="info__title">Full name</p>
        <p class="info__value">{{ userInfo?.username }}</p>
      </div>

      <div class="info__section">
        <p class="info__title">*Email</p>
        <p class="info__value">{{ userInfo?.email }}</p>
      </div>

      <p class="info__title">
        *To change your email address, please contact customer support.
      </p>

      <p class="info__link" @click="logOut">Log out</p>
    </section>
  </client-only>
</template>

<style scoped lang="scss">
.info {
  padding: 0 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &__section {
    padding-bottom: 0.4rem;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    border-bottom: var(--light-color) solid 1.5px;
  }

  &__title {
    color: var(--dark-gray-color);
    font: 400 normal 1.2rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__value {
    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__link {
    color: #4300b8;
    font: 400 normal 1.4rem/1.5 Inter, sans-serif;
  }
}
</style>

<script setup lang="ts">
import bohGetUserToken from "../utils/bohGetUserToken";
const email = ref("");
const username = ref("");
const password = ref("");
const passwordHidden = ref(true);


const isSubmitReady = computed(() => {
  const isNotEmpty = username.value !== "" && password.value !== "";
  /*&& email.value !== ''*/

  // const isEmailValid = /^.+@.+$/g.test(email.value);

  return isNotEmpty;
  /*&& isEmailValid;*/
});

function submit() {
  if (!isSubmitReady) return;

  bohGetUserToken(username.value.trim(), password.value.trim()).then(() => {
    navigateTo("/boh/orders");
  });
}
</script>

<template>
  <article class="auth">
    <header class="auth__header">
      <MainLogo class="auth__logo" />
      <p class="auth__logo-title">FoodFastPass</p>
    </header>

    <main class="auth__main">
      <h1 class="auth__heading">Log in</h1>
      <p class="auth__subtitle">Welcome back! Please enter your details.</p>

      <section class="auth__form">
        <!--        <div class="auth__section">
          <p class="auth__title">Email</p>
          <input v-model="email" type="email" placeholder="Enter your email" class="auth__field">
        </div>-->

        <div class="auth__section">
          <p class="auth__title">Username</p>
          <input
            v-model="username"
            type="text"
            placeholder="Enter your username"
            class="auth__field"
          />
        </div>

        <div class="auth__section">
          <p class="auth__title">Password</p>
          <input
            v-model="password"
            :type="passwordHidden ? 'password' : 'text'"
            placeholder="••••••••"
            class="auth__field"
          />
          <EyeIcon
          height="2.0rem"
          :is-closed="!passwordHidden"
          style="
            margin-left: -3.5rem;
            vertical-align: middle;
            align-self: stretch;
          "
          @click="passwordHidden = !passwordHidden"
        />
        </div>
      </section>

      <button
        :class="['auth__log-in', { 'auth__log-in_disabled': !isSubmitReady }]"
        @click="submit"
      >
        Log in
      </button>

      <p class="auth__bottom-text">
        For any questions, please refer to our support service at hello@foodfastpass.ie
      </p>
    </main>

    <footer class="auth__footer">
      © 2023 FoodFastPass. All rights reserved.
    </footer>
  </article>
</template>

<style scoped lang="scss">
.auth {
  &__header {
    position: fixed;
    top: 3.2rem;
    left: 3.2rem;

    display: flex;
    align-items: center;
    gap: 0.8rem;
    overflow: visible;
  }

  &__logo {
    width: 3.2rem;
    height: 3.2rem;
  }

  &__logo-title {
    color: var(--black-color);
    font: 600 normal 1.6rem Inter, sans-serif;
  }

  &__main {
    max-width: 36rem;
    margin: 12.8rem auto;
  }

  &__heading {
    margin-bottom: 1.2rem;
    color: var(--black-color);
    font: 600 normal 3.6rem/4.4rem Inter, sans-serif;
  }

  &__subtitle {
    margin-bottom: 3.2rem;
    color: var(--darker-gray-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__form {
    margin-bottom: 5.4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__section {
  }

  &__title {
    margin-bottom: 0.6rem;
    color: var(--darker-gray-color);
    font: 500 normal 1.4rem/1.5 Inter, sans-serif;
  }

  &__field {
    width: 100%;
    padding: 1rem 1.4rem;

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;

    border-radius: 0.8rem;
    border: var(--light-color) 1px solid;
    outline-color: transparent;

    transition: all 0.2s ease;

    &:focus {
      outline-color: var(--dark-color);
    }
  }

  &__log-in {
    width: 100%;
    margin-bottom: 5.4rem;
    padding: 1rem 1.8rem;

    color: var(--white-color);
    font: 600 normal 1.6rem/1.5 Inter, sans-serif;
    background: var(--dark-color);
    border: none;
    border-radius: 0.8rem;

    &_disabled {
      background: var(--medium-color);
    }
  }

  &__bottom-text {
    color: var(--dark-gray-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__footer {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 4.4rem 0 3.6rem 3.2rem;
    color: var(--medium-color);
    font: 400 normal 1.6rem Inter, sans-serif;
    letter-spacing: -0.064rem;
  }
}
</style>

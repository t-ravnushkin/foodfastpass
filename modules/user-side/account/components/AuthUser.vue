<script setup lang="ts">

const username = ref('');
const password = ref('');

const isFailed = ref(false);

const isSubmitReady = computed(() => {
  const isNotEmpty = username.value !== ''
    && password.value !== '';

  return isNotEmpty;
});

const errorMessage = ref('');

function submit() {
  if (!isSubmitReady) {
    isFailed.value = true;
    return;
  }

  getUserToken(username.value, password.value).then(() => {
    isFailed.value = false;
    navigateTo('/');
  }).catch((e) => {
    isFailed.value = true;
    errorMessage.value = e;
  });
}

const passwordHidden = ref(true);

</script>

<template>
  <section class="registration">

    <div class="registration__section">
      <p class="registration__title">Username</p>
      <input v-model="username" type="text" placeholder="Enter your username" class="registration__field">
    </div>

    <div class="registration__section">
      <p class="registration__title">Password</p>
      <div style="width:100%; flex-direction: row; align-items: center">
        <input style="width:100%" v-model="password" :type="passwordHidden ? 'password' : 'text'" placeholder="••••••••" class="registration__field">
        <EyeIcon height="4rem" :is-closed="!passwordHidden" style="margin-left: -4.5rem; vertical-align: middle; margin-top: -0.5%; align-self:stretch" @click="passwordHidden = !passwordHidden"/>
      </div>
    </div>

    <button
      :class="['registration__sign-up', {'registration__sign-up_disabled': !isSubmitReady}]"
      @click="submit"
    >
      Sign in
    </button>

    <p v-if="isFailed" class="registration__error">
      Something went wrong. Please check your info or try again later. {{ errorMessage }}
    </p>

    <NuxtLink href="/registration" class="registration__link">
      Don't have an account yet? Sign up
    </NuxtLink>

    <NuxtLink href="/request_reset" class="registration__link">
      Forgot your password?
    </NuxtLink>
  </section>
</template>

<style scoped lang="scss">

.registration {
  padding: 0 2.4rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  &__section {
    padding-bottom: 0.4rem;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  &__title {
    color: var(--dark-gray-color);
    font: 400 normal 1.2rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__field {
    padding: 1rem 1.4rem;

    color: var(--black-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;

    border-radius: 0.8rem;
    border: var(--light-color) 1px solid;
    outline-color: transparent;


    transition: all .2s ease;

    &:focus {
      outline-color: var(--dark-color);
    }
  }

  &__sign-up {
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

  &__link {
    color: var(--primary-color);
    font: 400 normal 1.4rem/1.5 Inter, sans-serif;
    text-decoration: none;
  }

  &__error {
    color: var(--dark-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-decoration: none;
    text-wrap: balance;
  }
}

</style>

<script setup lang="ts">
const username = ref("");
const password = ref("");

watch([username, password], () => {
  isFailed.value = false;
});

const isFailed = ref(false);

const isSubmitReady = computed(() => {
  const isNotEmpty = username.value !== "" && password.value !== "";

  return isNotEmpty;
});

const errorMessage = ref("");

function submit() {
  if (!isSubmitReady) {
    isFailed.value = true;
    return;
  }

  const { data, error } = useCustomFetch("/auth/jwt/create/", {
    method: "POST",
    body: {
      username: username.value,
      password: password.value,
    },
    headers: {
      Host: "foodfastpass.ie",
      Origin: "foodfastpass.ie",
    },
    onResponseError: ({ request, response, options }) => {
      console.log(response);
      errorMessage.value = response._data.detail;
      if (
        errorMessage.value ===
        "No active account found with the given credentials"
      ) {
        errorMessage.value = "Incorrect email/username or password";
      }
      isFailed.value = true;
    },
    onResponse: ({ request, response, options }) => {
      if (!response.ok) return;
      const token = response._data.access;
      localStorage.setItem("foodfastpass_user_token", token);
      navigateTo("/");
    },
  });
  // if (error.value) {
  //   isFailed.value = true;
  // } else {
  //   isFailed.value = false;
  //   // @ts-ignore
  //   const token: string = data.value?.access;
  //   console.log(token);
  //   localStorage.setItem("foodfastpass_user_token", token);
  //   navigateTo("/");
  // }
}

const passwordHidden = ref(true);
</script>

<template>
  <section class="registration">
    <div class="registration__section">
      <p class="registration__title">Email or Username</p>
      <input
        v-model="username"
        type="text"
        placeholder="Enter your email or username"
        class="registration__field"
      />
    </div>

    <div class="registration__section">
      <p class="registration__title">Password</p>
      <div style="width: 100%; flex-direction: row; align-items: center">
        <input
          style="width: 100%"
          v-model="password"
          :type="passwordHidden ? 'password' : 'text'"
          placeholder="••••••••"
          class="registration__field"
        />
        <EyeIcon
          height="1.5rem"
          :is-closed="!passwordHidden"
          style="
            margin-left: -3.5rem;
            vertical-align: middle;
            margin-top: -0.5%;
            align-self: stretch;
          "
          @click="passwordHidden = !passwordHidden"
        />
      </div>
    </div>

    <button
      :class="[
        'registration__sign-up',
        { 'registration__sign-up_disabled': !isSubmitReady },
      ]"
      @click="submit"
      :disabled="!isSubmitReady"
    >
      Sign in
    </button>

    <p v-if="isFailed" class="registration__error">
      {{ errorMessage }}
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

    transition: all 0.2s ease;

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

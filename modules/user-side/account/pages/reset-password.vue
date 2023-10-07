<script setup lang="ts">
const uid = useRoute().params.uid as string;
const token = useRoute().params.token as string;

const password = ref("");
const rePassword = ref("");

const isFailed = ref(false);
const isSucceed = ref(false);

const isPasswordValid = computed(() => {
  // check if password is valid
  if (password.value === "") {
    return true;
  }
  // check if password is at least 8 characters long, contains an uppercase letter, a lowercase letter and a number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*-№]{8,}$/.test(
    password.value
  );
});

const isSubmitReady = computed(() => {
  return (
    password.value.length > 0 &&
    rePassword.value.length > 0 &&
    isPasswordValid.value
  );
});

async function submit() {
  if (!isSubmitReady || password.value !== rePassword.value) {
    isFailed.value = true;
    return;
  }

  const { result, error } = await resetPassword(uid, token, password.value);

  if (error.value) {
    console.log(error.value);
    isFailed.value = true;
    return;
  }

  isFailed.value = false;
  isSucceed.value = true;

  setTimeout(() => {
    navigateTo("/account");
  }, 2000);
}
</script>

<template>
  <article class="account">
    <HeaderForAccount />

    <client-only>
      <main class="account__main">
        <div class="registration__section">
          <p class="registration__title">New password</p>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="registration__field"
          />
        </div>

        <div class="registration__section">
          <p class="registration__title">Repeat new password</p>
          <input
            v-model="rePassword"
            type="password"
            placeholder="••••••••"
            class="registration__field"
          />
        </div>

        <button
          :class="[
            'registration__sign-up',
            { 'registration__sign-up_disabled': !isSubmitReady },
          ]"
          @click="submit"
        >
          Reset password
        </button>

        <p v-if="isSucceed" class="registration__error">
          Password has been successfully changed. Redirecting...
        </p>

        <p v-if="isFailed" class="registration__error">
          Something went wrong. Please check your info or try again later.
        </p>
      </main>
    </client-only>
  </article>
</template>

<style scoped lang="scss">
.account {
  &__main {
    margin: 10.8rem 2.4rem 0 2.4rem;
  }
}

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
    width: 100%;
    margin: 1.2rem 0;
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

  &__error {
    color: var(--dark-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-decoration: none;
    text-wrap: balance;
  }
}
</style>

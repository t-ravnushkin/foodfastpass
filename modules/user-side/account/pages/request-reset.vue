<script setup lang="ts">
const email = ref("");
const isEmailValid = computed(() => {
  // check if email is valid
  if (email.value === "") {
    return true;
  }
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.value
  );
});

const isFailed = ref(false);
const isEmailInCheck = ref(false);

const isSubmitReady = computed(() => {
  return email.value.length > 0 && isEmailValid.value;
});

async function submit() {
  if (!isSubmitReady) {
    isFailed.value = true;
    isEmailInCheck.value = false;
    return;
  }

  const { result, error } = await requestPasswordReset(email.value);

  if (error.value !== null && error.value !== undefined) {
    console.log(error);
    isFailed.value = true;
    isEmailInCheck.value = false;
    return;
  }
  isFailed.value = false;
  isEmailInCheck.value = true;
}
</script>

<template>
  <article class="account">
    <HeaderForAccount isReset />

    <client-only>
      <main class="account__main">
        <div class="registration__section">
          <p class="registration__title">Email</p>
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="registration__field"
            :class="{
              registration__field_invalid: !isEmailValid,
            }"
          />
          <p v-if="!isEmailValid" class="registration__error">
            Please enter a valid email
          </p>
        </div>

        <button
          :class="[
            'registration__sign-up',
            { 'registration__sign-up_disabled': !isSubmitReady },
          ]"
          :disabled="!isSubmitReady"
          @click="submit"
        >
          Reset password
        </button>

        <p v-if="isEmailInCheck" class="registration__error">
          Password reset link has been sent to your email account. Please check
          your inbox
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

  &__field_invalid {
    border-color: red;
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

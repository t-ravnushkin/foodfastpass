<script setup lang="ts">
/*
 * mama_pomogi2
 * mai.karaskas@gmail.com
 * abrakadabra911
 * */

const isEmailInCheck = ref(false);

const isFailed = ref(false);

const passwordHidden = ref(true);

const username = ref("");
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");
const usernameErrors = ref(new Array<string>());
const haveUsernameErrors = computed(() => usernameErrors.value.length > 0);
const emailErrors = ref(new Array<string>());
const haveEmailErrors = computed(() => emailErrors.value.length > 0);
const passwordErrors = ref(new Array<string>());
const havePasswordErrors = computed(() => passwordErrors.value.length > 0);

watch(username, () => {
  usernameErrors.value = [];
  isEmailInCheck.value = false;
});
watch(email, () => {
  emailErrors.value = [];
  isEmailInCheck.value = false;
});
watch(password, () => {
  passwordErrors.value = [];
  isEmailInCheck.value = false;
});

const isEmailValid = computed(() => {
  // check if email is valid
  if (email.value === "") {
    return true;
  }
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.value
  );
});

const isPasswordValid = computed(() => {
  // check if password is valid
  if (password.value === "") {
    return true;
  }
  // Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number'
  // check if password is valid
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password.value);
});

const isPasswordRepeated = computed(() => {
  if (password.value === "") {
    return true;
  }
  return password.value === passwordRepeat.value;
});

const isSubmitReady = computed(() => {
  const isNotEmpty =
    username.value !== "" &&
    email.value !== "" &&
    password.value !== "" &&
    passwordRepeat.value !== "";
  return (
    isNotEmpty &&
    isEmailValid.value &&
    isPasswordValid.value &&
    isPasswordRepeated.value
  );
});

onBeforeUnmount(() => {
  isEmailInCheck.value = false;
});

const errorMessage = ref("");

async function submit() {
  if (!isSubmitReady) {
    isFailed.value = true;
    return;
  }

  try {
    const { data, error } = await useCustomFetch("/auth/users/", {
      method: "POST",
      body: {
        email: email.value,
        username: username.value,
        password: password.value,
        re_password: passwordRepeat.value,
      },
      onResponse: ({ request, response, options }) => {
        if (!response.ok) return;
        isEmailInCheck.value = true;
      },
      onResponseError: ({ request, response, options }) => {
        let flag: boolean = false;
        if (
          response._data.detail === "User with this username already exists."
        ) {
          usernameErrors.value = ["User with this username already exists."];
          flag = true;
        } else {
          usernameErrors.value = [];
        }
        if (response._data[0] === "User with this email already exists") {
          emailErrors.value = ["User with this email already exists."];
          flag = true;
        } else {
          emailErrors.value = [];
        }
        if (response._data.password !== undefined) {
          passwordErrors.value = response._data.password;
          flag = true;
        } else {
          passwordErrors.value = [];
        }
        if (!flag && response._data !== undefined) {
          errorMessage.value = response._data;
          isFailed.value = true;
        }
      },
    });
    // const {data, error, pending} = await registerUser(
    //   email.value.trim(),
    //   username.value.trim(),
    //   password.value.trim(),
    // );

    // if (error.value === null) {
    //   isEmailInCheck.value = true;
    //   isFailed.value = false;
    // } else {
    //   console.log(data.value);
    //   console.log(error.value);
    //   isFailed.value = true;
    //   errorMessage.value = error.value;
    // }
  } catch (e) {
    console.log(e);
    isFailed.value = true;
  }
}
</script>

<template>
  <article>
    <HeaderForAccount />

    <section class="registration">
      <div class="registration__section">
        <p class="registration__title">Email</p>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="registration__field"
          :class="{
            registration__field_invalid: !isEmailValid || haveEmailErrors,
          }"
        />
        <p v-for="emailError in emailErrors" class="registration__error">
          {{ emailError }}
        </p>
        <p v-if="!isEmailValid" class="registration__error">
          Please enter a valid email
        </p>
      </div>

      <div class="registration__section">
        <p class="registration__title">Full name</p>
        <input
          v-model="username"
          type="text"
          placeholder="Enter your full name"
          class="registration__field"
          :class="{ registration__field_invalid: haveUsernameErrors }"
        />
        <p v-for="usernameError in usernameErrors" class="registration__error">
          {{ usernameError }}
        </p>
      </div>

      <div class="registration__section">
        <p class="registration__title">Password</p>
        <div style="width: 100%; flex-direction: row; align-items: center">
          <input
            v-model="password"
            :type="passwordHidden ? 'password' : 'text'"
            placeholder="••••••••"
            class="registration__field"
            :class="{
              registration__field_invalid:
                !isPasswordValid || havePasswordErrors,
            }"
            style="width: 100%"
          />
          <EyeIcon
            height="4rem"
            :is-closed="!passwordHidden"
            style="
              margin-left: -4.5rem;
              vertical-align: middle;
              margin-top: -0.5%;
              align-self: stretch;
            "
            @click="passwordHidden = !passwordHidden"
          />
          <!-- <ImageIcon style="margin-left: -2%;" @click="passwordHidden = !passwordHidden"/> -->
        </div>
        <p v-for="passwordError in passwordErrors" class="registration__error">
          {{ passwordError }}
        </p>
        <p v-if="!isPasswordValid" class="registration__error">
          Your password must be at least 8 characters including a lowercase
          letter, an uppercase letter, and a number
        </p>
      </div>

      <div class="registration__section">
        <p class="registration__title">Repeat password</p>
        <input
          v-model="passwordRepeat"
          :type="passwordHidden ? 'password' : 'text'"
          placeholder="••••••••"
          class="registration__field"
          :class="{ registration__field_invalid: !isPasswordRepeated }"
        />
        <p v-if="!isPasswordRepeated" class="registration__error">
          Passwords do not match
        </p>
      </div>

      <button
        :disabled="!isSubmitReady || isEmailInCheck"
        :class="[
          'registration__sign-up',
          {
            'registration__sign-up_disabled': !isSubmitReady || isEmailInCheck,
          },
        ]"
        @click="submit"
      >
        Sign up
      </button>

      <p v-if="isEmailInCheck" class="registration__bottom-text">
        The verification mail has been sent. Please check you mailbox.
      </p>

      <p v-if="isFailed" class="registration__error">
        Something went wrong. Please check your info or try again later.
        {{ errorMessage }}
      </p>
    </section>
  </article>
</template>

<style scoped lang="scss">
.registration {
  margin-top: 12.4rem;
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
    color: var(--dark-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-wrap: balance;
  }

  &__error {
    color: var(--dark-color);
    font: 400 normal 1.6rem/1.5 Inter, sans-serif;
    text-decoration: none;
    text-wrap: balance;
  }
}
</style>

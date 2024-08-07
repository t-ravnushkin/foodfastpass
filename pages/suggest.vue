<script setup lang="ts">

const { textarea, input } = useTextareaAutosize();


const sent = ref(false);

async function share() {
  const content = input.value.trim();

  if (content.length === 0)
    return;

  await useCustomFetch(
    '/menu/postMessage/',
    {
      method: 'POST',
      body: {
        pk: 0,
        message: content,
      },
    },
  );

  input.value = '';

  sent.value = true;
}

</script>

<template>
  <article class="suggest">

    <div class="suggest__top">
      <SuggestIcon :color="'var(--dark-color)'" class="suggest__suggest-icon"/>
      <p class="suggest__header">suggest</p>
    </div>

    <h1 class="suggest__title">Get in touch</h1>

    <p class="suggest__description">Our friendly team would love to hear from you.</p>

    <textarea
      v-if="!sent"
      ref="textarea"
      v-model="input"
      class="suggest__textarea"
      placeholder="Leave us a message..."
    />

    <p
      v-else
      class="suggest__thanks"
    >
      Thank you!
    </p>

    <button
      class="suggest__button suggest__button_share"
      :class="{'suggest__button_active': input !== '' && input !== undefined && !sent}"
      @click="share"
    >
      Share
    </button>

    <button
      class="suggest__button suggest__button_go-back"
      @click="$router.go(-1)"
    >
      <ButtonArrow/>
      Go back
    </button>

  </article>
</template>

<style scoped lang="scss">

.suggest {
  margin: 6.4rem 2.4rem 0 2.4rem;

  &__top {
    margin-bottom: 1.2rem;

    display: inline-flex;
    gap: 0.8rem;
    align-items: center;
  }

  &__suggest-icon {
    width: 1.6rem;
    height: 1.6rem;
  }

  &__header {
    color: var(--dark-color);
    font: 600 normal 1.6rem/1.5 Inter, sans-serif;
  }

  &__title {
    margin: 0 0 1.6rem 0;
    color: var(--black-color);
    font: 600 normal 3.6rem/1.2 Inter, sans-serif;
  }

  &__description {
    margin: 0 0 3.2rem 0;

    color: var(--dark-color);
    font: 500 normal 1.8rem/1.5 Inter, sans-serif;
  }

  &__textarea {
    width: 100%;
    min-height: 11rem;

    margin-bottom: 2rem;

    padding: 1.2rem 1.4rem;
    box-sizing: border-box;

    color: var(--black-color);
    font: 500 normal 1.8rem/1.5 Inter, sans-serif;

    border-radius: 0.8rem;
    border: 1px solid var(--medium-color);

    transition: all .2s ease;
    resize: none;

    //transition: all ease .2s;

    &::placeholder {
      color: var(--medium-color);
      font: 500 normal 1.8rem/1.5 Inter, sans-serif;
    }

    &:focus {
      outline: none;
      border: 1px solid var(--dark-color);
    }
  }

  &__thanks {
    margin: 0 0 10.3rem 0;
    color: var(--black-color);
    font: 600 normal 1.8rem/1.5 Inter, sans-serif;
  }

  &__button {
    width: 100%;

    margin-bottom: 1.2rem;

    padding: 1.2rem 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    border: none;
    border-radius: 0.8rem;

    font: 600 normal 1.6rem/1.5 Inter, sans-serif;

    transition: all ease .2s;

    &_share {
      color: var(--white-color);
      background: var(--medium-color);
    }

    &_active {
      background: var(--dark-color);
    }

    &_go-back {
        color: #4300b8;
        background: var(--white-color);
        border: solid 1px var(--medium-color);
    }

  }
}

</style>

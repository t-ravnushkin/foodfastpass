<template>
  <footer class="footer">


    <div class="footer__title">
      <MainLogo class="footer__main-logo"/>
      <p class="footer__logo-text">FoodFastPass</p>
    </div>

    <p class="footer__rights">
      © 2023 FoodFastPass. All rights reserved.
    </p>

  </footer>
</template>

<style scoped lang="scss">

.footer {
  justify-self: flex-end;
  margin: 0 2.4rem;

  padding: 3.2rem 0 4.8rem 0;
  box-sizing: border-box;

  border-top: 1px solid var(--light-color);
  background: var(--white-color);

  &__title {
    margin-bottom: 2.4rem;

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
  }

  &__main-logo {
    width: 3.2rem;
    height: 3.2rem;
  }

  &__logo-text {
    margin: 0;

    color: #000;
    font-family: Inter, serif;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 1.6rem */
  }

  &__rights {
    margin: 0;

    color: var(--medium-color);
    font-family: Inter, serif;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 100%; /* 1.6rem */
    letter-spacing: -0.064rem;
  }
}

</style>

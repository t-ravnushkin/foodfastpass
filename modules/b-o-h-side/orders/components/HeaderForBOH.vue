<script setup lang="ts">
const timer = ref("")
function upd_timer(){
  const date = new Date();
  let hours = String(date.getHours())
  if(hours.length < 2){
    hours = "0" + hours
  }
  let mins = String(date.getMinutes())
  if(mins.length < 2){
    mins = "0" + mins
  }
  let seconds = String(date.getSeconds())
  if(seconds.length < 2){
    seconds = "0" + seconds
  }
  timer.value = hours + ":" +
    mins + ":" +
    seconds
}

setInterval(upd_timer, 1000)
const logoutVisible = ref(false)
const logoutAnimation = ref("")
async function close_logout(){
  logoutAnimation.value = "disappear"
  setTimeout(() => {
    logoutVisible.value = false
    logoutAnimation.value = ""
  }, 190);
}
async function open_logout(){
  logoutVisible.value = true
  logoutAnimation.value = "appear"
  setTimeout(() => {
    logoutAnimation.value = ""
  }, 190);
}
</script>

<template>
  <header class="header">

    <div class="header__title">
      <MainLogo class="header__logo"/>
      <p class="header__logo-text">FoodFastPass</p>
    </div>
    <p class="header__time">{{ timer }}</p>
    <div class="header__profile-stuff">
      <p :class="['header__log-out', logoutAnimation,
       {'visible' : logoutVisible}]"
       @click="navigateTo('/boh/auth')">Log out</p>
      <Crossicon2 @click="close_logout" v-if="logoutVisible"></Crossicon2>
      <ProfileIcon @click="open_logout" v-else></ProfileIcon>
    </div>

  </header>
</template>

<style scoped lang="scss">

.header {
  width: 100%;

  padding: 2.4rem;
  box-sizing: border-box;

  position: fixed;
  top: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 0 0 0.8rem 0.8rem;
  background: var(--white-color);
  border-bottom: 1px solid;
  border-color: #D7D6FF;
  /* shadow lg */
  // box-shadow: 0 12px 16px -4px rgba(54, 54, 171, 0.08),
  // 0 4px 6px -2px rgba(54, 54, 171, 0.03);

  z-index: 200;

  &__title{
    display: flex;
    align-items: center;
    gap: 0.8rem;
    overflow: visible;
  }

  &__logo {
    width: 5.4rem;
    height: 5.4rem;
  }

  &__logo-text {
    color: var(--black-color);
    font: 500 normal 2.4rem Inter, sans-serif;
  }

  &__log-out {
    color: var(--dark-color);
    font: 500 normal 2.4rem Inter, sans-serif;
  }
}

.header__time{
  font: 500 normal 2.4rem Inter, sans-serif;
}

.header__profile-stuff{
  display: flex;
  flex-direction: row;
  gap: 2rem;
}
.header__log-out{
  z-index: 0;
  animation-duration: 0.2s;
  visibility: hidden;
}
.header__log-out.visible{
  visibility: visible;
}

.header__log-out.appear{
  animation-name: appear;
}
.header__log-out.disappear{
  animation-name: disappear;
}

@keyframes appear {
  0%{
    transform: translateX(2.5rem);
  }
  100%{
    transform: translateX(0px);
  }
}
@keyframes disappear {
  0%{
    transform: translateX(0px);
  }
  100%{
    transform: translateX(2.5rem);
  }
}
</style>

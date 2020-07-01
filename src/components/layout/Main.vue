<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <transition
            enter-active-class="animate__animated animate__fadeInLeft animate__faster"
            leave-active-class="animate__animated animate__fadeOutRight animate__faster"
            mode="out-in"
          >
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
main {
  margin: 80px 0;
  .mainView {
    background: white;
    padding: 20px 35px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #0000003b;
  }
}
</style>
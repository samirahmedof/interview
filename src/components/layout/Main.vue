<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="mainView">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
main {
  margin-top: 20px;
  .mainView {
    background: white;
    padding: 20px 35px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 0px #0000003b;
  }
}
</style>
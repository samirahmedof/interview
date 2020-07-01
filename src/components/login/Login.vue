<template>
  <div class="row justify-content-center">
    <div class="col-lg-4 col-md-6">
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
        mode="out-in"
      >
        <div class="mainView" v-if="loginPage" key="login">
          <form>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-group">
              <label>Şifrə</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group text-center">
              <button class="btn btn-pr">Daxil ol</button>
            </div>
          </form>
          <hr />
          <div class="registration text-center">
            <a href="#" @click.prevent="loginPage=false">Qeydiyyatdan keç</a>
          </div>
        </div>
        <div class="mainView" v-else key="reg">
          <form>
            <div class="form-group">
              <label>Ad, Soyad</label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" />
            </div>
            <div class="form-group">
              <label>Şifrə</label>
              <input type="password" class="form-control" />
            </div>
            <div class="form-group">
              <label>Təkrar şifrə</label>
              <input type="password" class="form-control" />
            </div>

            <div class="form-group text-center">
              <button class="btn btn-pr">Qeydiyyatdan keç</button>
            </div>
          </form>
          <hr />
          <div class="registration text-center">
            <a href="#" @click.prevent="loginPage=true">Daxil ol</a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginPage: true
    };
  }
};
</script>
<style lang="scss" scoped>
.registration {
  a {
    color: #b7a900;
    text-decoration: none;
  }
}
</style>
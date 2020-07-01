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
              <input type="text" class="form-control" v-model="user.email" />
            </div>
            <div class="form-group">
              <label>Şifrə</label>
              <input type="password" class="form-control" v-model="user.pass" />
            </div>
            <div class="form-group text-center">
              <button class="btn btn-pr" @click.prevent="checkUser">Daxil ol</button>
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
              <input type="text" class="form-control" v-model="reg.fullname" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" v-model="reg.email" />
            </div>
            <div class="form-group">
              <label>Şifrə</label>
              <input type="password" class="form-control" v-model="reg.pass1" />
            </div>
            <div class="form-group">
              <label>Təkrar şifrə</label>
              <input type="password" class="form-control" v-model="reg.pass2" />
            </div>

            <div class="form-group text-center">
              <button class="btn btn-pr" @click.prevent="checkRegistration">Qeydiyyatdan keç</button>
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
      loginPage: true,
      reg: {
        fullname: null,
        email: null,
        pass1: null,
        pass2: null
      },
      user: {
        email: null,
        pass: null
      }
    };
  },
  methods: {
    checkUser() {
      if (this.user.email && this.user.pass) {
        this.$store.dispatch("checkUserLogin", this.user);
      } else {
        alert("sehv");
      }
    },
    checkRegistration() {
      if (
        this.reg.fullname &&
        this.reg.email &&
        this.reg.pass1 &&
        this.reg.pass1 &&
        this.reg.pass1 == this.reg.pass2
      ) {
        this.$store.dispatch("addNewUser", this.reg);
      } else {
        alert("sehv");
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
    
  // }
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
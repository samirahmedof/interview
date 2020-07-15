<template>
  <div class="row justify-content-center">
    <div class="col-lg-4 col-md-6">
      <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
        mode="out-in"
      >
        <div class="mainView" v-if="loginPage" key="login">
          <form @submit.prevent="checkUser">
            <div class="form-group">
              <label>Email</label>
              <input
                type="text"
                class="form-control"
                :class="{'invalid':checkValid($v.user.email)}"
                @blur="$v.user.email.$touch()"
                v-model="user.email"
              />
            </div>
            <div class="form-group">
              <label>Şifrə</label>
              <input
                type="password"
                class="form-control"
                :class="{'invalid':checkValid($v.user.pass)}"
                @blur="$v.user.pass.$touch()"
                v-model="user.pass"
              />
            </div>
            <div class="form-group text-center">
              <button
                type="submit"
                class="btn btn-pr"
                @click.prevent="checkUser"
                :disabled="$v.user.$invalid"
              >Daxil ol</button>
            </div>
          </form>
          <hr />
          <div class="registration text-center">
            <a href="#" @click.prevent="loginPage=false">Qeydiyyatdan keç</a>
          </div>
        </div>
        <div class="mainView" v-else key="reg">
          <form @submit.prevent="checkRegistration">
            <div class="form-group">
              <label>Ad, Soyad</label>
              <input
                type="text"
                class="form-control"
                :class="{'invalid':checkValid($v.reg.fullname)}"
                v-model="$v.reg.fullname.$model"
              />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="text"
                class="form-control"
                :class="{'invalid':checkValid($v.reg.email)}"
                @blur="$v.reg.email.$touch()"
                v-model="reg.email"
              />
            </div>
            <div class="form-group">
              <label>Şifrə</label>
              <input
                type="password"
                class="form-control"
                :class="{'invalid':checkValid($v.reg.pass1)}"
                @blur="$v.reg.pass1.$touch()"
                v-model="reg.pass1"
              />
            </div>
            <div class="form-group">
              <label>Təkrar şifrə</label>
              <input
                type="password"
                class="form-control"
                :class="{'invalid':checkValid($v.reg.pass2)}"
                @blur="$v.reg.pass2.$touch()"
                v-model="reg.pass2"
              />
            </div>

            <div class="form-group text-center">
              <button type="submit" class="btn btn-pr" :disabled="$v.reg.$invalid">Qeydiyyatdan keç</button>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

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
        this.$store.commit("setLoader", true);
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
        this.reg.pass2 &&
        this.reg.pass1 == this.reg.pass2
      ) {
        this.$store.commit("setLoader", true);

        this.$http.get("users.json").then(
          res => {
            for (const i in res.data) {
              if (res.data[i].email == this.reg.email) {
                this.$store.commit("setLoader", false);
                this.$swal.fire({
                  title: "Bu e-poçt artıq istifadə olunub",
                  icon: "error",
                  showConfirmButton: false,
                  timer: 2000
                });
                return false;
              }
            }
            this.$http
              .post("users.json", {
                fullname: this.reg.fullname,
                email: this.reg.email,
                pass: this.reg.pass1,
                questions: [],
                applicants: []
              })
              .then(
                res2 => {
                  this.$store.commit("setLoader", false);
                  this.$swal.fire({
                    title: "Qeydiyyat uğurla başa çatdı",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000
                  });
                  this.user.email = this.reg.email;
                  this.user.pass = this.reg.pass1;
                  this.loginPage = true;
                  this.reg.fullname = null;
                  this.reg.email = null;
                  this.reg.pass1 = null;
                  this.reg.pass2 = null;
                },
                res2 => {
                  commit("setLoader", false);
                  this.$swal.fire({
                    title: "Xəta baş verdi",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1000
                  });
                }
              );
          },
          res => {
            commit("setLoader", false);
            this.$swal.fire({
              title: "Xəta baş verdi",
              icon: "error",
              showConfirmButton: false,
              timer: 1000
            });
          }
        );
      } else {
        alert("sehv");
      }
    },
    checkValid(e) {
      if (e.$invalid && e.$dirty) {
        return true;
      } else {
        return false;
      }
    }
  },
  validations: {
    reg: {
      fullname: {
        required
      },
      email: {
        required,
        email
      },
      pass1: {
        required,
        minLength: minLength(3)
      },
      pass2: {
        required,
        minLength: minLength(3),
        sameAs: sameAs("pass1")
      }
    },
    user: {
      email: {
        required,
        email
      },
      pass: {
        required,
        minLength: minLength(3)
      }
    }
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
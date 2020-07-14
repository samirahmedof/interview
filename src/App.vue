<template>
  <div id="app">
    <transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div id="loader" v-show="loader">
        <div class="loading">
          <div class="finger finger-1">
            <div class="finger-item">
              <span></span>
              <i></i>
            </div>
          </div>
          <div class="finger finger-2">
            <div class="finger-item">
              <span></span>
              <i></i>
            </div>
          </div>
          <div class="finger finger-3">
            <div class="finger-item">
              <span></span>
              <i></i>
            </div>
          </div>
          <div class="finger finger-4">
            <div class="finger-item">
              <span></span>
              <i></i>
            </div>
          </div>
          <div class="last-finger">
            <div class="last-finger-item">
              <i></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Main from "./components/layout/Main";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
export default {
  name: "app",
  components: {
    Main,
    Header,
    Footer
  },
  computed: {
    loader() {
      return this.$store.getters.loader;
    }
  },
  created() {
    this.$store.dispatch("checkSession");
    
  }
  // mounted() {
  //   this.$store.commit("setLoader", false);
  // }
};
</script>
<style lang="scss">
</style>



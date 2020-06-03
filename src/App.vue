<template>
  <div id="app">
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
  }
};
</script>
<style lang="scss">
</style>



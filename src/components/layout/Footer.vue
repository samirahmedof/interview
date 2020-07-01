<template>
  <footer>
    <div class="container">
      <div class="row">
        <div class="offset-4 col-4 text-center">
          <h1>©2020 | Samir Ahmadov</h1>
        </div>
        <div class="col-4 text-right" v-if="$store.getters.getIsLogged">
          <div class="logout">
            <a href="#" @click.prevent="logout">
              Çıxış
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 24.303 24.303"
                style="enable-background:new 0 0 24.303 24.303;"
                xml:space="preserve"
              >
                <g>
                  <path
                    style="fill:#fff;"
                    d="M10.269,11.298V1.883C10.269,0.844,11.113,0,12.152,0s1.883,0.844,1.883,1.883v9.415   c0,1.039-0.844,1.883-1.883,1.883S10.269,12.337,10.269,11.298z M19.616,2.761c-0.61-0.483-1.5-0.377-1.983,0.234   c-0.483,0.612-0.378,1.5,0.234,1.984c2.24,1.767,3.524,4.413,3.524,7.261c0,5.094-4.145,9.239-9.238,9.239   c-5.094,0-9.239-4.145-9.239-9.239c0-2.847,1.283-5.492,3.521-7.258c0.612-0.483,0.717-1.371,0.234-1.984   c-0.483-0.612-1.37-0.716-1.984-0.234C1.764,5.069,0.089,8.523,0.089,12.24c0,6.652,5.412,12.063,12.063,12.063   s12.063-5.412,12.063-12.063C24.215,8.521,22.538,5.067,19.616,2.761z"
                  />
                </g>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("interviewUserLogin");
      this.$router.push("/login");
      this.$store.commit("changeUserLog", false);
    }
  }
};
</script>
<style lang="scss" scoped>
footer {
  background: #004085;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  padding: 15px;
  h1 {
    color: white;
    margin: 0;
    font-size: 13px;
  }
  .logout {
    a {
      color: white;
      text-decoration: none;
      svg {
        width: 20px;
      }
    }
  }
}
</style>
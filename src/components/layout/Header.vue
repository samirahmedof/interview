<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h1>interview</h1>
        </div>
        <transition
          enter-active-class="animate__animated animate__zoomIn"
          leave-active-class="animate__animated animate__zoomOut"
          mode="out-in"
        >
          <div class="col-6" v-if="$store.getters.getIsLogged">
            <div class="menuArea">
              <ul>
                <li>
                  <router-link to="/" active-class="active" exact>Əsas</router-link>
                </li>
                <li>
                  <router-link to="/questions" active-class="active">Suallar</router-link>
                </li>
                <li>
                  <router-link to="/add" active-class="active">Əlavə et</router-link>
                </li>
                <li>
                  <router-link to="/results" active-class="active">Nəticələr</router-link>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background: #004085;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  h1 {
    margin: 0;
    color: #fff;
    opacity: 0.7;
  }
  .menuArea {
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      li {
        list-style-type: none;
        display: inline-block;
        a {
          display: inline-block;
          color: white;
          font-weight: bold;
          padding: 15px;
          text-decoration: none;
          transition: all 0.3s;
          text-align: center;
          &:hover {
            background: #b7a900;
          }
          &.active {
            background: #b7a900;
          }
        }
      }
    }
  }
}
</style>
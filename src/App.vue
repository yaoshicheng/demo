<template>
  <div id="app" >
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Footer,
    Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("assets/img/background.png");
  background-size: 100% 100%;
  /*margin-top: 60px;*/
}
</style>

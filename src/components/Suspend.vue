<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%">
    <Header></Header>
    <div class="imgContainer">
      <img src="../assets/img/suspend.png"/>
      <div class="imgText">Sorry,closed for system maintenance.</div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header'
  export default {
    name: 'Index',
    data () {
      return {
      }
    },
    computed: {
    },
    components: {
      Header
    },
    mounted () {
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  .imgContainer{
    width: 100%;
    margin-top: 45%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 30%;
    }
    .imgText{
      font-size: 0.30rem;
      margin-top: 0.2rem;
    }
  }
</style>

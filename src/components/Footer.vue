<template>
  <div class="footerBox">
    <img src="../assets/img/paypallogo.png" class="footLogo" alt="paypal"/>
    <span class="right">400-117-7928</span>
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data () {
      return {
      }
    },
    computed: {
    },
    components: {

    },
    mounted() {

    },
    updated(){
    },
    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  .footerBox{
    position: fixed;
    bottom: 20px;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footLogo{
    width: 25%;
    margin-left: 5%;
  }
  .right{
    font-size:0.20rem;
    margin-right: 5%;
  }
</style>

<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%" @click="returnToIndex">
    <Header></Header>
    <div class="imgContainer">
      <img src="../assets/img/purchase.png"/>
      <div class="imgText">Thanks for your patronage!</div>
    </div>
  </div>
</template>

<script>
  import Header from '../components/Header'
  export default {
    name: 'Index',
    data () {
      return {
        timeout:3,
      }
    },
    computed: {
    },
    components: {
      Header
    },
    mounted () {
      let djs = setInterval(()=>{
        if(this.timeout>0){
          this.timeout = this.timeout-1;
        }else{
          this.timeout = 0;
          clearInterval(djs);
          this.$router.push('/');
        }
      },1000)
    },
    methods: {
      returnToIndex(){
        this.$router.push('/');
      }
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

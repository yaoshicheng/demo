<template>
  <div>
    <Timer></Timer>
    <img src="../assets/img/logo.png" class="logo"/>
    <div class="btnBox">
      <img @click="plamVeinScan" src="../assets/img/BtnHand.svg" />
      <img @click="register" src="../assets/img/BtnRegist.svg" />
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import { mapGetters } from 'vuex'
  import Timer from '../components/Timer'
export default {
  name: 'Index',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'regions', ,
    ])
  },
  components: {
    Timer
  },
  mounted () {
    if(this.regions.length<=0){
      request({
        url:"https://op.quixmart.com/api/sys/pub/region/g",
        method: 'get',
      }).then(respData=>{
        const {data:{data}} = respData;
        let regions = data.map((country)=>{
          return {
            callingCode: country.callingCode,
            countryCode: country.countryCode,
            countryFlagHighResolutionUrl: country.countryFlagHighResolutionUrl,
            countryFlagSmallUrl: country.countryFlagSmallUrl,
            countryFlagUltraHighResolutionUrl: country.countryFlagUltraHighResolutionUrl,
            countryFlagUrl: country.countryFlagUrl,
            enabled: country.enabled,
            id: country.id,
            locale: country.locale,
            name: country.name,
          }
        })
        this.$store.dispatch('setRegions',{regions});
      });
    }
  },
  updated () {
  },
  methods: {
    plamVeinScan(){
      this.$router.push('/PhoneVerify');
      // this.$router.push('/ReChoose');
    },
    register(){
      this.$router.push('/RegisterStepOne');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  .logo{
    width: 50%;
    margin-top: 25%;
    margin-left: 10%;
  }
  .btnBox{
    width: 100%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 3.2rem;
      /*font-family: "Microsoft YaHei UI";*/
      font-family: "微软雅黑";
      margin: 5% 0;
    }
  }
</style>

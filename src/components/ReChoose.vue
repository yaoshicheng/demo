<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%">
    <Header></Header>
    <div class="content content_normal">
      <div class="content_img_container" style="margin-top: 226px;height: 182px;">
        <img src="../assets/img/alert.png" style="width:206px;height: 182px;"/>
      </div>
      <div class="content_text">
        <div class="content_text_cn">
          识别失败
        </div>
        <div class="content_text_en" style="margin-top: 20px;">
          请确认操作，15秒后将自动返回首页
        </div>
        <div class="content_text_en" style="width: 100%;font-size: 34px;margin-top: 20px;">
          Qucikly!we' s return to the homepage in 15s.
        </div>
      </div>

      <div class="btn" style="margin-top: 81px;" @click="ScanPalm">
        <div class="btn_text_cn">重新扫手</div>
        <div class="btn_text_en">Please scan your palm again</div>
      </div>
      <div class="btn" style="margin-top: 60px;" @click="HomePage">
        <div class="btn_text_cn">返回首页</div>
        <div class="btn_text_en">Scan QR code and open the door</div>
      </div>
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
      const that = this;
      // setTimeout(function () {
      //   that.$router.push('/');
      // }, 15000);
    },
    methods: {
      HomePage(){
        // this.$router.push('/');
      },
      ScanPalm(){
        this.$router.push('/PhoneVerify?type=reChoose');
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
  .btn{
    width:620px;
    height: 130px;
    margin-left: 90px;
    background: url(../assets/img/btn_back.png);
    background-size: 620px 130px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .btn_text_cn{
    font-family: "微软雅黑";
    font-size: 56px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .btn_text_en{
    opacity: 0.8;
    /*font-family: "微软雅黑";*/
    font-size: 28px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .content_normal{
    margin-top: 120px;
  }
  .content_img_container{
    height:340px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content_text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .content_text_cn{
    font-family: "微软雅黑";
    font-size: 72px;
    color: #A0A0A0;
    letter-spacing: -2.06px;
    line-height: 100px;
    text-align: center;
  }
  .content_text_en{
    opacity: 0.8;
    font-family: "微软雅黑";
    font-size: 34px;
    color: #A0A0A0;
    letter-spacing: 0;
    text-align: center;
    width: 90%;
    margin-top: 20px;
  }
</style>

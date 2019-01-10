<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%">
    <Header></Header>
    <div class="title">
      Sign up
    </div>
    <div class="stepProgress">
      <div class="step">step 1</div>
      <div class="step active">step 2</div>
      <div class="step">step 3</div>
    </div>
    <div class="text" style="margin-top: 0.2rem">
      Please enter the following
    </div>
    <div class="text">
      four bit safety codes on your cell phone
    </div>
    <div class="safetyBox">
      <div class="codeBox" v-for="(item,index) in safetyCodes" v-bind:key="index">
        {{item}}
      </div>
    </div>

    <div class="keyboard">
      <div class="keyItem" v-for="item in keyCodes" v-bind:key="item" @click="clickItem">
        {{item}}
      </div>
    </div>
    <div @click="back" class="previousBtn">Previous</div>
    <div @click="returnToIndex" class="indexBtn">Home</div>

    <!--<div class="regionMask" v-if="showErrorModal" @click="closeErrorModal" style="background: rgba(0,0,0,0)"></div>-->
    <!--<div class="ErrorModal" v-if="showErrorModal" @click="closeErrorModal" style="background: rgba(0,0,0,0.8)">-->
      <!--Verification code exception,please retype-->
    <!--</div>-->

    <div class="regionMask" v-show="showLoading" @click="closeErrorModal"></div>
    <div class="regionBox2" v-show="showLoading">
      {{verifyInfo}}
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import Header from '../components/Header'
  export default {
    name: 'Index',
    data () {
      return {
        showLoading:true,
        verifyInfo:"Please register on PayPal now for non confidential payment, and enter the verification code.",
        safetyCodes:[null,null,null,null,null,null],
        showErrorModal:false,
        defaultRegionNumber:"86",
        keyCodes:["1","2","3","4","5","6","7","8","9","cancel","0","X"],
        regions:[
          {regionPic:"111",regionName:"England",regionNumber:"16"},
          {regionPic:"111",regionName:"England",regionNumber:"26"},
          {regionPic:"111",regionName:"England",regionNumber:"36"},
          {regionPic:"111",regionName:"England",regionNumber:"46"},
          {regionPic:"111",regionName:"England",regionNumber:"56"},
          {regionPic:"111",regionName:"England",regionNumber:"66"},
          {regionPic:"111",regionName:"England",regionNumber:"76"},
          {regionPic:"111",regionName:"England",regionNumber:"86"},
          {regionPic:"111",regionName:"England",regionNumber:"96"},
        ],
        phoneNumber:"",
        blockFlag:true,
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
      back(){
        this.$router.back();
      },
      returnToIndex(){
        this.$router.push('/');
      },
      clickItem(e){
        let tmpArray = this.safetyCodes.filter(d=>d!=null);

        $('.keyboard').find('.keyItem').removeClass('active');
        let item = e.target;
        $(item).addClass('active');
        setTimeout(()=>{
          $(item).removeClass('active');
        },400)

        let value = e.target.innerText.trim();
        if(value=="cancel"){
          this.safetyCodes=[null,null,null,null,null,null];
        }else if(value=="X" || value=="x"){
          tmpArray.pop();
          for(let i=0;i<6;i++){
            if(!tmpArray[i]){
              tmpArray.push(null)
            }
          }
          this.safetyCodes = tmpArray
        }else{
          if(tmpArray.length<6){
            tmpArray.push(value);
            for(let i=0;i<6;i++){
              if(!tmpArray[i]){
                tmpArray.push(null)
              }
            }
            this.safetyCodes = tmpArray
          }
          if(this.safetyCodes.filter(d=>d!=null).length == 6){
            //调用后台验证接口
            let verificationCode = window.external.PayPalValidate(this.safetyCodes.join(""));
            alert(JSON.stringify(verificationCode))
            setTimeout(()=>{
              this.$router.push('/RegisterStepThree')
            },300)
          }
        }
      },
      closeErrorModal(){
        this.safetyCodes=[null,null,null,null,null,null];

        this.showErrorModal = false;
        this.showLoading = false;
      },
      clickRegionItem(e){
        $('.regionList').find('.regionItem').removeClass('regionItemActive');
        $(e.target).parent().addClass('regionItemActive');
        setTimeout(()=>{
          $(e.target).removeClass('regionItemActive');
        },600);
        if(e.target.dataset.regionnumber){
          this.defaultRegionNumber = e.target.dataset.regionnumber
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  @import '../css/registerStepTwo';
</style>

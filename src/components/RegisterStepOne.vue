<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%">
    <Header></Header>
    <div class="title">
      Sign up
    </div>
    <div class="stepProgress">
      <div class="step active">step 1</div>
      <div class="step">step 2</div>
      <div class="step">step 3</div>
    </div>
    <div class="text">
      input your mobile phone
    </div>
    <div class="phoneBox">
      <div class="region" @click="changeRegion">
        <span >+{{defaultRegionNumber}}</span><span class="down-arrow"></span>
      </div>
      <div class="phoneNumber">
        <div class="phoneNumberInner">
          {{phoneNumber}}
        </div>
      </div>
    </div>

    <div class="keyboard">
      <div class="keyItem" v-for="item in keyCodes" v-bind:key="item" @click="clickItem">
        {{item}}
      </div>
    </div>

    <div class="submitBox">
      <div class="submitBtn" @click="submit">
        submit
      </div>
    </div>

    <div class="regionMask" v-show="showRegions" @click="closeRegionModal"></div>
    <div class="regionBox" v-show="showRegions">
      <div class="regionContainer">
        <p class="countryTitle">Country / Region</p>
        <div class="splitLine"></div>
        <div class="regionList">
          <div class="regionItem"
               v-for="item in regions" v-bind:key="item.name"
               @click="clickRegionItem"
               :data-region-number="item.callingCode"
          >
            <img class="regionPic" :src="item.countryFlagSmallUrl" :data-region-number="item.callingCode"/>
            <div class="regionName" :data-region-number="item.callingCode">
              {{item.name}}
            </div>
            <div class="regionNumber" :data-region-number="item.callingCode">
              +{{item.callingCode}}
            </div>
          </div>
        </div>
      </div>
      <div @click="closeRegionModal">
        <div class="cancelBtn" @click="closeRegionModal">X</div>
      </div>
    </div>
    <div class="regionMask2 regionMask" v-show="showLoading" @click="closeRegionModal"></div>
    <div class="regionBox2 regionMask" v-show="showLoading">
      {{verifyInfo}}
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { mapGetters } from 'vuex'
  import Header from '../components/Header'
  let globalTimeout = null;
export default {
  name: 'Index',
  data () {
    return {
      isActive:false,
      activeInterval:null,
      showRegions:false,
      defaultRegionNumber:"86",
      keyCodes:["1","2","3","4","5","6","7","8","9","cancel","0","X"],
      phoneNumber:"",
      blockFlag:true,
      showLoading:false,
      verifyInfo:"In verification, please wait a moment.",
    }
  },
  computed: {
    ...mapGetters([
      'regions',
    ])
  },
  components: {
    Header
  },
  mounted () {
    const that = this;
    this.activeInterval = setInterval(()=>{
      if(!that.isActive){
        clearInterval(that.activeInterval)
        this.$router.push('/');
      }
    },10000)
  },
  methods: {
    // returnToIndex(){
    // //   this.activeInterval = null
    // //   this.$router.push('/');
    // // },
    clickItem(e){
      const that = this;
      clearTimeout(globalTimeout);
      this.isActive = true;
      globalTimeout = setTimeout(()=>{
        that.isActive = false;
      },10000)
      $('.keyboard').find('.keyItem').removeClass('active');
      let item = e.target;
      $(item).addClass('active');
      setTimeout(()=>{
        $(item).removeClass('active');
      },400)
      let value = e.target.innerText.trim();
      let phoneNumber = this.phoneNumber;
      if(value=="cancel"){
        this.phoneNumber="";
      }else if(value=="X" || value=="x"){
        if(phoneNumber.length>0){
          phoneNumber = phoneNumber.substring(0,phoneNumber.length-1)
          this.phoneNumber=phoneNumber;
        }
      }else{
        this.phoneNumber=phoneNumber+value;
      }
    },
    submit(){
      this.verifyInfo = "";
      let PALM_UNREGISTE = 0;
      let MOBILE_REGISTED = 1;
      let MESSAGE_SEND = 2;
      let phoneNumber = this.phoneNumber;
      clearTimeout(globalTimeout);
      const that = this;
      this.showLoading = true;
      if(phoneNumber !==""){
        that.verifyInfo ="Loading...";
        this.$store.dispatch('setPhoneNumber',{phoneNumber});
        setTimeout(()=>{
          let verificationCode = window.external.PayPalSignUp(this.defaultRegionNumber+this.phoneNumber);
          if(typeof verificationCode ==="string" ){
            verificationCode = JSON.parse(verificationCode)
          }

          // that.showLoading = false;
          // alert(JSON.stringify(verificationCode))
          if(verificationCode.code === "2" || verificationCode.code === MESSAGE_SEND ){
            that.verifyInfo ="The verification code has been sent.";
            setTimeout(()=>{
              that.showLoading = false;
              that.verifyInfo ="In verification, please wait a moment.";
              this.$router.push('/RegisterStepTwo')
            },1500)
          }else if(verificationCode.code === "1" || verificationCode.code === MOBILE_REGISTED){
            that.verifyInfo ="You have registered!";
            setTimeout(()=>{
              that.showLoading = false;
              that.verifyInfo ="In verification, please wait a moment.";
              this.$router.push('/')
            },1500)
          }else if(verificationCode.code === "0" || verificationCode.code === PALM_UNREGISTE){
            that.verifyInfo ="You have not registered!";
            setTimeout(()=>{
              that.showLoading = false;
              that.verifyInfo ="In verification, please wait a moment.";
            },1500)
            this.$router.push('/RegisterStepThree')
          }else{
            that.verifyInfo ="Error!";
            setTimeout(()=>{
              that.showLoading = false;
              that.verifyInfo ="Error!";
            },1500)
          }
        },100)
      }else{
        that.verifyInfo ="Enter phone number";
      }
    },
    changeRegion(){
      this.showRegions = true;
    },
    closeRegionModal(){
      this.showRegions = false;
      this.showLoading = false;
    },
    clickRegionItem(e){
      $('.regionList').find('.regionItem').removeClass('regionItemActive');
      $(e.target).parent().addClass('regionItemActive');
      setTimeout(()=>{
        $(e.target).removeClass('regionItemActive');
      },600);
      if(e.target.dataset.regionNumber){
        this.defaultRegionNumber = e.target.dataset.regionNumber
      }
      setTimeout(()=>{
        this.showRegions = false;
      },300)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  @import '../css/registerStepOne';
</style>

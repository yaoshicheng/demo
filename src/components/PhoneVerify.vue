<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%">
    <Header></Header>
    <div class="title">
      Verify the mobile
    </div>
    <div class="text" style="margin-top: 0.2rem">
      Please enter the last four numbers of your
    </div>
    <div class="text">
      phone number.
    </div>
    <div class="safetyBox">
      <div class="codeBox" v-for="(item,index) in safetyCodes" v-bind:key="index">
        {{item}}
      </div>
    </div>

    <div class="keyboard">
      <div class="keyItem" style="height:0.8rem;line-height: 0.8rem"  v-for="item in keyCodes" v-bind:key="item" @click="clickItem">
        {{item}}
      </div>
    </div>
    <div @click="back" class="previousBtn">Return</div>
    <!--<div @click="returnToIndex" class="indexBtn">返回首页</div>-->

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
        safetyCodes:[null,null,null,null],
        showErrorModal:false,
        defaultRegionNumber:"86",
        keyCodes:["1","2","3","4","5","6","7","8","9","cancel","0","X"],
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
    created(){
      if(this.$route.query.type && this.$route.query.typ === "rechoose"){
        this.safetyCodes = this.$store.state.verifyNumber.split('')
        setTimeout(()=>{
          this.$router.push('/CheckPlam')
        },300)
      }
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
          this.safetyCodes=[null,null,null,null];
        }else if(value=="X" || value=="x"){
          tmpArray.pop();
          for(let i=0;i<4;i++){
            if(!tmpArray[i]){
              tmpArray.push(null)
            }
          }
          this.safetyCodes = tmpArray
        }else{
          if(tmpArray.length<4){
            tmpArray.push(value);
            for(let i=0;i<4;i++){
              if(!tmpArray[i]){
                tmpArray.push(null)
              }
            }
            this.safetyCodes = tmpArray
          }
          if(this.safetyCodes.filter(d=>d!=null).length == 4){
            //调用后台验证接口
            this.$store.dispatch('setVerifyNumber',{verifyNumber:this.safetyCodes.join("")});
            setTimeout(()=>{
              this.$router.push('/CheckPlam')
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

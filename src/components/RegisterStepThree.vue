<template>
  <div style="background: url('src/assets/img/background.png');position: absolute;width: 100%;height: 100%">
    <Header></Header>
    <div class="title">
      Sign up
    </div>
    <div class="stepProgress">
      <div class="step">step 1</div>
      <div class="step">step 2</div>
      <div class="step active">step 3</div>
    </div>
    <div class="text" style="margin-top: 4.2rem;font-size: 0.4rem">
      Plam scan PLS
    </div>
    <div @click="back" class="previousBtn">Previous</div>
    <div @click="returnToIndex" class="indexBtn">Home</div>
    <object id="myotherobj" type="application/x-itst-activex" clsid="{372969D6-CB4D-4228-A191-556B5205E75A}"
            style="width: 0; height: 0; margin-top: 1rem;" onclick="registerHandvein(globalObj.apiVienRegister);"></object>
    <OBJECT id="myobj" classid="clsid:372969D6-CB4D-4228-A191-556B5205E75A"
            style="width: 0; height: 0; margin-top: 1rem;"></OBJECT>
    <input id="veinData" name="veinData" type="hidden" class="required" value="" />

  </div>
</template>

<script>
  import $ from 'jquery'
  import Header from '../components/Header'
  import { mapGetters } from 'vuex'

  let Page = {};
  let count = 0;
  let alipayUserID=0;

  export default {
    name: 'Index',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'phoneNumber',
        'VienAPIPath',
      ])
    },
    components: {
      Header
    },
    mounted () {
      // loading();
      // alert(JSON.stringify(loading))
      const that = this;
      let objectX;
      $.fn.palmload = function (options) {
        let opts = $.extend({}, $.fn.palmload.defaults, options);
        try {
          if (!!window.ActiveXObject || "ActiveXObject" in window) { // IE
            objectX = document.getElementById(opts.ieObjectXkey);
          } else {
            objectX = document.getElementById(opts.otherObjXKey);
          }
          let init = objectX.Pvs_InitCtrl();
          if (init.toString() === "1") {
            let load;
            if (opts.palmTypeKey === 'check') {
              load = objectX.Pvs_LoadLoginDialog();
            } else {
              // 单手采集注册
              load = objectX.Pvs_EnrollSingleHand();
              // 双手采集注册
              //load = objectX.Pvs_EnrollBothHand();
            }
            if (load.toString() === "1") {
              objectX.Pvs_CloseSensor();
              let veinData;
              if (opts.palmTypeKey === 'check') {
                veinData = objectX.Pvs_GetCaptureVeinData();
              } else {
                veinData = objectX.Pvs_GetEnrollVeinData();
              }
              document.getElementById(opts.veinDataKey).value = veinData
                .toString();
              $('.' + opts.veinDataMsgKey).html(opts.veinDataMsg);
              if (opts.callback) { // 回调函数
                opts.callback.call();
              }
            } else {
              if (opts.palmTypeKey !== 'check'){
                that.$router.push('/');
                // window.location.href = 'Index.html';
              }
            }
          } else {
            objectX.Pvs_CloseSensor();
          }

        } catch (e) {
          alert(e);
        } finally {
          objectX.Pvs_CloseSensor();
        }

      };

      // 插件参数默认值
      $.fn.palmload.defaults = {
        ieObjectXkey: 'myobj',
        otherObjXKey: 'myotherobj',
        veinDataKey: 'veinData',
        veinDataMsgKey: 'veinDataMsg',
        veinDataMsg: '采集完成',
        palmTypeKey: 'check' //默认为验证 否则是注册
      };
      $(window).palmload({
        palmTypeKey: 'register',
        callback: function () {
          Page.veinData = $('#veinData').val();
          let phoneNumber = that.phoneNumber;
          // loading();
          let indentifyData = {
            "capture": Page.veinData,
            "phoneSuffix": phoneNumber
          };
          Page.phoneNumber = phoneNumber;

          let tmpData = window.external.SignUpInfo(Page.veinData);
          // alert(tmpData)
          if(typeof tmpData ==="string" ){
            tmpData = JSON.parse(tmpData)
          }
          if(tmpData.success){
            that.$router.push('/BoundSuccess');
          }else{
            that.$router.push('/BoundFail');
          }
          // that.VeinPostRequest('/api/grampus/palm/identify', indentifyData, that.IdentifyCallBack);
        }
      })
    },
    methods: {
      back(){
        this.$router.back();
      },
      returnToIndex(){
        this.$router.push('/');
      },
      // ErrorCallback() {
      //   this.$router.push('/BoundFail');
      // },
      IdentifyCallBack(result) {
        if (result.resultCode.toString() == "1") {
          alipayUserID = result.data.palmRes.userId;
          // LoginMemberStatus(alipayUserID);
        } else {
          this.$router.push('/BoundFail');
        }
      },
      VeinPostRequest(url, data) {
        const that = this;
        $.ajax({
          type: "POST",
          contentType: "application/json",
          url: that.VienAPIPath + url,
          timeout: 5000,
          data: JSON.stringify(data),
          cache: false,
          async: true,
          success: function (result) {
            count = 0;
            that.IdentifyCallBack(result);
          },
          error: function () {
            count++;
            if (count > 9) {
              count = 0;
              that.$router.push('/BoundFail');
              // window.location.href = "Nodoor.html";a
            }
            that.VeinPostRequest(url, data);
          }
        });
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  @import '../css/registerStepOne';
</style>

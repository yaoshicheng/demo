<template>
  <div class="timerBox">
    <span class="right">{{currentTime}}</span>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'Header',
    data () {
      return {
        currentTime:"",
      }
    },
    mounted() {
      const that = this;
      this.setCurrentTime();
      setInterval(()=>{
        that.setCurrentTime();
      }, 1000);
    },
    updated(){
    },
    methods: {
      checkTime(i)
      {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      },
      setCurrentTime(){
        let date = new Date();
        let time = moment(date).format('YYYY-MM-DD HH:mm:ss')
        this.currentTime = time;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  @import '../css/common';
  .timerBox{
    position: fixed;
    top: 0.2rem;
    width:100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .headerLogo{
    width: 25%;
    margin-left: 5%;
  }
  .right{
    font-size:0.20rem;
    margin-right: 5%;
  }
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

  @import "./styles/app.scss";

  html,body{
    width: 100%;
    height: 100%;
    font-size: 100px !important;
    line-height: 0 !important;
    font-family: "PingFangSC-Regular, sans-serif";
  }
  #app{
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 1485px){
    html, body {
      font-size: 85px !important;
    }
  }
  @media screen and (max-width: 1285px){
    html, body {
      font-size: 75px !important;
    }
  }
</style>

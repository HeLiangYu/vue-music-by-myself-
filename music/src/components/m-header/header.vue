<template>
  <div class="header-wrapper">
    <span></span>
    <span>Chicken Music</span>
  </div>
</template>

<script>
  export default {}
</script>

<style>
* {
    margin: 0;
    padding: 0;
  }
.header-wrapper{
  text-align: center;
  color: #ffd93b;
  height: 40px;
  line-height: 40px;
  background-color: #222222;
}
.header-wrapper>span{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
}
.header-wrapper>span:first-child{
  background-image: url('./logo@3x.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 30px;
  height: 30px;
  line-height: 30px;
}
</style>


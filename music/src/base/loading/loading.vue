<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p>{{title}}</p>
  </div>  
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在加载...'
    }
  }
}
</script>

<style scoped>
.loading{
  width: 100%;
  text-align: center;
}
.loading>img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
}
</style>


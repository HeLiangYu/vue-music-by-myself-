<template>
  <div id="app">
    <v-header></v-header>

    <div class="nav">
      <span class="nav-item">
        <router-link to="/recommend">推荐</router-link>
      </span>
      <span class="nav-item">
        <router-link to="/singer">歌手</router-link>
      </span>
      <span class="nav-item">
        <router-link to="/search">排行</router-link>
      </span>
      <span class="nav-item">
        <router-link to="/rank">搜索</router-link>
      </span>
    </div>

    <keep-alive>
      <router-view></router-view>
      <!--使用keep-alive将数据保存在缓存中，在路由切换的时候不会再重新渲染页面-->
    </keep-alive>
    
  </div>
</template>

<script>
import header from './components/m-header/header'

export default {
  name: 'App',
  components: {
    'vHeader': header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
  background-color: #222;
}
.nav{
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #222222;
  padding: 10px 0;
}
.nav-item{
  flex: 1;
  display: inline-block;
  text-align: center;
}
.active{
  border-bottom: 3px solid #ffd93b;
}
.nav-item>a{
  color: #ffd93b;
  text-decoration: none;
  display: inline-block;
}
</style>

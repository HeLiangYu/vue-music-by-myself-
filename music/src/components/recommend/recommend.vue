<template>
  <div class="recommend">
    <v-scroll :data="videoPic" class="recommend-content" ref="scroll">
      <div>
        <div class="slider-wrapper" v-if="bigPics.length">
          <v-slider>
            <div v-for="(item, index) in bigPics" :key="index">
              <img  class="needsclick" :src="item.mobileImg" alt="" @load="loadImg()">
            </div>
          </v-slider>
        </div>
        <div class="list">
          <div>
            <ul>
              <li v-for="(item, index) in videoPic" :key="index" >
                <div class="re-img-wrapper"><img v-lazy="item.image" alt=""></div>
                <div class="re-text">
                  <p class="re-title">{{item.title}}</p>
                  <p class="re-name">{{item.subTitle}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-show="!videoPic.length" class="loading-wrapper">
        <loading></loading>
      </div>
    </v-scroll>
  </div>
</template>

<script>
import slider from '../../base/silder/slider';
import {getRecommend, getVideo} from '../../api/recommend';
import {ERR_OK} from '../../api/config';
import scroll from '../../base/scroll/scroll';
import loading from '../../base/loading/loading';

export default {
  data(){
    return {
      bigPics : [],
      videoPic: []
    }
  },
  created() {
    this._getRecommend();
    this._getVideo();
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        this.bigPics = res.bigPics;
      });  
    },
    _getVideo () {
      getVideo().then((res) => {
        this.videoPic = res.videos;
      });
    },
    // 因为scroll中的内容的高度是动态的，所以是在下面的列表渲染之后才把这个高度加到滚动高度上
    // 但是如果前面的轮播图比下面的列表后渲染的话，就会少获取轮播图这一块的高度，页面是滚不到底部的
    // 所以在图片渲染之后就将better-scroll重绘
    loadImg () {
      if(!this.check){
        this.$refs.scroll.refresh();
        this.check = true;
      }
    }
  },
  components: {
    vSlider: slider,
    vScroll: scroll,
    loading,
  }
}
</script>

<style>
.recommend{  /*这个地方的样式一定要设置，否则样式会出现问题，将整个页面固定，然后将头部的宽度留出*/
  position: fixed;
  width: 100%;
  top: 100px;
  bottom: 0;
  background-color: #222;
}
.recommend-content{
  height: 100%;
  overflow: hidden;
}
.list{
  padding: 10px 0;
}
.list li{
  display: flex;
  padding: 5px 15px;
  font-size: 14px;
  text-align: left;
}
.list li img{
  width: 100px;
  vertical-align: middle;
}
.re-text{
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  vertical-align: middle;
}
.re-title{
  color: #ffffff;
}
.re-name{
  color: #999;
  font-size: 12px;
}

.loading-wrapper{
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>



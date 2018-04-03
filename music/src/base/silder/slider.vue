<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="page" v-for="(item, index) in dots" :key="index" :class="{show:currrentIndex===index}" >
      <span><span>{{parseInt(index)+1}} </span>/ {{dots.length}}</span>
    </div>
  </div>  
</template>

<script>
import BScroll from 'better-scroll';
import {addClass} from '../../common/js/dom';

export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initSlider();
      this._initDots();
      if(this.autoPlay){
        this._play();
      }
    }, 20);

    window.addEventListener('resize', () => {
      if(!this.slider){
        return
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    })
  },
  data () {
    return {
      dots: [],
      currrentIndex: 0
    }
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;

      for(let i=0; i<this.children.length; i++){
        let child = this.children[i];
        addClass(child, 'slider-item');
        child.style.width = sliderWidth + 'px';
        width += sliderWidth;
      }

      if(this.loop) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + 'px';
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
        click: true
      });

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX;

        this.currrentIndex = pageIndex;

        if(this.autoPlay){
          clearTimeout(this.timer);
          this._play();
        }
      });

      this.slider.on('beforeScrollStart', () => {
        if(this.autoPlay){
          clearTimeout(this.timer);
        }
      });

      this.slider.on('scrollStart', () => {
        if(this.autoPlay){
          clearTimeout(this.timer);
        }
      });
    },

    _initDots() {
      this.dots = new Array(this.children.length-2);
    },
    
    _play() {
      let timer = setTimeout(() => {
        this.slider.next(400);
      }, this.interval);
      this.timer = timer; //直接在其他的方法中使用this.timer是关不上定时器的，要重新定义一个属于vue实例的timer才可以在其他地方准确的拿到
    }
  },
  destroyed () {
    console.log('destroyed --> 清理定时器');
    clearTimeout(this.timer);  //有利于内存的释放
  }
}
</script>

<style>
.slider{
    min-height: 1px;
    width: 100%;
    position: relative;
}
.slider-group{
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.slider-item{
  float: left;
  box-sizing: border-box;
  overflow: hidden;
  text-align: center;
}
.slider .slider-item img{
  display: block;
  width: 100%;
  z-index: 9;
  position: relative;
}
.slider .page{
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #FFF;
  z-index: 99;
  display: none;
}
.slider .show{
  display: block;
}
</style>


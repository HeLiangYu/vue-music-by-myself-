<template>
  <scroll :data="data"
   :listen-scroll="listenScroll" 
   @scroll="scroll"
   :probeType="probeType"
   class="singer" 
   ref="listview">
    <div>
      <ul class="singer-list">
        <li v-for="(group, gindex) in data" :key="'group-' + gindex" class="list-li" ref="listGroup">
          <h2>{{group.title}}</h2>
          <ul class="item-ul">
            <li v-for="(item, index) in group.items" :key="'item-' + index" class="item-li">
              <img v-lazy="item.avator" alt="">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="shortList" @touchstart="onShortTouchStart($event)" @touchmove.stop.prevent="onShortTouchMove($event)">
      <ul>
        <li v-for="(item, index) in shortList" :key="'short-' + index" :data-index="index" :class="{active: currentIndex === index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="fixed-list" v-show="fixedTitle" ref="fixed">
      <h2 class="fixed-title">{{fixedTitle}}</h2>
    </div>
    <div v-show="!data.length" class="loading-wrapper">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import scroll from '../scroll/scroll';
import loading from '../loading/loading';
import {getAttr} from '../../common/js/dom';

const ANCHOR_HEIGHT = 23;
const TITLE_HEIGHT = 38;

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      listenScroll: true,
      touch: {},
      listHeight: [],
      scrollY: -1,
      currentIndex: 0,
      probeType: 3,
      diff: 0,
    }
  },
  created() {
  },
  components: {
    scroll,
    loading
  },
  created() {
  },
  methods: {
    onShortTouchStart(e) {
      let anchorindex = getAttr(e.target, 'index');
      let touchIndex = e.touches[0];
      this.touch.y1 = touchIndex.pageY;
      this.touch.anchorindedx = anchorindex;
      console.log('锚点'+anchorindex);
      this._scrollTo(anchorindex);
    },
    onShortTouchMove(e) {
      let touchIndex = e.touches[0];
      this.touch.y2 = touchIndex.pageY;
      let moveheight = (this.touch.y2 - this.touch.y1) /ANCHOR_HEIGHT | 0;
      let moveItem = parseInt(moveheight);
      let anchorindedx = parseInt(this.touch.anchorindedx) + moveItem;
      this._scrollTo(anchorindedx);
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for(let i=0; i<list.length; i++){
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _scrollTo(index) {
      if(!index && index!==0){
        return ;
      }
      if(index<0){
        index = 0;
      }else if(index > this.data.length-1){
        index = this.data.length-1;
      }
      this.scrollY = -this.listHeight[index]; // 这里的scrollY将会在watch中监听，然后currentIndex会改变
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 2000);
      console.log('index:'+index);
    },
  },
  computed: {
    shortList (){
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    },
    // 固定每一栏的标题到头部
    fixedTitle() {
      if(this.scrollY > 0){
        return '';
      }
      if(this.data[this.currentIndex]){
        return this.data[this.currentIndex].title;
      }else{
        return '';
      }
    }
  },
  watch: {
    // 监听数据，数据有变化就重新渲染
    data () {
      setTimeout(() => {
        this._calculateHeight();
      }, 20);
    },
    scrollY(newY){
      const listHeight = this.listHeight;

      // 当滚动到顶部后
      if(newY > 0){
        this.currentIndex = 0;
        return ;
      }

      // 当滚动到中间
      for(let i=0; i<this.listHeight.length-1; i++){
        let height1 = listHeight[i];
        let height2 = listHeight[i+1];
        if(-newY>=height1 && -newY<=height2){
          this.diff = height2 + newY;
          this.currentIndex = i;
      console.log('current:'+this.currentIndex)
          return ;
        }
      }

      // 当滚动到底部时
      this.currentIndex = listHeight.length - 1;
    },

    // 标题平滑消失效果
    diff(newVal){
      let fixedTop = (newVal>0 && newVal<TITLE_HEIGHT) ? newVal-TITLE_HEIGHT : 0;
      if(fixedTop === newVal){
        return ;
      }
      this.fixedTop = fixedTop;
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
    }
  }
}
</script>

<style scoped>
.singer{
  height: 100%;
  overflow: hidden;
  z-index: 1;
  position: relative;
}
.singer-list{
  text-align: left;
}
.singer-list img{
  width: 80px;
  border-radius: 50%;
}
.list-li>h2{
  background-color: #555;
  text-indent: 0.5em;
  padding: 5px 0;
}
.item-ul>li:last-child{
  border-bottom: 0;
}
.item-li{
  padding: 15px;
  border-bottom: 1px solid #555;
}
.item-li>img, .item-li>span{
  vertical-align: middle;
  margin-right: 10px;
}

.loading-wrapper{
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

.shortList{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}
.shortList li{
  list-style: none;
  padding: 1px 3px;
}
.active{
  color: #ffd93b;
  border-bottom: none;
}

.fixed-list{
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  text-align: left;
  background-color: #555;
  z-index: 9;
}
.fixed-list>h2{
  text-indent: 0.5em;
  padding: 5px 0;
}
</style>




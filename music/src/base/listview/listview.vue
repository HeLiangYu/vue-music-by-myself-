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
    <div class="fixed-list" v-show="fixedTitle">
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
      this.scrollY = -this.listHeight[index];
      console.log(this.scrollY)
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 2000);
    }
  },
  computed: {
    shortList (){
      return this.data.map((group) => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle() {
      if(this.scrollY > 0){
        return ''
      }
      return this.data[this.currentIndex].title ? this.data[this.currentIndex].title : '';
    }
  },
  watch: {
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
        return 
      }
      
      // 当滚动到中间
      for(let i=0; i<this.listHeight.length-1; i++){
        let height1 = listHeight[i];
        let height2 = listHeight[i+1];
        if(!height2 || (-newY>height1 && -newY<height2)){
          this.currentIndex = i;
          return
        }
      }

      // 当滚动到底部时

      this.currentIndex = listHeight.length - 1;
    }
  }
}
</script>

<style scoped>
.singer{
  height: 100%;
  overflow: hidden;
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
}
.fixed-list>h2{
  text-indent: 0.5em;
  padding: 5px 0;
}
</style>




<template>
  <div class="singer-content">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script>
import listView from '../../base/listview/listview'
import { getSinger } from '../../api/singer';
import Singer from '../../common/js/Singer';
const ERR_OK = 0;
const HOT_NAME = '热门';
const HOT_NAME_LEN = 10;

export default {
  data() {
    return {
      singers: []
    }
  },
  created () {
    this._getSinger();
    
  },
  methods: {
    _getSinger () {
      getSinger().then((res) => {
        if(res.code === ERR_OK){
          this.singers = this._nomarSinger(res.data.list);
        }else{
          console.log('出现错误');
        }
      })
    },

    // 将获得的歌手数据按自己的需求进行封装
    _nomarSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };

      list.forEach((item, index) => {
        if(index < HOT_NAME_LEN){
          map.hot.items.push(new Singer(
            item.Fsinger_id,
            item.Fsinger_name,
            item.Fsinger_mid
          ));
        }
        const key = item.Findex;
        if(!map[key]){
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer(
            item.Fsinger_id,
            item.Fsinger_name,
            item.Fsinger_mid
          ));
      });
      let hot = [];
      let ret = [];
      for(let key in map){
        let val = map[key];
        if(val.title !== HOT_NAME){
          ret.push(val);
        }else if(val.title === HOT_NAME){
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);  // 数据按title进行升序排序
      });
      let singerArr = hot.concat(ret);
      return singerArr;
    }
  },
  components: {
    listView
  }
}
</script>

<style>
.singer-content{
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;
  background-color: #222;
  color: #ffffff;
}
</style>



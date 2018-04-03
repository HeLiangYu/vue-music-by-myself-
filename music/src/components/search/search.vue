<template>
  <div v-if="list.length">
    <ul>
      <li v-for="(item, index) in list" :key="item.id">
        <span><input type="checkbox" v-model="list" :value="item.name" :id="item.id" @click="check($event, index)" :checked="checked" ></span>
        <span>{{item.id}}</span>
        <label :for="item.id">{{item.name}}</label>
        <span>{{item.price}}</span>
        <span>
          <button @click="reduce(index)" :disabled="item.count === 1">-</button>
          {{item.count}}
          <button @click="add(index)">+</button>
          </span>
        <span><button @click="remove(index)">移除</button></span>
      </li>
    </ul>
      <div>总价：￥{{totalPrice}}</div>
    </tbale>  
  </div>
  <div v-else>购物车是空的</div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: 'books',
          price: 50,
          count: 1
        },
        {
          id: 2,
          name: 'food',
          price: 50,
          count: 1
        },
        {
          id: 3,
          name: 'water',
          price: 50,
          count: 1
        }],
      checkValue: [],
      checked: 'checked'
    }
  },
  created() {
  },
  computed: {
    totalPrice() {
      if(this.list.length){
        for(let i=0; i<this.list.length; i++){
          var tatol = 0;
          let item = this.list[i];
          tatol += item.price * item.count;
        }
        return tatol;
      } else {
        return 0;
      }
    }
  },
  methods: {
    reduce (index) {
      if(this.list[index].count === 1) return ;
      this.list[index].count--;
    },
    add (index) {
      this.list[index].count++;
    },
    remove(index){
      this.list.splice(index, 1);
    },
    check (ev, index) {
      // if(ev.target.checked){
      //   this.list.push[item];
      //   console.log(item);
      // } else if (this.list.indexOf(item) < -1){
      //   this.list.remove(item);
      // }
      if(ev.target.checked){
        this.totalPrice = this.list[index].price * this.list[index].count;
      }
      console.log(this.list);
    },
    
    }
}
</script>

<style>

</style>



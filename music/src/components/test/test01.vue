<template>
  <div>
    <component :is="currentCom"></component>
    <button @click="changeCom('A')">change A</button>
    <button @click="changeCom('B')">change B</button>
    <button @click="changeCom('C')">change C</button>
  </div>
</template>

<script>
export default {
  // component来挂载动态组件
  data () {
    return {
      currentCom: 'comA'
    }
  },
  components: {
    comA: {
      template: '<div>组件A</div>'
    },
    comB: {
      template: '<div>组件B</div>'
    },
    comC: {
      template: '<div>组件C</div>'
    }
  },
  methods: {
    changeCom (component) {
      this.currentCom = 'com' + component;
    }
  }
}
</script>

<style>

</style>



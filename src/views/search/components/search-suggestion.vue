<template>
  <div class="suggestion-container">
    <van-cell
      v-for="(item, index) in suggestionLists"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getArticleSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'suggestionIndex',
  comments: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestionLists: []
    }
  },
  computed: {},
  watch: {
    // 只要发生改变就会触发
    searchText: {
      // 这里的value就是searchText
      handler: debounce(function(value) {
        this.loadArticleSug(value)
      }, 200),
      // 监听事件立即执行
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // keyWord 是handle里面的 value
    async loadArticleSug(keyWord) {
      try {
        const { data } = await getArticleSuggestion(keyWord)
        this.suggestionLists = data.data.options
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    highLight(str) {
      const reg = new RegExp(this.searchText, 'gi') // 正则如果要是变量的话,必须经过构造函数,不能直接用字面量,否则会当作正则的条件
      const highLightStr = `<span class="active">${this.searchText}</span>`
      return str.replace(reg, highLightStr)
    }
  }
}
</script>
<style lang="less" scoped>
.suggestion-container {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>

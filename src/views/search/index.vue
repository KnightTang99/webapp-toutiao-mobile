<template>
  <div class="search-container">
    <!-- form是为了移动端键盘出现搜索按钮 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        background="#3296FA"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果组件 -->
    <search-content
      :search-text="searchText"
      v-if="isResultShow"
    ></search-content>
    <!-- 联想建议组件 -->
    <search-suggestion
      :search-text="searchText"
      v-else-if="searchText"
      @search="onSearch"
    ></search-suggestion>
    <!-- 搜索历史组件 -->
    <search-history
      @search="onSearch"
      @updateHistoryList="handler"
      :history-list="historyList"
      v-else
    ></search-history>
  </div>
</template>
<script>
import searchContent from './components/search-content'
import searchHistory from './components/search-history'
import searchSuggetion from './components/search-suggestion'
import { setItem, getItem } from '@/utiles/storage'
export default {
  name: 'searchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false,
      historyList: getItem('TOUTIAO_HISTORY_LIST') || []
    }
  },
  props: {},
  components: {
    'search-content': searchContent,
    'search-history': searchHistory,
    'search-suggestion': searchSuggetion
  },
  computed: {},
  watch: {
    historyList(value) {
      setItem('TOUTIAO_HISTORY_LIST', value)
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onSearch(val) {
      // 文本框与联想建议同步
      this.searchText = val
      const index = this.historyList.indexOf(val)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(val)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    },
    handler(list) {
      this.historyList = list
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    // width: 100%;
    right: 0;
    z-index: 1;
  }
}
</style>

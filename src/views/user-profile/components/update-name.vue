<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      @click-left="$emit('close')"
      right-text="确定"
      @click-right="onConfirm"
    />
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      try {
        const localName = this.localName
        if (!localName) {
          return this.$toast('请输入昵称')
        }
        await updateUserProfile({
          name: localName
        })
        this.localName = ''
        this.$emit('close')
        this.$emit('input', localName)
      } catch (err) {
        this.$toast.fail('更新失败，请重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.update-name {
  .field-wrap {
    padding: 20px;
  }
}
</style>

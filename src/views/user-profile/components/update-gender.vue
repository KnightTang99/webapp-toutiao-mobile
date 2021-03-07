<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
      :default-index="value"
    />
  </div>
</template>
<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '更新中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserProfile({
          gender: this.localGender
        })
        this.$emit('input', this.localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败，请重试')
      }
    },
    onGenderChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>
<style lang="less" scoped></style>

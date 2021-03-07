<template>
  <div class="update-avatar">
    <img class="avatar" ref="img" :src="img" alt="" />
    <div class="bar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">确定</div>
    </div>
  </div>
</template>
<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user'
export default {
  name: 'UpdateAvatar',
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 拿到img DOM 元素
    const image = this.$refs.img
    // 创建一个 Cropper 实例，并配置参数
    this.cropper = new Cropper(image, {
      viewMode: 1, // 定义裁剪器的视图模式 0 裁剪框可以扩展到画布之外; 1 裁剪框不超过画布的大小; 2 适合于容器内的最小画布大小
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪比例，裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片，按比例撑满画布
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false, // 关闭默认背景
      movable: true
    })
  },
  methods: {
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        this.updateAvatar(formData)
      })
    },
    async updateAvatar(avatarData) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await updateUserPhoto(avatarData)
        this.$emit('update-avatar', data.data.photo)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败，请重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.update-avatar {
  background-color: #000;
  height: 100%;
  .bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      color: #fff;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
    }
  }
  .avatar {
    max-width: 100%;
    display: block;
  }
}
</style>

<template>
  <div class="edit-artical-wrapper">
    <div class="text-box">
      <textarea :value="text" placeholder="分享快乐的话题" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: 0,
      text: ''
    }
  },
  onLoad(option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option, 'option') //打印出上个页面传递的参数。
    this.flag = option.flag
  }
}
</script>

<style lang="scss">
.edit-artical-wrapper {
  background-color: #fff;
  height: 100vh;
  padding: 40rpx;
  textarea {
    background-color: #f0f0f0;
    height: 300rpx;
    width: 100%;
  }
}
</style>

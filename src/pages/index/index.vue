<template>
  <div class="index-wrapper">
    <home v-if="actived === 1"></home>
    <my v-if="actived === 2"></my>
    <div class="tab-bar">
      <span @click="handleClick(1)" :class="{ actived: actived === 1 }"></span>
      <span @click="handleClick(2)" :class="{ actived: actived === 2 }"></span>
    </div>
    <div class="deciair-button-wrapper" @click="open">
      <img src="../../static/img/fabu.png" alt="" />
    </div>
    <uni-popup ref="popup" type="bottom">
      <div class="check-box">
        <h3>选择发布话题</h3>
        <ul>
          <li v-for="item in themeList" :key="item.value">
            <span class="flag" @click="goEdit(item.value)">
              {{ item.label }}
            </span>
          </li>
        </ul>
      </div>
    </uni-popup>
  </div>
</template>

<script>
import Home from '../home/index'
import My from '../my/index'
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue' //也可使用此方式引入组件

export default {
  data() {
    return {
      actived: 1,
      topic: '',
      themeList: [
        { label: '拼车', value: 0 },
        { label: '旅行', value: 1 },
        { label: '生活', value: 2 },
        { label: '美食', value: 3 },
        { label: '情感', value: 4 },
        { label: '游戏', value: 5 },
        { label: '校园', value: 6 },
        { label: '动漫', value: 7 },
        { label: '电影', value: 8 },
        { label: '汽车', value: 9 }
      ]
    }
  },
  components: { Home, My, uniPopup },
  onLoad(option) {
    console.log(option, 'option')
    this.topic = option.topic
  },
  methods: {
    handleClick(index) {
      this.actived = index
    },
    open() {
      this.$refs.popup.open()
    },
    goEdit(flag) {
      console.log(flag, 'flag')
      uni.navigateTo({
        url: '/pages/editArtical/index?flag=' + flag,
        success: () => {
          console.log(111)
        },
        fail: err => {
          console.log(err, 222)
        },
        complete: () => {
          console.log(333)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.index-wrapper {
  .tab-bar {
    align-items: center;
    background-color: #f4f4f4;
    bottom: 0;
    display: flex;
    height: 100rpx;
    justify-content: space-around;
    position: fixed;
    width: 100%;
    span {
      height: 68rpx;
      width: 68rpx;
      &:first-child {
        background: #f4f4f4 url('~@/static/img/home_default.png') no-repeat
          center/90%;
        &.actived {
          background: #f4f4f4 url('~@/static/img/home_actived.png') no-repeat
            center/90%;
        }
      }
      &:last-child {
        background: #f4f4f4 url('~@/static/img/my_default.png') no-repeat
          center/90%;
        &.actived {
          background: #f4f4f4 url('~@/static/img/my_actived.png') no-repeat
            center/90%;
        }
      }
    }
  }
  .deciair-button-wrapper {
    bottom: 47rpx;
    left: 50%;
    position: fixed;
    transform: translateX(-50%);
    z-index: 50;
    img {
      height: 94rpx;
      width: 94rpx;
    }
  }
  .check-box {
    background-color: #fff;
    height: 500rpx;
    padding: 30rpx 40rpx;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
    li {
      flex-basis: 33%;
      text-align: center;
      margin-top: 40rpx;
    }
    .flag {
      border: 2rpx solid #e1e1e1;
      border-radius: 40rpx;
      color: #a9a9a9;
      font-size: 24rpx;
      height: 56rpx;
      line-height: 56rpx;
      margin: 0 auto;
      padding: 10rpx 54rpx;
    }
  }
}
</style>

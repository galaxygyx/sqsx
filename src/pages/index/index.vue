<template>
  <div class="index-wrapper">
    <home v-if="actived === 1"></home>
    <div class="tab-bar">
      <span @click="handleClick(1)" :class="{ actived: actived === 1 }"></span>
      <span @click="handleClick(2)" :class="{ actived: actived === 2 }"></span>
    </div>
    <div class="deciair-button-wrapper">
      <img src="../../static/img/fabu.png" alt="" />
    </div>
  </div>
</template>

<script>
import Home from '../home/index'
export default {
  data() {
    return {
      actived: 1
    }
  },
  components: { Home },
  onLoad() {},
  methods: {
    handleClick(index) {
      this.actived = index
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
    z-index: 1000;
    img {
      height: 94rpx;
      width: 94rpx;
    }
  }
}
</style>

<template>
  <div class="home-wrapper">
    <scroll-view
      scroll-y
      style="height: 100vh;"
      @scroll="onScroll"
      scroll-with-animation
      :enable-back-to-top="true"
    >
      <div class="header-box" :class="{ fixed: isFixed }">
        <div class="circle">消息</div>
        <div class="circle" @click="selectTopic">话题</div>
      </div>
      <div class="square-list" :class="{ fixed: isFixed }">
        <ul>
          <li v-for="item in squareList" :key="item.id">
            <div class="list-header">
              <div class="user-info">
                <div class="avatar-box">
                  <img :src="item.wxavatar" alt="" class="avatar" />
                </div>
                <span class="name">{{ item.wxName }}</span>
                <span class="flag">{{ item.flag }}</span>
              </div>
              <div class="date">{{ item.date }}</div>
            </div>
            <div class="list-content">
              <p>{{ item.content }}</p>
              <div class="img-list">
                <img
                  :src="src"
                  alt=""
                  v-for="(src, imgIndex) in item.imgList"
                  :key="imgIndex"
                />
              </div>
              <div class="list-footer">
                <p>
                  <span class="iconfont icon-comment"></span>
                  <span @click="handleComment(item)">评论</span>
                </p>
                <p>
                  <span class="iconfont icon-fenxiang"></span>
                  <span @click="handleShare(item)">分享</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </scroll-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFixed: false,
      squareList: [
        {
          id: 1,
          wxavatar: '../../static/logo.png',
          wxName: '天下第一',
          flag: '返乡拼车',
          date: '2020/5/20  12:00',
          content: '从太原→临县私家车，还有2个空位子，有需',
          imgList: [
            '../../static/logo.png',
            '../../static/logo.png',
            '../../static/logo.png'
          ]
        },
        {
          id: 2,
          wxavatar: '../../static/logo.png',
          wxName: '天下第一',
          flag: '返乡拼车',
          date: '2020/5/20  12:00',
          content: '从太原→临县私家车，还有2个空位子，有需',
          imgList: [
            '../../static/logo.png',
            '../../static/logo.png',
            '../../static/logo.png'
          ]
        },
        {
          id: 3,
          wxavatar: '../../static/logo.png',
          wxName: '天下第一',
          flag: '返乡拼车',
          date: '2020/5/20  12:00',
          content: '从太原→临县私家车，还有2个空位子，有需',
          imgList: [
            '../../static/logo.png',
            '../../static/logo.png',
            '../../static/logo.png'
          ]
        }
      ]
    }
  },
  onPageScroll(res) {
    console.log(res, 'res')
  },
  methods: {
    onScroll(e) {
      let top = e.detail.scrollTop
      if (top > 80) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
      // console.log(top, e, 'val')
    },
    handleComment(item) {},
    handleShare(item) {},
    selectTopic (){
      uni.navigateTo({
        url: '/pages/topic/index'
      })
    }
  }
}
</script>

<style lang="scss">
.home-wrapper {
  min-height: 100vh;
  margin-bottom: 100rpx;
  .header-box {
    background-color: #fff;
    display: flex;
    height: 152rpx;
    justify-content: space-around;
    align-items: center;
    .circle {
      background-color: #0074cd;
      border-radius: 50%;
      color: #fff;
      font-size: 28rpx;
      height: 94rpx;
      line-height: 94rpx;
      text-align: center;
      width: 94rpx;
      &:last-child {
        background-color: #fc2b73;
      }
    }
    &.fixed {
      border-bottom: 1px solid #e1e1e1;
      height: 80rpx;
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      .circle {
        background-color: #fff;
        color: #525252;
        height: 80rpx;
        line-height: 80rpx;
      }
    }
  }
  .square-list {
    overflow: hidden;
    &.fixed {
      margin-top: 152rpx;
    }
    li {
      background-color: #fff;
      padding: 40rpx;
      margin-top: 20rpx;
      overflow: hidden;
    }
    .list-header {
      display: flex;
      justify-content: space-between;
    }
    .user-info {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      .avatar-box {
        border-radius: 50%;
        height: 90rpx;
        overflow: hidden;
        width: 90rpx;
      }
      .avatar {
        height: 90rpx;
        width: 90rpx;
      }
      .name {
        color: #5f5f5f;
        font-size: 28rpx;
        margin: 0 30rpx 0 15rpx;
      }
      .flag {
        border: 2rpx solid #ff0000;
        border-radius: 40rpx;
        color: #ff0000;
        font-size: 24rpx;
        height: 40rpx;
        line-height: 40rpx;
        padding: 0 26rpx;
      }
    }
    .list-content {
      margin-left: 90rpx;
      .img-list {
        display: flex;
        justify-content: flex-start;
        image {
          height: 146rpx;
          margin-top: 20rpx;
          width: 146rpx;
          & + image {
            margin-left: 20rpx;
          }
        }
      }
    }
    .list-footer {
      color: #666;
      display: flex;
      font-size: 24rpx;
      justify-content: space-around;
      margin-top: 40rpx;
      .iconfont {
        margin-right: 5rpx;
        vertical-align: text-bottom;
      }
    }
  }
}
</style>

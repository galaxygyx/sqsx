<template>
  <div class="home-wrapper">
    <div class="header-box">
      <div class="circle">消息</div>
      <div class="circle">话题</div>
    </div>
    <div class="square-list">
      <ul>
        <li v-for="item in squareList" :key="item.id">
          <div class="list-header">
            <div class="user-info">
              <img :src="item.wxavatar" alt="" class="avatar" />
              <span class="name">{{ item.wxName }}</span>
              <span class="flag">{{ item.flag }}</span>
            </div>
            <div class="date">{{ item.date }}</div>
          </div>
          <div class="list-content">
            <p>{{ item.content }}</p>
            <div class="img-list">
              <img :src="src" alt="" v-for="(src, index) in imgList" :key="index" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.home-wrapper {
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
  }
  .square-list {
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
        justify-content: space-between;
        img {
          height: 146rpx;
          width: 146rpx;
        }
      }
    }
  }
}
</style>

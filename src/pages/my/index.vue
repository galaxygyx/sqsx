<template>
  <div class="my-wrapper">
    <div class="header-box">
      <div class="user-info">
        <div class="avatar-box">
          <img :src="userInfo.wxavatar" alt="" class="avatar" />
        </div>
        <span class="name">{{ userInfo.wxName }}</span>
      </div>
      <span class="logout">退出</span>
    </div>
    <div class="my-content">
      <div class="content-header">
        <div class="my-declair my-box">
          <span class="iconfont icon-fabu"></span>
          <span>我发布的</span>
        </div>
        <div class="my-comment my-box">
          <span class="iconfont icon-leave_message"></span>
          <span>我留言的</span>
        </div>
      </div>
      <div class="content-list">
        <ul>
          <li>
            <span>意见反馈</span>
            <i class="iconfont icon-you"></i>
          </li>
          <li>
            <span>平台通知</span>
            <span>
              <span class="circle">12</span>
              <i class="iconfont icon-you"></i>
            </span>
          </li>
          <li>
            <span>分享小程序</span>
            <i class="iconfont icon-you"></i>
          </li>
          <li>
            <span>设置</span>
            <i class="iconfont icon-you"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        wxavatar: '../../static/logo.png',
        wxName: '天下第一'
      }
    }
  }
}
</script>

<style lang="scss">
.my-wrapper {
  .header-box {
    align-items: center;
    background-color: #fff;
    display: flex;
    height: 230rpx;
    justify-content: space-between;
    padding: 40rpx 50rpx;
    .user-info {
      align-items: center;
      display: flex;
      justify-content: flex-start;
      .avatar-box {
        border-radius: 50%;
        height: 146rpx;
        overflow: hidden;
        width: 146rpx;
      }
      .avatar {
        height: 146rpx;
        width: 146rpx;
      }
      .name {
        color: #5f5f5f;
        font-size: 36rpx;
        margin-left: 20rpx;
      }
    }
    .logout {
      color: #4a90e2;
      font-size: 28rpx;
    }
  }
  .my-content {
    background-color: #fff;
    margin-top: 20rpx;
    padding: 60rpx 80rpx;
    .content-header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      .my-box {
        border: 2px solid #666;
        border-radius: 8rpx;
        height: 100rpx;
        line-height: 94rpx;
        text-align: center;
        width: 256rpx;
        .iconfont {
          font-size: 48rpx;
          margin-right: 5rpx;
          vertical-align: middle;
        }
      }
    }
    .content-list {
      margin-top: 50rpx;
      li {
        align-items: center;
        display: flex;
        font-size: 28rpx;
        height: 98rpx;
        justify-content: space-between;
        span {
          color: #333;
          display: flex;
          justify-content: center;
          .circle {
            background-color: #ff0000;
            border-radius: 50%;
            color: #fff;
            display: inline-block;
            font-size: 20rpx;
            height: 30rpx;
            text-align: center;
            width: 30rpx;
          }
        }
      }
    }
  }
}
</style>

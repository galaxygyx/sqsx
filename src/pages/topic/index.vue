<template>
  <div class="topic-modal">
    <div class="topic-list">
      <ul>
        <li v-for="item in topicList" :key="item.name" @click="selectTopic(item)">
          <img :src="'../../static/img/topic/' + item.name + '.png'" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topicList: [
        { name: 'all' },
        { name: 'carpooling' },
        { name: 'travel' },
        { name: 'life' },
        { name: 'food' },
        { name: 'relation' },
        { name: 'game' },
        { name: 'school' },
        { name: 'comic' },
        { name: 'movie' },
        { name: 'car' }
      ]
    }
  },
  methods: {
    selectTopic (item) {
      uni.navigateTo({
        url: '/pages/index/index?topic=' + item.name
      })
    }
  }
}
</script>

<style lang="scss">
.topic-modal {
  padding: 40rpx;
  .topic-list {
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      li {
        flex-basis: 33%;
        margin-top: 80rpx;
        text-align: center;
        img {
          height: 168rpx;
          width: 168rpx;
        }
      }
    }
  }
}
</style>

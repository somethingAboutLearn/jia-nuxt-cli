<template>
    <div>
        <h2>pc 首页</h2>
          <h3 href="/pc/write">富文本编辑器</h3>
        <van-swipe :autoplay="3000" v-if="slider.length">
          <van-swipe-item v-for="(image, index) in slider" :key="index">
            <a style="display: block;" :href="image.linkUrl">
              <img style="display: block;" v-lazy="image.picUrl" />
            </a>
          </van-swipe-item>
        </van-swipe>
        <ul>
            <li v-for="(r, ri) in radioList" :key="ri">
              <p>{{r.Ftitle}}</p>
              <img :src="r.picUrl" alt="">
            </li>
        </ul>
        <ul>
            <li v-for="(s, si) in songList" :key="si">
              <p>{{s.songListDesc}}}</p>
              <img :src="s.picUrl" alt="">
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
  // layouts () {
  //     return 'pc'
  // },

  head() {
    return {
      title: "pc 首页"
    };
  },

  components: {},
  asyncData({ params, error }) {
    return axios
      .get(`https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg`)
      .then(res => {
        return { slider: res.data.data.slider, radioList: res.data.data.radioList, songList: res.data.data.songList };
      })
      .catch(e => {
        error({ statusCode: 404, message: "Post not found" });
      });
  },
  data() {
    return {
      list: null
    };
  }
};
</script>

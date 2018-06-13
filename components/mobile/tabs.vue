<template>
    <van-tabs swipeable sticky v-if="types.length">
        <van-tab v-for="(type, tIndex) in types" :key="tIndex" :title="type">
            <div v-for="(article, aIndex) in articles" :key="aIndex">文章数: {{ article }}</div>
            <div>浏览更多</div>
        </van-tab>
    </van-tabs>
</template>

<script>
export default {
  name: "Tabs",
  data() {
    return {
      types: ["分类1", "分类2", "分类3", "分类4", "分类5", "分类6", "分类7"],
      articles: [
        "文章一",
        "文章二",
        "文章三",
        "文章四",
        "文章五",
        "文章六",
        "文章七",
        "文章八",
        "文章九",
        "文章十",
        "文章十一",
        "文章十二",
        "文章十四",
        "文章十五",
        "文章十六",
        "文章十七",
        "文章十八",
        "文章十九",
        "文章二十",
        "文章二十一"
      ]
    };
  }
};
</script>

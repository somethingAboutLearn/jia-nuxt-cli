<template>
     <!-- Swipe -->
    <van-swipe :autoplay="3000" v-if="images.length">
        <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
        </van-swipe-item>
    </van-swipe>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      images: [
        "http://images.gaga.me/photos/ymd/2770fabbeee9bca2b87ba6c428f5c574.jpg?imageView2/2/w/360/h/500",
        "http://images.gaga.me/photos/ymd/9ad89c380edb996ac40424039eaaf75b.jpeg?imageView2/2/w/360/h/500"
      ]
    };
  }
};
</script>

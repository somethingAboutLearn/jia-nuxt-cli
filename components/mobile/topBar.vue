<template>
    <div>
        <!-- NavBar -->
        <van-nav-bar :title="title" >
            <van-icon name="more-o" slot="left" @click="showNav" />
            <van-icon name="search" slot="right" />
        </van-nav-bar>
    </div>
</template>

<script>
export default {
  name: "TopBar",
  props: ["title"],
  data() {
    return {
      showNavFlag: false,
      hiddenNavFlag: false
    };
  },
  methods: {
    showNav() {
      this.showNavFlag = true;
      this.hiddenNavFlag = false;
      this.$log("showNavFlag ==>", this.showNavFlag);
      this.$log("hiddenNavFlag ==>", this.hiddenNavFlag);
      this.$emit("showNav", {
        showNavFlag: this.showNavFlag,
        hiddenNavFlag: this.hiddenNavFlag
      });
    }
  }
};
</script>

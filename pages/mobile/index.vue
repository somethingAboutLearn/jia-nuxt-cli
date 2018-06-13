<template>
    <div>
        <Nav :showNavFlag="showNavFlag" :hiddenNavFlag="hiddenNavFlag"></Nav>
        <div>
            <TopBar :title="title" @showNav="showNav"></TopBar>
            <Banner></Banner>
            <Tabs></Tabs>
            <Footer></Footer>
            <div @click="hiddenNav" :class="showNavFlag ? 'nav-shadow' : ''"></div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/mobile/nav";
import TopBar from "@/components/mobile/topBar";
import Banner from "@/components/mobile/banner";
import Tabs from "@/components/mobile/tabs";
import Footer from "@/components/mobile/footer";

export default {
  layout() {
    return "mobile";
  },
  head() {
    return {
      title: "首页",
      meta: [
        { hid: "description", name: "description", content: "My description" }
      ]
    };
  },
  components: {
    Nav,
    TopBar,
    Banner,
    Tabs,
    Footer
  },
  data() {
    return {
      title: "首页",
      showNavFlag: false,
      hiddenNavFlag: false
    };
  },
  methods: {
    showNav(data) {
      this.$log("data ==>", data);
      this.showNavFlag = data.showNavFlag;
      this.hiddenNavFlag = data.hiddenNavFlag;
    },
    hiddenNav() {
      this.hiddenNavFlag = true;
      this.showNavFlag = false;
    }
  }
};
</script>

<style lang="scss">

</style>
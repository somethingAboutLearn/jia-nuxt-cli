<template>
    <div>
        <Nav :showNavFlag="showNavFlag" :hiddenNavFlag="hiddenNavFlag"></Nav>
        <div>
            <TopBar :title="title" @showNav="showNav"></TopBar>
            <div @click="hiddenNav" :class="showNavFlag ? 'nav-shadow' : ''"></div>
        </div>
    </div>
</template>

<script>
import Nav from "@/components/mobile/nav";
import TopBar from "@/components/mobile/topBar";

export default {
  layout() {
    return "mobile";
  },
  name: "Author",
  head() {
    return {
      title: "作者专栏",
      meta: [
        { hid: "description", name: "description", content: "My description" }
      ]
    };
  },
  components: {
    Nav,
    TopBar
  },
  data() {
    return {
      title: "作者专栏",
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

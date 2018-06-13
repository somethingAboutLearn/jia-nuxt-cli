<template>
  <div class="nav" :class="{'show-nav': showNavFlag, 'hidden-nav': hiddenNavFlag}" >
    <nuxt-link :to="nav.path" v-for="(nav, nindex) in navs" :key="nindex">{{nav.title}}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "Nav",
  props: ["showNavFlag", "hiddenNavFlag"],
  data() {
    return {
      navs: [
        {
          title: "首页",
          path: "/mobile"
        },
        {
          title: "登录",
          path: "/mobile/login"
        },
        {
          title: "作者专栏",
          path: "/mobile/author"
        },
        {
          title: "行业报告",
          path: "/mobile/report"
        },
        {
          title: "数据库",
          path: "/mobile/database"
        },
        {
          title: "合作伙伴",
          path: "/mobile/cooperation"
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.nav {
  position: fixed;
  top: 0;
  left: -30%;
  bottom: 0;
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  font-size: rem(40);
}

.nav > a {
  display: block;
  padding: 0 0 0 20px;
  margin: 20px 0;
  color: #fff;
}

@keyframes show-nav {
  0% {
    left: -30%;
  }
  100% {
    left: 0%;
  }
}

.show-nav {
  animation: show-nav 0.8s;
  animation-fill-mode: forwards;
}

@keyframes hidden-nav {
  0% {
    left: 0%;
  }
  100% {
    left: -30%;
  }
}

.hidden-nav {
  animation: hidden-nav 0.8s;
  animation-fill-mode: forwards;
}
</style>

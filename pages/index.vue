<template>
  <div>
  </div>
</template>

<script>
import pcOrMobile from "@/utils/utils";

if (process.browser) {
  let type = pcOrMobile(window.navigator.userAgent);

  if (type === "mobile") {
    window.location.href = "/mobile";
  }

  if (type === "pc") {
    window.location.href = "/pc";
  }
}

export default {
  // asyncData({ req, redirect }) {
  //   let type = pcOrMobile(req.headers["user-agent"]);
  //   console.log(req.headers)
  //   if (type === "mobile") {
  //     redirect("/mobile");
  //   }
  //   if (type === "pc") {
  //     redirect("/pc");
  //   }
  // }
};
</script>

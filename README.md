---
title:  NUXT
url: https://zh.nuxtjs.org
tags: 前端,框架
grammar_cjkRuby: true
time: 2018-5-17
author: jialei
---


---
# 项目搭建


---
## 安装

- 依赖 vue-cli 脚手架
	
	``` dos?linenums
	npm install -g vue-cli
	```

- 安装 starter 模板

	``` dos?linenums
	vue init nuxt-community/starter-template <project-name>
	```

- 安装依赖包

	``` dos?linenums
	cd <project-name>
	npm install
	```
	
- **注意， node 版本需 >= v8.3.0**
- **我用的 node 版本 v9.0.0 ， npm 版本 6.0.1**


---
## 运行

- 开发模式
	
	``` dos?linenums
	npm run dev
	```
	
- 服务端渲染应用部署
	
	服务端渲染的应用不能直接使用 nuxt 命令，需要先进行编译构建，然后再启动 Nuxt 服务
	
	``` dos?linenums
	npm run build (nuxt build)
	npm run start (nuxt start)
	```
	推荐的 package.json 配置
	
	``` json
	"scripts": {
		"dev": "nuxt",
		"build": "nuxt build",
		"start": "nuxt start",
		"generate": "nuxt generate",
		"lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
		"precommit": "npm run lint"
	}
	```
	  
- 静态应用部署，利用下面命令生成一个静态目录 dist ，所有的静态化后的资源文件均在其中

	``` dos?linenums
	npm run generate
	```


---
## 插件 [element-ui](http://element-cn.eleme.io/#/zh-CN/component/quickstart)

- npm 安装 element-ui

	``` dos?linenums
	npm i element-ui -S
	```

- 在 plugins 文件夹下新建 element-ui.js

	``` javascript
	import Vue from 'vue'
	import Element from 'element-ui'

	export default () => {
		Vue.use(Element)
	}
	```

- 修改 nuxt.config.js 文件，添加 css 和 plugins 键值对

	``` javascript
	module.exports = {
	 
		css: [
		'element-ui/lib/theme-chalk/index.css'
		],

		plugins: [
		'@/plugins/element-ui'
		]
	}
	```

- 测试，在 pages 文件夹下新建 index.vue ，写入以下代码

	``` javascript
	<template>
		<div>
			<el-row>
				<el-button>默认按钮</el-button>
				<el-button type="primary">主要按钮</el-button>
				<el-button type="success">成功按钮</el-button>
				<el-button type="info">信息按钮</el-button>
				<el-button type="warning">警告按钮</el-button>
				<el-button type="danger">危险按钮</el-button>
			</el-row>
		</div>
	</template>
	```
	

---
## 插件 [vant](https://www.youzanyun.com/zanui)
***

- npm 安装 vant

	``` dos?linenums
	npm i vant -S
	```

- 在 plugins 文件夹下新建 vant.js

	``` javascript
	import Vue from 'vue'
	import Vant from 'vant'

	export default () => {
		Vue.use(Vant)
	}
	```

- 修改 nuxt.config.js 文件，添加 css 和 plugins 键值对

	``` javascript
	module.exports = {
	 
		css: [
		'vant/lib/vant-css/index.css'
		],

		plugins: [
		'@/plugins/vant'
		]
	}
	```

- 测试，在 pages 文件夹下新建 index.vue ，写入以下代码

	```javascript
	<template>
		<section class="container">
			hello
			<van-circle
				v-model="currentRate"
				:rate="30"
				:speed="100"
				:text="text"
			/>
		</section>
	</template>

	<script>
	export default {
		data() {
			return {
			currentRate: 0
			};
		},
		computed: {
			text() {
			return this.currentRate.toFixed(0) + '%'
			}
		}
	}
	</script>
	```
	

---
## 引入 [axios](https://www.npmjs.com/package/axios) 包

- npm 安装 axios

	``` dos?linenums
	npm install --save axios
	```

- 在页面中使用，使用之前需要通过 import 引入 axios 包

	``` html
	<template>
		<div>
			<h1>{{msg}}</h1>
		</div>
	</template>

	<script>
	import axios from 'axios'

	export default {
		async asyncData() {
			let data = await axios.get('http://localhost:3001/form')
			console.log(data.data)
			let msg = data.data.msg
			return {
				msg
			}
		}
	}
	</script>
	```


---
## 插件 [vue-logger](https://www.npmjs.com/package/vue-logger)

前端日志

- npm 安装 vue-logger

	``` dos?linenums
	npm install vue-logger --save
	```

- 在 plugins 文件夹下新建 vue-logger.js ，写入以下代码

	``` javascript
	import Vue from 'vue'
	import VueLogger from 'vue-logger'

	export default () => {
		Vue.use(VueLogger, {
			prefix: new Date(),
			dev: true,
			shortname: true,
			levels: ['log', 'warn', 'debug', 'error', 'dir', 'info']
		})
	}
	```
	
- vue-logger options 描述

	 Name | Type | Default | Desc
	-- | - | - | -
	 prefix | string | none | 是否输出前缀标识    一般为日期时间
	 dev | boolean | true | 是否为开发模式      日志开关，可选择在生产环境中关闭
	 shortname | boolean | true | 是否使用 levels 中的别名    使用：Vue.$error('msg') 不使用：Vue.$console.error('msg')
	 levels | array | ['log', 'warn', 'debug', 'error', 'dir'] | 日志等级 | 可额外添加
	
- 修改 nuxt.config.js 文件，在 plugins 添加一项 `'@/plugins/vue-logger'`

	``` javascript
	module.exports = {
	 
	  plugins: [
		'@/plugins/element-ui',
		'@/plugins/vue-logger'
	  ]
	}
	```

- 测试，在 pages 文件夹下新建的 index.vue 添加 `data()` 方法

	```javascript
	<script>
	export default {
		data () {
			this.$info('==info==', 'vue-logger')  // this => Vue
			//  this.$console.log('==info==', 'set shortname = false')
		}
	}
	</script>
	```


---	
## 引入预处理器 scss

- npm 安装 node-sass

	``` dos?linenums
	npm install node-sass --save
	```

- npm 安装 sass-loader

	``` dos?linenums
	npm install sass-loader --save
	```

- npm 安装 nuxt-sass-resources-loader

	``` dos?linenums
	npm install nuxt-sass-resources-loader --save
	```

- 新建文件 /assets/css/main.scss ,添加全局 scss ,如此，就不必在每个 .vue 文件的 `<style></style>` 中去 import 引入 `@import "../../assets/css/main.scss";`

	``` scss
	// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
	$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值

	@function rem($px) {
		@return ($px / $vw_fontsize ) * 1rem;
	}

	// 根元素大小使用 vw 单位
	$vw_design: 750;

	html {
		font-size: ($vw_fontsize / $vw_design) * 100vw; 
		// 同时，通过Media Queries 限制根元素最大最小值
		@media screen and (max-width: 320px) {
				font-size: 64px;
		}
		@media screen and (min-width: 540px) {
				font-size: 108px;
		}
	}

	// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
	body {
		max-width: 540px;
		min-width: 320px;
	}
	```

- 配置文件 nuxt.config.js ，添加模块

	``` javascript
	modules: [
		['nuxt-sass-resources-loader', '@/assets/css/main.scss']
	],
	```

- 使用

	``` javascript
	<template>
		<section>
			<h2>pc 首页</h2>
			<div class="demo"></div>
			<p class="line"></p>
		</section>
	</template>

	<style lang="scss" >
		// @import "../../assets/css/main.scss";

		.demo {
			width: rem(100);
			height: rem(100);
			background-color: #000;
		}

		.line {
			width: 100%;
			height: rem(1);
			background-color: #000;
		}
	</style>
	```


---
## 识别终端的类型，电脑浏览器 pc ，手机等移动端 mobile

### 法一：通过服务器端处理， http 请求头的 User-Agent

- 新建公共工具文件 utils/utils.js ，写入 `pcOrMobile` 方法

	``` javascript
	/* 判断PC或者mobile */

	export default (u) => {
		let browser = { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
		if (browser.mobile || browser.ios || browser.android || browser.iPhone || browser.iPad) {
			return 'mobile'
		} else {
			return 'pc'
		}
	}
	```

- 新建插件文件 /plugins/devide.js ，给 html 设置 mobile 或 pc 属性

	``` javascript
	import pcOrMobile from '@/utils/utils.js'

	(function(doc, win) {
	let docEl = doc.documentElement
	let resizeEvt = 'orientationchange' in window
		? 'orientationchange'
		: 'resize'
	let recalc = function() {
		if (pcOrMobile(window.navigator.userAgent) === 'pc') {
			docEl.setAttribute('pc', '')
			docEl.removeAttribute('mobile', '')
		} else {
			docEl.setAttribute('mobile', '')
			docEl.removeAttribute('pc', '')
		}
	}
	if (!doc.addEventListener) {
		return
	}
	win.addEventListener(resizeEvt, recalc, false)
	doc.addEventListener('DOMContentLoaded', recalc, false)
	})(document, window)
	```

- 修改配置文件 nuxt.config.js ，增加刚才新增的插件 devide.js

	``` javascript
	module.exports={
		plugins: [
			{src: '~plugins/rem.js', ssr: false}
		]
	}
	```

- 在入口文件 pages/index.vue ，配置匹配终端跳转相对的 url

	``` javascript
	import pcOrMobile from "@/utils/utils";

	export default {
		asyncData({ req, redirect }) {
			let type = pcOrMobile(req.headers["user-agent"]);

			if (type === "mobile") {
				redirect("/mobile");
			}

			if (type === "pc") {
				redirect("/pc");
			}
		}
	};
	```


### 法二：通过客户端处理，通过浏览器的全局对象 window.navigator.userAgent （建议法二，法一在浏览器的开发者工具模式下不准确）

- 新建公共工具文件 utils/utils.js ，写入 `pcOrMobile` 方法

	``` javascript
	export default (u) => {
		if (/android/i.test(u) || /iPad|iPhone|iPod/.test(u)) {
				return 'mobile'
			} else {
				return 'pc'
			}
		}
	}
	```

- 新建插件文件 /plugins/devide.js ，给 html 设置 mobile 或 pc 属性

	同法一

- 修改配置文件 nuxt.config.js ，增加刚才新增的插件 devide.js

	同法一

- 在入口文件 pages/index.vue ，配置匹配终端跳转相对的 url

	``` javascript
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
	```


---
## npm run generate 打包指定公网域名

- 修改 nuxt.config.js 文件，在 build 中加入 `publicPath: '<根目录>'` 键值对



---
## 修改开发环境运行端口号，方便手机在同一无线网下调试

- 在 `package.json` 中加入

	``` json
	...
	"config": {
		"nuxt": {
		"host": "0.0.0.0",
		"port": "7788"
		}
	}
	...
	```

- 查看电脑 IP， `ifconfig` ==> 

- 在手机浏览器输入网址 `http://192.168.x.xx:7788` 调试
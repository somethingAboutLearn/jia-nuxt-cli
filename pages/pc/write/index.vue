<template>
    <div id="write">
      <div class="left">
        <button class="back-home-button">
          <nuxt-link to="/">回首页</nuxt-link>
          <a href="/">回首页</a>
        </button>
        <div class="new-collection">
          <div @click="displayNCName = true">
            <i class="el-icon-plus"> 新建文集</i>
          </div>
          <div class="new-collection-form" :hidden="!displayNCName">
            <input type="text" placeholder="请输入文集名..." v-model="newCollectionName">
            <button class="submit-btn" @click="submit">提交</button>
            <button class="cancel-btn" @click="displayNCName = false">取消</button>
          </div>
        </div>
        <ul class="newClist">
          <li :class=" cIndex === selectedIndex ? 'newClist-selected' : ''" v-for="(collection, cIndex) in user.collectionList" :key="cIndex" @click="selected(cIndex)">
            <span :title="collection">{{collection}}</span>
            <div class="operating" @click="collectionEdi(cIndex)">
              <i class="el-icon-edit-outline"></i>
            </div>
            <div class="operating" @click="collectionDel(cIndex)">
              <i class="el-icon-delete"></i>
            </div>
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="list">
          <div class="new-article" @click="newAName">
            <div>
              <i class="el-icon-plus"> 新建文章</i>
            </div>
          </div>
          <ul class="new-article-list">
            <li :class=" aIndex === selectedAIndex ? 'newAlist-selected' : ''" v-for="(article, aIndex) in user.articleList" :key="aIndex" @click="selectedA(aIndex)">
              <span :title="article">{{article}}</span>
              <div class="operating" @click="articleEdi(aIndex)">
                <i class="el-icon-edit-outline"></i>
              </div>
              <div class="operating" @click="articleDel(aIndex)">
                <i class="el-icon-delete"></i>
              </div>
            </li>
          </ul>
          <div>
            <div class="new-article" @click="newAName"><i class="el-icon-plus"> 在下方新建文章</i></div>
          </div>
        </div>
        <div :hidden="!user.articleList.length">
          <VueQuillEditor @getHtml="writeContent" @getTitle="writeTitle" :title="user.articleList ? user.articleList[selectedAIndex] : ''"></VueQuillEditor>
        </div>
      </div>
    </div>
</template>

<script>
import VueQuillEditor from "@/components/vueQuillEditor";

export default {
  components: {
    VueQuillEditor
  },

  data() {
    return {
      displayNCName: false,
      newCollectionName: "",
      selectedIndex: 0,
      selectedAIndex: 0,
      user: {
        collectionList: [],
        articleList: [],
        article: []
      }
    };
  },

  methods: {
    submit() {
      if (this.newCollectionName === "") {
        this.$message({
          type: "error",
          message: "文集名不能为空"
        });
        return;
      }
      console.log(this.newCollectionName);
      this.user.collectionList.push(this.newCollectionName);
      this.newCollectionName = null;
      this.user.article.push([]);
      this.displayNCName = false;
    },

    selected(index) {
      console.log(index);
      this.selectedIndex = index;
    },

    collectionEdi(index) {
      console.log(index);
      let content = this.user.collectionList[this.selectedIndex];
      this.$prompt("请输入新文集名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: content
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "修改成功，新文集名是: " + value
          });
          this.$set(this.user.collectionList, index, value);
          console.log(this.user.collectionList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    collectionDel(index) {
      console.log(index);
      this.$confirm("此操作将永久删除该文集, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.user.collectionList.splice(index, 1);
          this.selectedIndex = this.user.collectionList.length
            ? this.user.collectionList.length - 1
            : 0;
          this.user.articleList = [];
          this.user.article = [];
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    newAName() {
      if (!this.user.collectionList[this.selectedIndex]) {
        this.$message({
          type: "error",
          message: "请先选择文集"
        });
        return;
      }

      let newArticle = "新文章";
      this.user.articleList.push(newArticle);
      this.user.article[this.selectedIndex].push([]);
    },

    selectedA(index) {
      console.log(index);
      this.selectedAIndex = index;
    },

    articleEdi(index) {
      console.log(index);
      let content = this.user.articleList[index];
      this.$prompt("请输入新文章名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: content
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "修改成功，新文章名是: " + value
          });
          this.$set(this.user.articleList, index, value);
          console.log(this.user.articleList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },

    articleDel(index) {
      console.log(index);
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.user.articleList.splice(index, 1);
          this.selectedAIndex = this.user.articleList.length
            ? this.user.articleList.length - 1
            : 0;
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    writeContent(data) {
      if (!this.user.articleList.length) {
        this.$message({
          type: "error",
          message: "请先新建文章"
        });
        return;
      }
      console.log("--data--", data);
      this.$set(
        this.user.article[this.selectedIndex],
        this.selectedAIndex,
        data
      );
      console.log(this.user);
    },

    writeTitle(data) {
      this.$debug(data);
      this.$set(this.user.articleList, this.selectedAIndex, data);
    }
  }
};
</script>

<style lang="scss">
html,
body,
#__nuxt,
#__layout,
#__layout > div {
  width: 100%;
  height: 100%;
  font-size: 12px;
}

#write {
  display: flex;
  width: 100%;
  height: 100%;
}

.left {
  overflow-y: scroll;
  width: (100%/6);
  background-color: #404040;
}

.back-home-button {
  width: 100%;
  padding: 30px 18px 5px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
}

.back-home-button a {
  display: block;
  font-size: 15px;
  padding: 9px 0;
  color: #ec7259;
  border: 1px solid rgba(236, 114, 89, 0.8);
  border-radius: 20px;
  cursor: pointer;
}

.new-collection {
  width: 100%;
  margin: 20px 0 0 0;
  padding: 0 15px 10px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}

.new-collection > div {
  padding: 0 0 10px;
}

.new-collection-form {
  width: 100%;
}

.new-collection-form input {
  width: 100%;
  height: 35px;
  background-color: #595959;
  border: 1px solid #333;
  padding: 4px 6px;
  margin-bottom: 10px;
  color: #ccc;
  font-size: 14px;
  line-height: 20px;
  border: none;
}

.submit-btn {
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  color: #42c02e;
  border: 1px solid#42c02e;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.cancel-btn {
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  margin: 0 0 0 10px;
  color: #999;
  border: none;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}

.newClist {
  width: 100%;
}

.newClist > li {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  list-style: none;
  font-size: 15px;
  color: #f2f2f2;
  background-color: #404040;
  padding: 0 15px;
  cursor: pointer;
}

.newClist > li.newClist-selected {
  background-color: #666;
  border-left: 3px solid #ec7259;
  padding-left: 12px;
}

.newClist span {
  flex-grow: 1;
  width: 0;
  display: block;
  margin-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.newClist-selected::after {
  content: "";
}

.newClist .operating {
  width: 30px;
  height: 40px;
  text-align: center;
}

.operating:hover {
  color: #ec7259;
}

.new-article {
  width: 100%;
  padding: 20px 25px;
  font-size: 14px;
  cursor: pointer;
  color: #666;
}

.new-article:hover {
  color: #333;
}

.new-article-list {
  width: 100%;
  border-top: 1px solid #d9d9d9;
}

.new-article-list > li {
  display: flex;
  width: 100%;
  height: 60px;
  padding: 0 50px;
  font-size: 20px;
  line-height: 60px;
  border-bottom: 1px solid #d9d9d9;
}

.new-article-list > li > span {
  flex-grow: 1;
  width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.new-article-list .operating {
  width: 30px;
  text-align: center;
}

.new-article-list > li.newAlist-selected {
  border-left: 3px solid #ec7259;
  background-color: #e6e6e6;
  padding-left: 47px;
}

#article-title {
  width: 100%;
  height: 70px;
  line-height: 40px;
  padding: 30px 30px 10px;
  font-size: 20px;
}

.main {
  display: flex;
  flex-grow: 1;
  width: 0;
}

.list {
  width: (100%/3.6);
  overflow-y: scroll;
}
</style>

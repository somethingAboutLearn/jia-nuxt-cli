<template>
    <section style="display: flex; flex-direction: column; width: 100%; height: 100%; overflow-y: scroll;">
      <input type="text" v-model="title" @change="changeTitle" style=" width: 100%; height: 70px; line-height: 40px; padding: 30px 30px 10px; font-size: 20px;">
      <quill-editor style="display: flex; flex-grow: 1; flex-direction: column; width: 100%; height: 0;"
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          @change="onEditorChange($event)">
      </quill-editor>
    </section>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      content: "",
      editorOption: {
        // some quill options
        placeholder: "开始写作..."
      }
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
      this.$emit("getHtml", html);
    },
    changeTitle() {
      let title = this.title;
      this.$debug('title~~', title);
      this.$emit("getTitle", title);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  }
};
</script>

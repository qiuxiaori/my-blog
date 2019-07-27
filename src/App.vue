/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-unused-expressions */
<template>
  <div id="app">
    <header class="header">
      <div class="container"
           id="header-con">
        <div class="page-name">为美好生活献上祝福
        </div>
        <el-dropdown class="user-space"
                     @command="userMenu">
          <span class="user"><b v-if="isLogin">{{userName}}</b>
            <el-avatar :size="45"
                       v-if="isLogin"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            </el-avatar>
            <b v-if="!isLogin">Login</b>
            <el-avatar :size="40"
                       v-if="!isLogin"
                       :src="circleUrl"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-if="!isLogin"
                              command="login">侵入
            </el-dropdown-item>
            <el-dropdown-item v-if="!isLogin"
                              command="register">俺还没有账号
            </el-dropdown-item>
            <el-dropdown-item v-if="isLogin"
                              command="addArticle">俺也写点东西
            </el-dropdown-item>
            <el-dropdown-item v-if="isLogin"
                              command="getMine">看看咱写的
            </el-dropdown-item>
            <el-dropdown-item v-if="isLogin"
                              command="getMyColl">偷偷收藏的
            </el-dropdown-item>
            <el-dropdown-item v-if="isLogin"
                              command="changeInfo">改下资料</el-dropdown-item>
            <el-dropdown-item command="logout"
                              v-if="isLogin"
                              divided>溜掉
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ul class="nav">
        </ul>
      </div>
    </header>

    <!-- <div class="breadcrumb container">
      <el-breadcrumb separator="|"
                     class="bread-main">
        <el-breadcrumb-item class="checked"
                            style="color:#ff6700">瞅瞅大家的</el-breadcrumb-item>
        <el-breadcrumb-item class="">看看咱的</el-breadcrumb-item>
        <el-breadcrumb-item>悄悄收藏的</el-breadcrumb-item>
      </el-breadcrumb>
    </div> -->
    <div class='container'>
      <div class="asaid">
        <el-radio-group v-model="isCollapse"
                        style="margin-bottom: 40px;margin-left:30px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="0"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse">
          <el-menu-item index="0"
                        @click="getArticles()">
            <i class="el-icon-lollipop"></i>
            <span slot="title">全部</span>
          </el-menu-item>
          <el-menu-item index="1"
                        @click="getArticlesBySort('日记')">
            <i class="el-icon-tickets"></i>
            <span slot="title"
                  class="checked">日记</span>
          </el-menu-item>
          <el-menu-item index="2"
                        @click="getArticlesBySort('书摘')">
            <i class="el-icon-reading"></i>
            <span slot="title">书摘</span>
          </el-menu-item>
          <el-menu-item index="3"
                        @click="getArticlesBySort('影评')">
            <i class="el-icon-video-camera"></i>
            <span slot="title">影评</span>
          </el-menu-item>
          <!-- <el-menu-item index="4"
                        @click="sortVisible = true">
            <i class="el-icon-plus"></i>
            <span slot="title">新增</span>
          </el-menu-item> -->
        </el-menu>
      </div>
      <div class="article">
        <el-table :data="tableData"
                  max-height="480"
                  style="width: 100%">
          <el-table-column type="index"
                           label="序号"
                           min-width="5px"
                           align="center"
                           :index="indexMethod">
          </el-table-column>
          <el-table-column label="类别"
                           min-width="20px"
                           align="center"
                           prop="sort">
          </el-table-column>
          <el-table-column label="标题"
                           min-width="100px"
                           prop="title">
          </el-table-column>
          <el-table-column label="作者"
                           align="center"
                           min-width="30px"
                           prop="userName">
          </el-table-column>
          <el-table-column label="日期"
                           min-width="20px"
                           align="center"
                           prop="time">
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           min-width="40px">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="getArticle(scope.$index,tableData)"
                         icon="el-icon-view"></el-button>
              <el-button size="mini"
                         v-if="isMine"
                         type="danger"
                         @click="delArticle(scope.$index,tableData)"
                         icon="el-icon-delete"
                         plain></el-button>
              <el-button size="mini"
                         v-if="!isLike&&!isMine"
                         type="success"
                         @click="likeArticle(scope.$index,tableData)"
                         icon="el-icon-star-off"
                         plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <footer>
      <div class="foot-desc">
        <ul>
          <li>----</li>
          <li>
            ManageUser
          </li>
          <li>---</li>
          <li>
            AboutAuthor
          </li>
          <li>---</li>
        </ul>
      </div>
    </footer>
    <!-- 登录表单 -->
    <el-dialog title=" ψ(｀∇´)ψ´ Login！"
               width="40%"
               :visible.sync="loginVisible">
      <el-form :model="form">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      :label-width="formLabelWidth">
          <el-input v-model="form.userPwd"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="loginVisible = false">cancle</el-button>
        <el-button type="primary"
                   @click="login ">confirm</el-button>
      </div>
    </el-dialog>
    <!-- 注册表单 -->
    <el-dialog title="ฅ(๑ ̀ㅅ ́๑)ฅ Register!"
               width="40%"
               :visible.sync="registerVisible">
      <el-form :model="registerForm">
        <el-form-item label="用户名"
                      :label-width="formLabelWidth">
          <el-input v-model="registerForm.name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      :label-width="formLabelWidth">
          <el-input v-model="registerForm.userPwd"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      :label-width="formLabelWidth">
          <el-input v-model="registerForm.userEmail"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      :label-width="formLabelWidth">
          <el-input v-model="registerForm.userPhone"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="registerVisible = false">cancle</el-button>
        <el-button type="primary"
                   @click="register">confirm</el-button>
      </div>
    </el-dialog>
    <!-- 添加分类表单 -->
    <el-dialog title=" add sort"
               width="60%"
               :visible.sync="sortVisible">
      <el-form :model="sortForm">
        <el-form-item label="Sort Name"
                      :label-width="formLabelWidth">
          <el-input v-model="sortForm.sortName"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="sortVisible = false">cancle</el-button>
        <el-button type="primary"
                   @click="addSort()">confirm</el-button>
      </div>
    </el-dialog>
    <!-- 文章详情对话框 -->
    <el-dialog class="article-dialog"
               :visible.sync="artVisible"
               top="40px"
               width="68%">
      <div class="art-title">{{curTitle}}</div>
      <div class="art-container">
        <span v-html="curBody"></span>
      </div>
      <div slot="footer"
           v-if="isMine"
           class="dialog-footer">
        <el-button @click="artVisible = false">cancle</el-button>
        <el-button type="primary"
                   @click="delArticle">commit</el-button>
      </div>
    </el-dialog>
    <!-- 添加文章对话框 -->
    <el-dialog class="addArtDialog"
               :visible.sync="addArtVisible"
               top="20px"
               width="70%">
      <el-form :model="addArtForm">
        <el-form-item label="标题"
                      class='addArtTitle'
                      :label-width="formLabelWidth">
          <el-input v-model="addArtForm.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别"
                      :label-width="formLabelWidth">
          <el-select v-model="addArtForm.sort"
                     placeholder="请选择要添加的分类">
            <el-option label="日记"
                       value="日记"></el-option>
            <el-option label="书摘"
                       value="书摘"></el-option>
            <el-option label="影评"
                       value="影评"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="editor_wrap">
        <vue-wangeditor id="editor1"
                        class="wangeditor"
                        :options="options1"
                        v-model="content1"
                        @get-text="getText"></vue-wangeditor>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addArtVisible = false">cancle</el-button>
        <el-button type="primary"
                   @click="addArticle">commit</el-button>
      </div>
    </el-dialog>
    <!-- 修改资料对话框 -->
    <el-dialog title="Change Info:"
               :visible.sync="infoVisible"
               top="120px"
               width="30%">
      <el-form :model="infoForm">
        <el-form-item label="昵称"
                      class="infoInput"
                      :label-width="formLabelWidth">
          <el-input v-model="infoForm.userName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      class="infoInput"
                      :label-width="formLabelWidth">
          <el-input v-model="infoForm.userPwd"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="infoVisible = false">cancle</el-button>
        <el-button type="primary"
                   @click="changeInfo">commit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      url: 'http://127.0.0.1:7002/',
      isLogin: false,
      isCollapse: true,
      tableData: [],
      articles: [],
      filterInfo: 0,
      loginVisible: false,
      registerVisible: false,
      sortVisible: false,
      artVisible: false,
      addArtVisible: false,
      infoVisible: false,
      userName: '',
      curSort: '',
      curBody: '',
      curTitle: '',
      isMine: false,
      isLike: false,
      form: {
        name: '',
        userPwd: ''
      },
      registerForm: {
        name: '',
        userPwd: '',
        userEmail: '',
        userPhone: ''
      },
      sortForm: {
        sortName: ''
      },
      addArtForm: {

      },
      infoForm: {
        userName: '',
        userPwd: ''
      },
      formLabelWidth: '100px',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      initContent: '<p>要初始化的内容</p>',
      content1: '', // 包含html标签
      text1: '', // 不含html标签，纯文本
      options1: {
        width: '800px',
        height: '400px'
      },
      menus: [
        'head', // 标题
        'bold', // 粗体
        'italic', // 斜体
        'underline', // 下划线
        'redo', // 重复
        /* ---- 新增 ---- */
        'clearStyle', // 清除文字的样式
        'clearFormat', // 清除文字的格式
        'clearAll', // 一键清空编辑器
        'insertCode', // 插入带类名的代码
        // <pre class="className"><code class="className">hellow world</code></pre>
        'fullscreen' // 全屏
      ],
      pasteFilterStyle: true // 打开/关闭粘贴样式的过滤

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    login () {
      this.axios.post(this.url + 'user/login', {
        userName: this.form.name,
        userPwd: this.form.userPwd
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        this.$message(res.msg)
        if (res.code === 0) {
          this.loginVisible = false
          this.isLogin = true
          this.userName = this.form.name
          sessionStorage.setItem('userName', this.userName)
        }
      })
    },
    register () {
      this.axios.post(this.url + 'user/register', {
        userName: this.registerForm.name,
        userPwd: this.registerForm.userPwd,
        userEmail: this.registerForm.userEmail,
        userPhone: this.registerForm.userPhone
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        this.$message(res.msg)
        if (res.code === 0) {
          this.registerVisible = false
        }
      })
    },
    logout () {
      this.axios.post(this.url + 'user/logout')
        .then(response => {
          const res = JSON.parse(JSON.stringify(response.data))
          this.$message(res.msg)
          if (res.code === 0) {
            this.registerVisible = false
            this.isLogin = false
            this.userName = ''
            sessionStorage.clear()
          }
        })
    },
    userMenu (command) {
      if (command === 'logout') {
        this.logout()
      } if (command === 'login') {
        this.loginVisible = true
      } if (command === 'addArticle') {
        this.addArtVisible = true
      } if (command === 'changeInfo') {
        this.infoVisible = true
      } if (command === 'register') {
        this.registerVisible = true
      } if (command === 'getMine') {
        this.getMineArticles()
      }
    },
    addArticle () {
      this.axios.post(this.url + 'article/addArticle', {
        title: this.addArtForm.title,
        body: this.content1,
        sort: this.addArtForm.sort,
        userName: this.userName
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        this.$message(res.msg)
        if (res.code === 0) {
          this.addArtVisible = false
          this.content1 = ''
        }
      })
      this.tableData = this.articles = this.getArticles()
      if (this.curSort) {
        this.tableData = this.getArticlesBySort(this.sort)
      }
    },
    getArticle (index, tableData) {
      this.curBody = tableData[index].body
      this.curTitle = tableData[index].title
      this.artVisible = true
    },
    getArticles () {
      this.axios.get(this.url + 'article/getArticles')
        .then(response => {
          this.articles = this.tableData = JSON.parse(JSON.stringify(response.data.data))
        })
    },
    getMineArticles () {
      this.isMine = true
      this.isLike = false
      if (this.curSort) {
        this.tableData = []
        this.articles.map(e => {
          if (e.sort === this.curSort && e.userName === this.userName) {
            this.tableData.push(e)
          }
        })
      }
    },
    getArticlesBySort (sort) {
      this.curSort = sort
      this.tableData = []
      this.articles.map(e => {
        if (e.sort === this.curSort) {
          this.tableData.push(e)
        }
      })
    },
    delArticle (index, tableData) {
      this.axios.post(this.url + 'article/delArticle', {
        _id: tableData[index]._id
      }).then(response => {
        alert()
        const res = JSON.parse(JSON.stringify(response.data))
        console.log(res)
      })
    },
    addSort () {
      if (!sessionStorage.getItem('userName')) {
        this.$message('not login')
        this.sortVisible = false
        return
      }
      this.axios.post(this.url + 'sort/addSort', {
        sortName: this.sortForm.sortName
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        this.$message(res.msg)
        if (res.code === 0) {
          this.sortVisible = false
        }
      })
    },
    changeInfo () {

    },
    indexMethod (index) {
      return index + 1
    }
  },
  watch: {
    sort: function () {
      console.log(this.tableData)
    }
  },
  mounted () {
    this.getArticles()
    this.userName = sessionStorage.getItem('userName')
    // eslint-disable-next-line no-unneeded-ternary
    this.isLogin = this.userName ? true : false
  }
}
</script>

<style>
.bread-main .checked .el-breadcrumb__inner,
.bread-main .checked .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #ff6700;
}
.el-breadcrumb__inner:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #f58439;
  cursor: pointer;
}
body {
  margin: 0px;
  padding: 0px;
  font-family: "STHeiti Light", "微软雅黑", "SimSun", STXihei, "华文细黑", serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#header-con {
  border-bottom: 1px solid #dcdfe6;
  height: 80px;
}

header {
  line-height: 80px;
  font-weight: 200px;
  font-size: 26px;
}
/* .el-radio-group {
  width: 150px;
} */
.page-name {
  line-height: 90px;
  margin-left: 30px;
  display: inline;
}
.user {
  font-size: 18px;
  font-weight: 600;
  color: #ff6700;
  line-height: 20px;
}
.user-space {
  position: relative;
  height: 50px;
  margin-top: 20px;
  margin-right: 40px;
  display: inline-block;
  float: right;
}

.bread-main {
  height: 40px;
  line-height: 40px;
  padding-left: 750px;
  font-size: 16px;
}

.container {
  width: 1100px;
  margin: 0 auto;
  position: relative;
}

.el-radio-group {
  padding-top: 10px;
  width: 200px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.asaid {
  display: inline-block;
  position: absolute;
  top: 5px;
  left: 15px;
}
.article {
  display: inline-block;
  width: 820px;
  position: absolute;
  top: 50px;
  right: 20px;
}
footer {
  position: absolute;
  bottom: 80px;
  margin: 0 auto;
  right: 220px;
}
.foot-desc li {
  float: left;
  margin-right: 10px;
  color: #5f6164;
  list-style: none;
}
.art-title {
  margin: 0 auto;
  width: 90%;
  margin-bottom: 20px;
  height: 20px;
  font-weight: 700px;
  font-size: 24px;
}
.art-container {
  margin: 0 auto;
  width: 87%;
  padding: 10px 15px 0px 15px;
  height: 90%;
  border: #dcdfe6 solid 0.5px;
  border-radius: 3px;
}
.infoInput .el-input {
  width: 250px;
}
.article-dialog .el-dialog__body {
  height: 520px;
}
.addArtDialog .el-dialog__body {
  height: 530px;
}
.addArtTitle .el-input {
  width: 500px;
}
.wangeditor {
  margin-left: 100px;
}
</style>

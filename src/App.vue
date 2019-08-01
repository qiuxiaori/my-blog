
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

    <div class='container'>
      <el-select v-model="value"
                 @change="chooseArticle"
                 class="select"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :disabled="item.disabled"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class='container'>
      <div class="asaid">
        <el-radio-group v-model="isCollapse"
                        style="margin-bottom: 40px;margin-left:30px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu :default-active=defalultIndex
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 active-text-color="#ff6700"
                 @close="handleClose"
                 :collapse="isCollapse">
          <el-menu-item index="0"
                        @click="getArticlesAllSort()">
            <i class="el-icon-lollipop"></i>
            <span slot="title">全部</span>
          </el-menu-item>
          <el-menu-item index="1"
                        @click="getArticlesBySort('记事')">
            <i class="el-icon-edit"></i>
            <span slot="title">记事</span>
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
          <el-menu-item index="4"
                        @click="getArticlesBySort('日记')">
            <i class="el-icon-tickets"></i>
            <span slot="title"
                  class="checked">日记</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="article">
        <el-table :data="tableData"
                  max-height="480"
                  style="
                  width:
                  100%">
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
                    type="password"
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
               top="20px"
               width="85%">
      <div class="art-title">{{curTitle}}</div>
      <div class="art-container">
        <mavon-editor v-model="curBody"
                      :subfield="isEdit"
                      :defaultOpen="'preview'"
                      :toolbarsFlag="isEdit"
                      :editable="isEdit"
                      :scrollStyle="true"
                      min-height="600px"
                      :ishljs="true"></mavon-editor>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isEdit = !isEdit" :disabled="!isMine">edit</el-button>
        <el-button type="primary"
                   @click="updateArticle()"
                   :disabled="!isMine">commit</el-button>
      </div>
    </el-dialog>
    <!-- 添加文章对话框 -->
    <el-dialog class="addArtDialog"
               :visible.sync="addArtVisible"
               top="20px"
               width="82%">
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
            <el-option label="记事"
                       value="记事"></el-option>
            <el-option label="书摘"
                       value="书摘"></el-option>
            <el-option label="影评"
                       value="影评"></el-option>
            <el-option label="日记"
                       value="日记"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="editor">
        <mavon-editor v-model="content1" />
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
          :placeholder="userName"
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
                   @click="updateInfo">commit</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import 'mavon-editor/dist/css/index.css'
export default {
  name: 'app',
  data () {
    return {
      url: 'http://127.0.0.1:7002/',
      isEdit: false,
      mavonText: '',
      isLogin: false,
      isCollapse: true,
      defalultIndex: '0',
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
      curIndex: '-1',
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
      content1: '', // 包含html标签
      options1: {
        width: '800px',
        height: '400px'
      },
      options: [
        {
          value: 'all',
          label: '看看大家的'
        },
        {
          value: 'mine',
          label: '咱自个儿的'
        },
        {
          value: 'collection',
          label: '偷偷收藏的',
          disabled: true
        }
      ],
      toolBars: {
        subfield: 'false',
        defaultOpen: 'preview',
        toolbarsFlag: 'false',
        editable: 'false',
        scrollStyle: 'true',
        ishljs: 'true'
      },
      value: 'all'

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
          this.form.name = ''
          this.form.userPwd = ''
        }
      })
      this.getArticles()
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
            this.userName = false
            console.log(sessionStorage.getItem('userName'))
            sessionStorage.setItem('userName', '')
          }
        })
      this.getArticles()
    },
    userMenu (command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'login') {
        this.loginVisible = true
      } else if (command === 'addArticle') {
        this.addArtVisible = true
      } else if (command === 'changeInfo') {
        this.infoVisible = true
      } else if (command === 'register') {
        this.registerVisible = true
      }
    },
    chooseArticle (value) {
      if (value === 'all') {
        this.getArticlesAllPeople()
      } else if (value === 'mine') {
        this.isMine = true
        this.isLike = false
        this.getMyArticles()
      } else if (value === 'collection') {
        this.getLoveArticles()
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
          this.getArticles()
          this.addArtForm.title = ''
          this.content1 = ''
          this.addArtForm.sort = ''
          if (this.curSort) {
            this.tableData = this.getArticlesBySort(this.sort)
          }
        }
      })
    },
    getArticle (index, tableData) {
      this.curTitle = tableData[index].title
      this.curIndex = index
      this.axios.get(this.url + 'article/getArticle', {
        params: {
          title: this.curTitle
        }
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        if (res.code === 0) {
          this.curBody = res.data.body
        }
      })
      this.artVisible = true
      this.isEdit = false
    },
    getArticles () {
      this.isMine = false
      this.isLike = false
      this.value = 'all'
      this.defalultIndex = '0'
      this.axios.get(this.url + 'article/getArticles')
        .then(response => {
          this.articles = this.tableData = JSON.parse(JSON.stringify(response.data.data))
        })
    },
    getArticlesAllPeople () {
      this.isMine = false
      this.isLike = false
      this.tableData = []
      if (this.curSort) {
        this.articles.map(e => {
          if (e.sort === this.curSort) {
            this.tableData.push(e)
          }
        })
      } else {
        this.tableData = this.articles
      }
    },
    getMyArticles () {
      this.tableData = []
      if (this.curSort) {
        this.articles.map(e => {
          if (e.sort === this.curSort && e.userName === this.userName) {
            this.tableData.push(e)
          }
        })
      } else {
        this.articles.map(e => {
          if (e.userName === this.userName) {
            this.tableData.push(e)
          }
        })
      }
    },
    getLoveArticles () {
      this.isMine = false
      this.isLike = true
      this.tableData = []
      if (this.curSort) {
        this.articles.map(e => {
          if (e.sort === this.curSort && e.nice) {
            this.tableData.push(e)
          }
        })
      }
      this.articles.map(e => {
        if (e.true) {
          this.tableData.push(e)
        }
      })
    },
    getArticlesBySort (sort) {
      this.curSort = sort
      this.tableData = []
      if (this.value === 'all') {
        this.articles.map(e => {
          if (e.sort === this.curSort) {
            this.tableData.push(e)
          }
        })
      } else if (this.value === 'mine') {
        this.articles.map(e => {
          if (e.sort === this.curSort && e.userName === this.userName) {
            this.tableData.push(e)
          }
        })
      }
    },
    getArticlesAllSort () {
      this.curSort = false
      this.tableData = []
      if (this.value === 'all') {
        this.tableData = this.articles
      } else if (this.value === 'mine') {
        this.articles.map(e => {
          if (e.userName === this.userName) {
            this.tableData.push(e)
          }
        })
      }
    },
    delArticle (index, tableData) {
      this.axios.post(this.url + 'article/delArticle', {
        _id: tableData[index]._id
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        this.$message(res.msg)
        if (res.code === 0) {
          this.tableData.splice(index, 1)
        }
      })
    },
    updateArticle () {
      this.axios.post(this.url + 'article/updateArticle', {
        body: this.curBody,
        title: this.curTitle
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        if (res.code === 0) {
          this.artVisible = false
          this.$message(res.msg)
          this.isEdit = false
          this.curBody = this.curBody
          return
        }
        this.$message('fail')
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
    updateInfo () {
      const newName = this.infoForm.userName
      const userPwd = this.infoForm.userPwd
      if (!newName && !userPwd) return
      this.axios.post(this.url + 'user/updateUser', {
        newName,
        userName: this.userName,
        userPwd
      }).then(response => {
        const res = JSON.parse(JSON.stringify(response.data))
        console.log(res)
        if (res.code === 0) {
          this.infoVisible = false
        }
        this.infoForm.userName = ''
        this.infoForm.userPwd = ''
        this.$message(res.msg)
      })
    },
    indexMethod (index) {
      return index + 1
    }
  },
  watch: {
  },
  mounted () {
    this.getArticles()
    if (sessionStorage.getItem('userName') !== '') {
      this.userName = sessionStorage.getItem('userName')
      this.isLogin = true
    }
  }
}
</script>

<style>
</style>

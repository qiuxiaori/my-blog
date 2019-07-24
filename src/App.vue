<template>
  <div id="app">
    <header class="header">
      <div class="container"
           id="header-con">
        <div class="page-name">为美好生活献上祝福
        </div>
        <el-dropdown class="user-space">
          <span class="user">Mine
            <el-avatar :size="45"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
            </el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>俺也写点东西</el-dropdown-item>
            <el-dropdown-item>看看咱的文文</el-dropdown-item>
            <el-dropdown-item>改下小资料</el-dropdown-item>
            <el-dropdown-item divided>溜掉！</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ul class="nav">
        </ul>
      </div>
    </header>
    <div class="breadcrumb container">
      <el-breadcrumb separator="|"
                     class="bread-main">
        <el-breadcrumb-item>所有笔记</el-breadcrumb-item>
        <el-breadcrumb-item>热门浏览</el-breadcrumb-item>
        <el-breadcrumb-item>精品文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='container'>
      <div class="asaid">
        <el-radio-group v-model="isCollapse"
                        style="margin-bottom: 40px;margin-left:30px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">日记</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-tickets"></i>
            <span slot="title">书评</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">影评</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-plus"></i>
            <span slot="title">新增</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="article">
        <el-table :data="tableData"
                  style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left"
                       inline
                       class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.shop }}</span>
                </el-form-item>
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="店铺 ID">
                  <span>{{ props.row.shopId }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="店铺地址">
                  <span>{{ props.row.address }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品 ID"
                           prop="id">
          </el-table-column>
          <el-table-column label="商品名称"
                           prop="name">
          </el-table-column>
          <el-table-column label="描述"
                           prop="desc">
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      isCollapse: true,
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
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
  top: -40px;
  left: 10px;
}
.article {
  display: inline-block;
  width: 820px;
  position: absolute;
  top: 20px;
  right: 30px;
}
</style>

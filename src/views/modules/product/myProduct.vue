<template>
  <div class="">
      <!-- 搜索 -->
      <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">产品分类：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            size="medium"
                            placeholder="请输入内容"
                            suffix-icon="el-icon-date"
                            v-model="q.fenlId">
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row>
                    <el-col :span="6">
                        <label class="labelSS">产品分类：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-input
                            size="medium"
                            placeholder="请输入内容"
                            suffix-icon="el-icon-date"
                            v-model="q.fenlId">
                        </el-input>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" icon="el-icon-search" size="medium">查询</el-button>
                <el-button type="primary" icon="el-icon-refresh" size="medium">重置</el-button>
            </el-col>
        </el-row>
      </div>
      <!-- 筛选 -->
      <div style="margin:16px 0">
        <div class="tag-group">
            <span class="tag-group__title">审核状态</span>
            <el-tag
                v-for="item in audit"
                :key="item.dataNumber"
                size="medium"
                @click="auditClick(item.dataNumber)"
                :effect='item.dataNumber == auditValue ? "dark" : "plain"'>
                {{ item.dataContent }} ({{item.count}})
            </el-tag>
        </div>
      </div>
      <!-- 操作 -->
      <div class="divM">
        <el-button type="primary" icon="el-icon-search" size="small">原创产品</el-button>
        <el-button type="primary" icon="el-icon-download" size="small">插件下载</el-button>
        <el-button type="primary" icon="el-icon-search" size="small">删除</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small">批量修改</el-button>
        <el-button type="primary" size="small">上架</el-button>
        <el-button type="primary" size="small">下架</el-button>
        <el-button type="primary" size="small">审核通过</el-button>
        <el-button type="primary" size="small">待审核</el-button>
        <el-button type="text">采集手册</el-button>
      </div>
      <!-- 统计 -->
      <div class="statics divM">
          <div class="left">
              <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;
          </div>
          <div class="right">
              含变体产品数&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
              变体总数&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;&nbsp;
          </div>
      </div>
      <!-- 列表 -->
      <div class="divM"></div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
            q:{
                fenlId:''
            },
            selectedRowKeys:[],
            audit:[
                {dataId: 1, dataType: "AUDIT_STATE", dataNumber: "001", dataContent: "审核通过", dataSort: 0, count: 15},
                {dataId: 2, dataType: "AUDIT_STATE", dataNumber: "002", dataContent: "待审核", dataSort: 1, count: 187},
                {dataId: 47, dataType: "AUDIT_STATE", dataNumber: "003", dataContent: "失效", dataSort: 2, count: 0}
            ],
            putaway: [],
            productType: [],
            upload: [],
            auditValue:''
          }
      },
      methods:{
          auditClick(num){
              this.auditValue = num;
          }
      }
  }
</script>
<style>
    .labelSS{
        display :line-block;
        line-height:36px;
    }
    .divM{
        margin-top: 10px;
    }
    .statics{
        display: flex;
        height: 39px;
        background-color: #e6f7ff;
        border: 1px solid #91d5ff;
        color: rgba(0,0,0,.6);
        line-height: 37px;
        border-radius: 4px;
        padding: 0 10px;
    }
    .statics .left{
        width: 300px;
    }
    .statics .right{
        flex: 1;
        text-align: right;
    }
    .el-tag{
        margin-left: 6px;
    }

</style>

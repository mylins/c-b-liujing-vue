<template>
  <div class="">
    <!-- 列表页 -->
    <div>
    <!-- 操作 -->
    <div class="divM">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="add">添加授权</el-button>
    </div>
    <!-- 统计 -->
    <!-- <div class="statics divM">
        <div class="left">
            <i class="el-icon-info" style="color:#409EFF"></i>&nbsp;&nbsp;已选择&nbsp;<a style="font-weight: 600">{{ selectedRowKeys.length }}</a>&nbsp;项&nbsp;&nbsp;
        </div>
        <div class="right">
        </div>
    </div> -->
    <!-- 列表 -->
    <div class="divM">
        <el-table
            :data="dataList"
            v-loading="dataListLoading"
            style="width: 100%">
            <el-table-column
            prop="shopName"
            label="店铺名称"
            width="">
            </el-table-column>
            <el-table-column
            prop="amazonAccount"
            label="账户"
            width="">
            </el-table-column>
            <el-table-column
            prop="grantCountry"
            label="授权国家"
            width="">
            </el-table-column>
            <el-table-column
            prop="createTime"
            label="授权时间"
            width="">
            </el-table-column>
            <el-table-column
            prop=""
            label="操作"
            width="130">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" @click="up(scope.row.grantId)"></el-button>
                    <el-button type="text" @click="getComList(scope.row.grantId)">国家列表</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :current-page="pageIndex"
        :page-sizes="[20, 30, 50]"
        :page-size="pageSize"
        :total="totalPage"
        layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
    </div>
    </div>
    <!-- 添加修改授权弹框 -->
    <el-dialog
        :title="grantId ? '修改授权':'添加授权'"
        :visible.sync="addUpvi"
        width="500px">
        <div>
            <el-form :model="dataItem" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="店铺别名" prop="shopName">
                    <el-input placeholder="请输入内容"
                        v-model="dataItem.shopName"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="Amazon账号" prop="amazonAccount">
                    <el-input placeholder="请输入内容"
                        v-model="dataItem.amazonAccount"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="开户区域" prop="region">
                    <!-- <span v-if="grantId" class="decVal">{{dataItem.region}}</span> -->
                    <el-select :disabled="grantId ? true : false" v-model="dataItem.region" filterable clearable placeholder="请选择">
                        <el-option
                        v-for="item in regionList"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Merchant ID" prop="merchantId">
                    <el-input placeholder="请输入内容"
                        v-model="dataItem.merchantId"
                        clearable></el-input>
                </el-form-item>
                <el-form-item label="授权令牌" prop="grantToken">
                    <el-input placeholder="请输入内容"
                        v-model="dataItem.grantToken"
                        clearable></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addUpvi = false">取 消</el-button>
            <el-button type="primary" @click="stockClick">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 国家列表弹框 -->
    <el-dialog
        title="国家列表"
        :visible.sync="companyVi"
        width="700px">
        <div>
            <el-table
                :data="companyList"
                style="width: 100%">
                <el-table-column
                    prop="shopName"
                    label="店铺别名"
                    width="">
                </el-table-column>
                <el-table-column
                    prop="country"
                    label="国家"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="amazonSite"
                    label="站点">
                </el-table-column>
            </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="companyVi = false">关 闭</el-button>
            <!-- <el-button type="primary" @click="stockClick">确 定</el-button> -->
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import OpenTab from '../../common/open'
  import { getQuerycategory } from '@/api/product'
  export default {
    components: {
        OpenTab
    },
      data(){
          return{
            grantId:'',
            productD:{},
            groupList:[],
            userList:[],
            dataListLoading:true,
            nowProTypeId:[],
            dataList:[],
            selectedRowKeys:[],
            pageSize:20,
            pageIndex:1,
            totalPage:0,
            addUpvi:false,
            companyVi:false,
            companyList:[],
            regionList:[
                {
                    code:0,
                    value:'北美(North America)'
                },{
                    code:1,
                    value:'欧洲(Europe)'
                },{
                    code:2,
                    value:'日本(Japan)'
                },{
                    code:3,
                    value:'澳大利亚(Australia)'
                }
            ],
            dataItem:{
                shopName:'',
                amazonAccount:'',
                region:null,
                merchantId:'',
                grantToken:''
            },
            rules:{
                shopName: [
                    { required: true, message: '店铺别名不能为空', trigger: 'blur' }
                ],
                amazonAccount: [
                    { required: true, message: 'Amazon账号不能为空', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择开户区域', trigger: 'change' }
                ],
                merchantId: [
                    { required: true, message: 'Merchant ID不能为空', trigger: 'blur' }
                ],
                grantToken: [
                    { required: true, message: '授权令牌不能为空', trigger: 'blur' }
                ],
            }
          }
      },
      activated(){
          this.getDataList();
      },
      methods:{
        // 获取数据列表
        getDataList () {
            // console.log(this.nowProTypeId);
            this.dataListLoading = true
            this.$http({
                url: this.$http.adornUrl('/amazon/amazongrant/list'),
                method: 'get',
                params: this.$http.adornParams({
                    'page': this.pageIndex,
                    'limit': this.pageSize
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataList = data.page.list
                    this.totalPage = data.page.totalCount
                    console.log(this.$store.state.dept)
                } else {
                    this.dataList = []
                    this.totalPage = 0
                }
                this.dataListLoading = false
            })
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.getDataList()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.getDataList()
        },
        // 添加
        add(){
            this.grantId = '';
            this.addUpvi = true;
            this.$refs['ruleForm'].resetFields()
            this.dataItem = {
                shopName:'',
                amazonAccount:'',
                region:null,
                merchantId:'',
                grantToken:''
            }
        },
        // 修改
        up(id){
            this.grantId = id;
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
              url: this.$http.adornUrl(`/amazon/amazongrant/info/${this.grantId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              loading.close();
              if (data && data.code === 0) {
                this.dataItem = data.amazonGrant;
                this.addUpvi = true;
                // console.log(this.imgList)
              }else{
                  this.$message.error(data.msg)
              }
            })
        },
        // 确定按钮
        stockClick(){
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http({
                        url: this.$http.adornUrl(`/amazon/amazongrant/${!this.grantId ? 'save' : 'update'}`),
                        method: 'post',
                        data: this.$http.adornData(this.dataItem)
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.addUpvi = false;
                                    loading.close();
                                    this.getDataList();
                                }
                            })
                        
                        } else {
                            this.$message.error(data.msg)
                            loading.close();
                        }
                    })
                    
                }else{
                    this.$message({
                            message: '是否正确填写带 * 的内容',
                            type: 'warning'
                        });
                }
            })
        },
        // 国家列表
        getComList(id){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/amazon/amazongrant/countryList'),
                method: 'get',
                params: this.$http.adornParams({
                    grantId:id
                })
                // url: this.$http.adornUrl('/amazon/amazongrant/countryList'),
                // method: 'post',
                // data: this.$http.adornData({
                //     grantId:id
                // })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    this.companyVi = true;
                    this.companyList = data.countryList
                    console.log(data);
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 删除
        huifu(productIds){
            
            if(productIds.length == 0){
                this.$message({
                    message: '请选择一条数据',
                    type: 'warning'
                });
                return 
            }
            this.$confirm('确定对选项进行恢复操作?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                this.$http({
                    url: this.$http.adornUrl('/product/product/restore'),
                    method: 'post',
                    data: this.$http.adornData(productIds, false)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.getDataList()
                            this.getMyStatusList();
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
        },
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

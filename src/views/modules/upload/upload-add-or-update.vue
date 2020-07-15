<template>
  <div>
    <page-h ref="back" :productId="dataForm.uploadId"></page-h>
    <div class="subDivForm">
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="visible = false">取消</el-button> -->
        <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
      </span>
    </div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;上传产品</h3>
          <el-form-item label="开始编号" prop="startId">
            <el-input v-model="dataForm.startId" placeholder="请输入"></el-input>
            <div style="color:#E6A23C;font-size:12px">产品编号都是递增的，本次要导出产品起始编号</div>
          </el-form-item>
          <el-form-item label="结束编号" prop="endId">
            <el-input v-model="dataForm.endId" placeholder="请输入"></el-input>
            <div style="color:#E6A23C;font-size:12px">要导出产品的结束编号，结束编号起始编号</div>
          </el-form-item>
          <br>
          <el-form-item label="上传编号" prop="">
            <el-input class="textIN" type="textarea" :rows="2" v-model="dataForm.uploadIds" placeholder="请输入"></el-input>
            <div style="color:#E6A23C;font-size:12px">填写产品ID后（逗号隔开，逗号为英文逗号，不能有空格），将只上传填写的ID列表，不填写则上传其他条件筛选出的产品，标准格式：12,123,456,789</div>
          </el-form-item>
          <br>
          <el-form-item label="授权店铺" prop="grantShopId">
            <el-select v-model="dataForm.grantShopId" placeholder="请选择" @change="grantShopChange">
                <el-option
                v-for="item in shopList"
                :key="item.grantShopId"
                :label="item.shopName"
                :value="item.grantShopId">
                </el-option>
            </el-select>
          </el-form-item>
          
          <br>
          <el-form-item label="更新选项" prop="operateItem">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="dataForm.operateItem" @change="handleCheckedCitiesChange">
              <!-- <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox> -->
              <el-checkbox label="0">基本信息</el-checkbox>
              <el-checkbox label="1">关系</el-checkbox>
              <el-checkbox label="2">图片</el-checkbox>
              <el-checkbox label="3">库存</el-checkbox>
              <el-checkbox label="4">价格</el-checkbox>
            </el-checkbox-group>
            <!-- <div style="color:#F56C6C;margin-top:-6px;font-size:12px">如果只更新产品信息，则不需要选中上面选项</div> -->
          </el-form-item>
          <br>
          
          <el-form-item label="选择分类" prop="amazonCategoryId">
              <div style="display:flex;">
                  <div style="margin-right:10px">
                      <span class="el-input__inner" style="height:36px;line-height:36px" @click="visibleChange">{{dataForm.amazonCategory}}</span>
                  </div>
                  <div style="margin-right:10px">
                      <el-input v-model="dataForm.amazonCategoryNodeId" placeholder="分类节点ID"></el-input>
                  </div>
                  <div>
                      <el-button type="primary" plain @click="sousFl">搜索分类</el-button>
                      <el-button type="primary" plain @click="history">历史选择</el-button>
                  </div>
              </div>
              <span class="decVal">{{dataForm.allCategories}}</span>
          </el-form-item>
          <br>
          <el-form-item label="分类模版" prop="amazonTemplateId">
            <el-select v-model="dataForm.amazonTemplateId" placeholder="请选择" @focus="getTemplate" @change="templateChange">
                <el-option
                v-for="item in templateList"
                :key="item.templateId"
                :label="item.templateDisplayName"
                :value="item.templateId">
                </el-option>
            </el-select>
          </el-form-item>
          <br>
          <div v-if="dataForm.fieldsEntityList.length != 0" class="felDiv">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;分类信息</h3>
            <el-row>
                <el-col :span="8" v-for="item in dataForm.fieldsEntityList" :key="item.fieldId">
                    <el-col :span="10">
                        <label class="el-form-item__label">{{item.fieldDisplayName}}</label>
                    </el-col>
                    <el-col :span="14">
                        <el-select v-model="item.value" filterable placeholder="请选择">
                            <el-option
                                v-for="val in item.templateFieldValueDtos"
                                :key="val.value"
                                :label="val.cnValue"
                                :value="val.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-col>
            </el-row>
            <!-- <el-form-item v-for="item in dataForm.fieldsEntityList" :key="item.fieldId" :label="item.fieldDisplayName" prop="property.domesticFreight">
                <el-select v-model="item.value" filterable placeholder="请选择">
                    <el-option
                        v-for="val in item.templateFieldValueDtos"
                        :key="val.value"
                        :label="val.cnValue"
                        :value="val.value">
                    </el-option>
                </el-select>
            </el-form-item> -->
          </div>
          
        </div>
      </el-form>

      <!-- 分类弹框 -->
      <el-dialog
        title="选择分类"
        :visible.sync="amazonCategoryVisible"
        width="900px">
        <div style="height:400px;overflow:hiddle">
            <div v-if="sousClickV" style="display:flex;margin-bottom:16px">
                <el-input placeholder="请输入内容" v-model="amazonCategoryVisibleObj.amazonCategoryGjz" size="medium" clearable></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
                <el-button type="primary" size="small" @click="selectAmazonCategoryGjz">搜索</el-button>
            </div>
            
            <div v-if="sousClickV">
                <div class="amazonCategoryItem" v-if="amazonCategoryFl.length!=0">
                    <ul>
                        <li v-for="(ama,i) in amazonCategoryFl" :key="i" :class="amazonCategoryVisibleObj.amazonCategoryArr.indexOf(ama.id) == -1 ? '' : 'active'" @click="clickAmazonCategory(ama.id,ama.displayName,ama.nodeId,ama.categoryQ)">{{ama.displayName}}</li>
                    </ul>
                </div>
            </div>
            <el-pagination
            v-if="sousClickV"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
            <div v-if="!sousClickV" style="height:350px;overflow:hiddle;display:flex">
                <div class="amazonCategoryItem" v-for="(item,index) in amazonCategoryFl" :key="index">
                    <ul>
                        <li v-for="(ama,i) in item" :key="i" :class="amazonCategoryVisibleObj.amazonCategoryArr.indexOf(ama.id) == -1 ? '' : 'active'" @click="clickAmazonCategory(ama.id,ama.displayName,ama.nodeId,ama.categoryQ,index,ama.children)">{{ama.displayName}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="amazonCategoryVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectAmazonCategory">确 定</el-button>
        </span>
        </el-dialog>
    <!-- 历史选择弹框 -->
      <el-dialog
        title="历史选择"
        :visible.sync="historyVisible"
        width="500px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="3">
                    <label style="display:inline-block;line-height:36px">选择分类</label>
                </el-col>
                <el-col :span="21">
                    <el-select v-model="historyObj.value" filterable placeholder="请选择">
                        <el-option
                        v-for="item in historyList"
                        :key="item.amazonCategoryId"
                        :label="item.amazonCategory"
                        :value="item.amazonCategoryId">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="historyVisible = false">取 消</el-button>
            <el-button type="primary" @click="select">确 定</el-button>
        </span>
    </el-dialog>


    </div>
  </div>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  import PageH from '../../common/pageH'
  import { getAmazonCategoryId } from '@/api/product'
  export default {
    data () {
      var id = (rule, value, callback) => {
        if (this.dataForm.uploadIds == '' && this.dataForm.startId == '' && dataForm.endId == '') {
          callback(new Error('上传ID和开始结束ID必须要有一个有效值'))
        } else {
          callback()
        }
      }
      let that=this;
      return {
        sousClickV:false,
        shopList:[],
        historyVisible:false,
        amazonCategoryVisible:false,
        amazonCategoryFl:[],
        pageSize:10,
        pageIndex:1,
        totalPage:0,
        amazonCategoryVisibleObj:{
            id:'',
            amazonCategoryArr:[],
            nodeId:'',
            amazonCategory:'',
            amazonCategoryGjz:'',
            isSou:false
        },
        historyList:[],
        historyObj:{value:''},
        isIndeterminate:true,
        checkAll:false,
        amazonCategoryId:[],
        dataForm: {
            startId:null,
            endId:null,
            uploadIds:'',
            uploadId: null,
            grantShop:'',
            grantShopId:null,
            amazonCategoryId:null,
            amazonCategory:'请选择',
            amazonCategoryNodeId:'',
            amazonTemplateId:null,
            amazonTemplate:'',
            operateItem:[],
            fieldsEntityList:[],
            allCategories:''
        },
        templateList:[],
        options:[],
        props:{
            lazy:true,
            lazyLoad: function(node, resolve) {
                console.log(node);
                if(node.value){
                    getAmazonCategoryId({'amazonCategoryId':node.value}).then((data) => {
                        if (data.data && data.data.code == 0) {
                            // const level = node.level;
                            const nodes = [];
                            
                            if(data.data.amazonCategoryEntityChildList.length != 0){
                                data.data.amazonCategoryEntityChildList.forEach(function (item) {
                                    getAmazonCategoryId({'amazonCategoryId':item.id}).then((d) => {
                                        let leaf = d.data.amazonCategoryEntityChildList.length == 0;
                                        console.log(leaf);
                                        nodes.push({
                                            value:item.id,
                                            label:item.displayName,
                                            labelId:item.nodeId,
                                            leaf: leaf
                                        })
                                    })
                                    // nodes.push({
                                    //     value:item.id,
                                    //     label:item.displayName,
                                    //     labelId:item.nodeId,
                                    //     leaf: level >= 3
                                    // })
                                    
                                })
                                setTimeout(() => {
                                    that.$nextTick(() => {
                                        resolve(nodes);
                                    })
                                },1000)
                                
                                console.log(nodes);
                                
                            }else{
                                console.log(node.isLeaf);
                                // node.isLeaf = true;
                            }
                        } else {
                            alert(data.msg);
                        }
                    })
                }else{
                    console.log('222222');
                }
            }
        },
        dataRule: {
            grantShopId: [
                { required: true, message: '授权店铺不能为空', trigger: 'change' }
            ],
            operateItem: [
                { required: true, message: '更新选项不能为空', trigger: 'change' },
            ],
            amazonCategoryId: [
                { required: true, message: '分类不能为空', trigger: 'blur' }
            ],
            amazonTemplateId: [
                { required: true, message: '分类模版不能为空', trigger: 'change' },
            ],
            startId:[
                { validator: id, trigger: 'blur' }
            ]
        }
      }
    },
    components: {
      PageH
    },
    created(){
        this.init(this.$route.params);
        this.getShopList();
    },
    computed: {
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      },
    },
    methods: {
        init (obj) {
            this.dataForm.uploadId = obj.uploadId || 0;
            if(this.dataForm.uploadId){
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                url: this.$http.adornUrl('/upload/upload/productdetails'),
                method: 'get',
                params: this.$http.adornParams({
                    uploadId:this.dataForm.uploadId
                })
                }).then(({data}) => {
                    loading.close();
                if (data && data.code === 0) {
                    this.dataForm = {
                        startId:data.data.uploadEntity.startId,
                        endId:data.data.uploadEntity.endId,
                        uploadIds:data.data.uploadEntity.uploadIds,
                        uploadId: data.data.uploadEntity.uploadId,
                        grantShop:data.data.uploadEntity.grantShop,
                        grantShopId:data.data.uploadEntity.grantShopId,
                        amazonCategoryId:data.data.uploadEntity.amazonCategoryId,
                        amazonCategory:data.data.uploadEntity.amazonCategory,
                        allCategories:data.data.allCategories,
                        amazonCategoryNodeId:data.data.uploadEntity.amazonCategoryNodeId,
                        amazonTemplateId:data.data.uploadEntity.amazonTemplateId,
                        amazonTemplate:data.data.uploadEntity.amazonTemplate,
                        operateItem:data.data.uploadEntity.operateItem.split(','),
                        fieldsEntityList:data.data.middleEntitys,
                    };
                    this.templateList.push({
                        templateId:data.data.uploadEntity.amazonTemplateId,
                        templateDisplayName:data.data.uploadEntity.amazonTemplate
                    })
                }else{
                    this.$message.error(data.msg)
                }
                })
            }else{
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();
                })
            }
        },
        // 表单提交
        dataFormSubmit () {
            this.$refs['dataForm'].validate((valid) => {
            if (valid) {
                // this.dataForm.amazonCategoryId = this.dataForm.amazonCategoryId[this.dataForm.amazonCategoryId.length-1]
                if(this.dataForm.uploadIds != ''){
                    this.dataForm.uploadIds = this.dataForm.uploadIds.split(',');
                }else{
                    this.dataForm.uploadIds = null
                }
                
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                    url: this.$http.adornUrl(`/upload/upload/${!this.dataForm.uploadId ? 'addUpload' : 'againUploadByForm'}`),
                    method: 'post',
                    data: this.$http.adornData(this.dataForm)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.$refs.back.removeTabHandle(this.mainTabsActiveName);
                                loading.close();
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
        // 获取授权店铺
        getShopList(){
            this.$http({
                url: this.$http.adornUrl('/amazon/amazongrantshop/myShopList'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.shopList = data.shopList
                } else {
                    this.$message.error(data.msg)
                }
                this.dataListLoading = false
            })
        },
        // 授权店铺更改
        grantShopChange(){
            this.dataForm.grantShop = this.shopList.find(item => item.grantShopId == this.dataForm.grantShopId).shopName;
            this.options = [];
            this.templateList = [];
            this.dataForm.middleEntitys = [];
            this.dataForm.amazonCategoryId = '';
            this.dataForm.amazonTemplateId = '';

        },
        // 更新选项全选
        handleCheckAllChange(val){
            this.dataForm.operateItem = val ? ['0','1','2','3','4'] : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value){
            console.log(value);
            let checkedCount = value.length;
            this.checkAll = checkedCount === 5;
            this.isIndeterminate = checkedCount > 0 && checkedCount < 5;
        },
        // 分类下拉列表(一级)
        visibleChange(){
            if(this.dataForm.grantShopId){
                var obj = this.shopList.find(item => item.grantShopId == this.dataForm.grantShopId)
                this.$http({
                    url: this.$http.adornUrl('/upload/amazoncategory/amazonOneCategory'),
                    method: 'post',
                    data: this.$http.adornData({
                        // countryCode:'US',
                        countryCode:obj.countryCode,
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        this.amazonCategoryFl = [];
                        this.amazonCategoryFl[0] = data.amazonCategoryEntityList;
                        this.amazonCategoryVisible = true;
                        this.sousClickV = false;
                        this.amazonCategoryVisibleObj = {
                            id:'',
                            amazonCategoryArr:[],
                            nodeId:'',
                            amazonCategory:'',
                            amazonCategoryGjz:'',
                            isSou:false
                        }
                        console.log(this.amazonCategoryFl);
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }else{
                this.$message({
                    message: '请选择授权店铺',
                    type: 'warning'
                });
            }
            
        },
        // 点击分类方法
        clickAmazonCategory(id,name,nodeId,all,i,children){
            this.amazonCategoryVisibleObj.nodeId = nodeId;
            this.amazonCategoryVisibleObj.id = id;
            this.amazonCategoryVisibleObj.amazonCategory = name;
            
            this.amazonCategoryVisibleObj.amazonCategoryAll = all;
            // this.amazonCategoryGjz = this.amazonCategoryVisibleObj.amazonCategoryArr.join('/')
            // this.amazonCategoryVisibleObj.amazonCategoryArr[i] = name
            console.log(this.amazonCategoryVisibleObj)
            if(this.sousClickV){
                this.amazonCategoryVisibleObj.amazonCategoryArr = [id];
                this.amazonCategoryVisibleObj.amazonCategoryGjz = name;
            }else{
                this.amazonCategoryVisibleObj.amazonCategoryArr.splice(i,this.amazonCategoryVisibleObj.amazonCategoryArr.length-i,id);
                this.$http({
                    url: this.$http.adornUrl('/upload/amazoncategory/childCategoryList'),
                    method: 'post',
                    data: this.$http.adornData({
                        amazonCategoryId:id,
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        if(data.amazonCategoryEntityChildList.length != 0){
                            this.amazonCategoryFl.splice(i+1,this.amazonCategoryFl.length-i-1,data.amazonCategoryEntityChildList);
                        }else{
                            this.amazonCategoryFl.splice(i+1,this.amazonCategoryFl.length-i-1);
                        }
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }
            
        },
        //   树型数据处理
        processingData(data){
            let result = []
            if(!Array.isArray(data)) {
                return result
            }
            data.forEach(item => {
                delete item.children;
            });
            let map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            data.forEach(item => {
                let parent = map[item.parentId];
                if(parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    item.children = [];
                    result.push(item);
                }
            });
            return result;
        },
        // 搜索分类打开弹框
        sousFl(){
            if(this.dataForm.grantShopId){
                this.amazonCategoryVisible = true;
                this.sousClickV = true;
                this.amazonCategoryFl=[];
                this.amazonCategoryVisibleObj.amazonCategoryGjz = ''
            }else{
                this.$message({
                    message: '请选择授权店铺',
                    type: 'warning'
                });
            }
            
        },
        // 搜索分类按钮
        selectAmazonCategoryGjz(){
            var obj = this.shopList.find(item => item.grantShopId == this.dataForm.grantShopId)
            this.$http({
                url: this.$http.adornUrl('/upload/amazoncategory/selectAmazonCategory'),
                method: 'get',
                params: this.$http.adornParams({
                    page: this.pageIndex,
                    limit: this.pageSize,
                    countryCode:obj.countryCode,
                    categoryName:this.amazonCategoryVisibleObj.amazonCategoryGjz
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data.amazonCategoryEntityList);
                    this.amazonCategoryFl = data.page.list;
                    this.totalPage = data.page.totalCount;
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 每页数
        sizeChangeHandle (val) {
            this.pageSize = val
            this.pageIndex = 1
            this.selectAmazonCategoryGjz()
        },
        // 当前页
        currentChangeHandle (val) {
            this.pageIndex = val
            this.selectAmazonCategoryGjz()
        },
        // 选择分类确定按钮
        selectAmazonCategory(){
            this.dataForm.amazonCategory = this.amazonCategoryVisibleObj.amazonCategory;
            this.dataForm.amazonCategoryNodeId = this.amazonCategoryVisibleObj.nodeId;
            this.dataForm.allCategories = this.amazonCategoryVisibleObj.amazonCategoryAll;
            this.dataForm.amazonCategoryId = this.amazonCategoryVisibleObj.id;
            this.amazonCategoryVisible = false;
        },
        productCategorChange(val){
            console.log(this.$refs['aaa'].getCheckedNodes()[0]);
            if(val.length != 0){
                var arr = this.$refs['aaa'].getCheckedNodes()[0].pathLabels;
                // var arr1 = arr.map((item) => {
                //     return item.split('(')[0]
                // })
                this.dataForm.amazonCategory = arr.join('/');
                this.amazonCategoryId = val;
                this.dataForm.amazonCategoryId = val[val.length-1];
                this.dataForm.amazonCategoryNodeId = this.$refs['aaa'].getCheckedNodes()[0].data.labelId;
            }else{
                this.dataForm.amazonCategory = '';
                this.amazonCategoryId = val;
                this.dataForm.amazonCategoryId ='';
                this.dataForm.amazonCategoryNodeId = '';
            }
            
        },
        findRegionOption(regionOptions, regionArr) {
            if (_.isEmpty(regionArr) || _.isEmpty(regionOptions)) {
                return null
            }

            let regionId = _.first(regionArr)
            let regionOption = _.find(regionOptions, regionOption => {
                return regionOption.value === regionId
            })
            if (!regionOption) {
                return null
            }
            let tailRegionArr = _.tail(regionArr)
            if (_.isEmpty(tailRegionArr)) {
                return regionOption
            }
            return this.findRegionOption(regionOption.children, tailRegionArr)
        },
        loadRegionChild(regionIdArr) {
            let regionOptions = this.options
            let regionOptionInUI = this.findRegionOption(regionOptions, regionIdArr)
            if (
                !regionOptionInUI ||
                !regionOptionInUI.children ||
                regionOptionInUI.children.length > 0
            ) {
                return null
            }

            let regionKey = _.last(regionIdArr)
            if (!regionKey) {
                return null
            }

            this.$http({
                url: this.$http.adornUrl('/upload/amazoncategory/childCategoryList'),
                method: 'post',
                data: this.$http.adornData({
                    amazonCategoryId:regionKey,
                })
            }).then((data) => {
                var that = this;
                if(data.amazonCategoryEntityChildList.length != 0){
                    regionOptionInUI.children= [];
                    data.amazonCategoryEntityChildList.forEach(function(item){
                        regionOptionInUI.children.push({
                            value:item.id,
                            label:item.displayName,
                            labelId:item.nodeId,
                            children:[]
                        })
                    })
                }
            })

            api
                .getRegionHiera(regionKey)
                .then(res => {
                regionOptionInUI.children = res.data  //后台返回数据
                })
        },
        // 选择模版
        getTemplate(){
            if(this.dataForm.amazonCategoryId){
                this.$http({
                    url: this.$http.adornUrl('/upload/template/list'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        this.templateList = data.templates
                    } else {
                        this.$message.error(data.msg)
                    }
                    this.dataListLoading = false
                })
            }else{
                this.$message({
                    message: '请选择分类',
                    type: 'warning'
                });
            }
        },
        // 模版更改
        templateChange(){
            this.dataForm.amazonTemplate = this.templateList.find(item => item.templateId == this.dataForm.amazonTemplateId).templateDisplayName;
            let code = this.shopList.find(item => item.grantShopId == this.dataForm.grantShopId).countryCode;
            this.$http({
                url: this.$http.adornUrl('/upload/template/getOptionalValues'),
                method: 'get',
                params: this.$http.adornParams({
                    templateId:this.dataForm.amazonTemplateId,
                    countryCode:code
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataForm.fieldsEntityList = data.data
                } else {
                    this.$message.error(data.msg)
                }
                this.dataListLoading = false
            })
        },
        // 历史分类弹框
        history(){
            if(this.dataForm.grantShopId){
                var countryCode = this.shopList.find(item => item.grantShopId == this.dataForm.grantShopId).countryCode;
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                    url: this.$http.adornUrl('/upload/categoryhistory/getMyList'),
                    method: 'get',
                    params: this.$http.adornParams({
                        countryCode:countryCode
                    })
                }).then(({data}) => {
                    loading.close();
                    if (data && data.code === 0) {
                        this.historyList = data.list;
                        this.historyVisible = true;
                        
                    }else{
                        this.$message.error(data.msg)
                    }
                })
            }else{
                this.$message({
                    message: '请选择授权店铺',
                    type: 'warning'
                });
            }
            
        },
        // 历史分类选择
        select(val){
            this.historyVisible = false;
            this.dataForm.amazonCategoryNodeId = this.historyObj.value;
            this.dataForm.amazonCategory = this.historyList.find(item => item.amazonCategoryId == this.historyObj.value).amazonAllCategory;
            this.historyObj.value = ''
        },
        // 搜索分类

    }
  }
</script>
<style>
    
  .imgUl{
      margin: 0;
      padding: 0;
      display: flex;
  }
  .imgUl .imgLi{
      list-style: none;
      width: 152px;
      margin: 3px;
      position: relative;
  }
  .imgUl .imgLi .selec{
      position: absolute;
      left: 6px;
      top: 6px;
  }
  .imgUl .imgLi .selec .el-checkbox__label{
      color: transparent;
  }
  .biantiDiv{
      display: flex;
  }
  .biantiDiv>div{
      width: 60px;
      height: 60px;
      padding: 5px;
      position: relative;
  }
  .biantiDiv>div>.close{
      position: absolute;
      top: -10px;
      right: 0;
      z-index: 1;
  }
  .amazonCategoryItem{
      flex: 1;
      box-shadow: 0 0 10px #eee;
      overflow-y: auto;
      margin: 0 2px;
      padding: 6px;
  }
  .amazonCategoryItem::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 4px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .amazonCategoryItem::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #8d8c8c;
  }
  .amazonCategoryItem::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    /* box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2); */
    border-radius: 10px;
    background   : #fff;
  }
  .amazonCategoryItem ul{
      margin: 0;
      padding: 0;
  }
  .amazonCategoryItem ul li{
      color: #555;
      padding: 5px;
      cursor: pointer;
      border-radius: 2px;
      border-bottom: 1px solid #f0f0f0;
      list-style: none;
  }
  .amazonCategoryItem ul li.active{
      background: #ecf5ff;
      color: #409EFF;
  }
</style>

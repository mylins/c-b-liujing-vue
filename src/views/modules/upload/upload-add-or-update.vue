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
          <el-form-item label="开始编号" prop="">
            <el-input v-model="dataForm.info.producerName" placeholder="请输入"></el-input>
            <div style="color:#F56C6C;font-size:12px">产品编号都是递增的，本次要导出产品起始编号</div>
          </el-form-item>
          <el-form-item label="结束编号" prop="">
            <el-input v-model="dataForm.info.producerName" placeholder="请输入"></el-input>
            <div style="color:#F56C6C;font-size:12px">要导出产品的结束编号，结束编号起始编号</div>
          </el-form-item>
          <br>
          <el-form-item label="上传编号" prop="productTitle">
            <el-input class="textIN" type="textarea" :rows="2" v-model="dataForm.info.sellerLink" placeholder="请输入"></el-input>
            <div style="color:#F56C6C;font-size:12px">填写产品ID后（逗号隔开，逗号为英文逗号，不能有空格），将只上传填写的ID列表，不填写则上传其他条件筛选出的产品，标准格式：12,123,456,789</div>
          </el-form-item>
          <br>
          <el-form-item label="授权店铺" prop="">
            <el-select v-model="dataForm.property.discount" placeholder="请选择" @change="getcostFreight('property.discount')">
                <el-option
                v-for="item in discountList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
          </el-form-item>
          
          <br>
          <el-form-item label="更新选项" prop="">
            <el-checkbox-group v-model="dataForm.roleIdList">
              <!-- <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{ role.roleName }}</el-checkbox> -->
              <el-checkbox>全部</el-checkbox>
              <el-checkbox>基本信息</el-checkbox>
              <el-checkbox>关系</el-checkbox>
              <el-checkbox>图片</el-checkbox>
            </el-checkbox-group>
            <div style="color:#F56C6C;margin-top:-6px;font-size:12px">如果只更新产品信息，则不需要选中上面选项</div>
          </el-form-item>
          <br>
          <el-form-item label="选择分类" prop="categoryId">
              <div style="display:flex;">
                  <div style="width:620px">
                      <el-cascader ref="aaa" v-model="dataForm.categoryId" :options="options" :props="props" clearable @change="productCategorChange" @visible-change="visibleChange"></el-cascader>
                        <br>
                        <span class="decVal">{{dataForm.categoryName}}</span>
                  </div>
                  <div style="width:240px">
                      <el-input v-model="dataForm.property.purchasePrice" placeholder="采购价格(¥)"></el-input>
                  </div>
                  <div>
                      <el-button type="primary" plain>历史选择</el-button>
                  </div>
              </div>
              
          </el-form-item>
          <br>
          <el-form-item label="分类模版" prop="">
            <el-select v-model="dataForm.property.discount" placeholder="请选择" @change="getcostFreight('property.discount')">
                <el-option
                v-for="item in discountList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="分类属性" prop="property.domesticFreight" :rules="dataRule.domesticFreight">
            <el-input v-model="dataForm.property.domesticFreight" placeholder="国内运费(¥)"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <!-- 新增变体弹框 -->
      <el-dialog
        title="新增变体参数"
        :visible.sync="addVisible"
        width="600px">
        <div>
            <div class="addSeclec">
                <label style="display:inline-block;margin:10px 0 10px 0;font-weight:600">变体名称</label>
                <br>
                <el-select v-model="addObj.type" placeholder="请选择" @change="addObj.value = ''">
                    <el-option
                    label="颜色（color）"
                    value="颜色（color）">
                    </el-option>
                    <el-option
                    label="尺寸（sizeNam）"
                    value="尺寸（sizeNam）">
                    </el-option>
                </el-select>
            </div>
            <div style="margin-bottom:10px">
                <label style="display:inline-block;margin:20px 0 10px 0;font-weight:600">变体值:(多个值用逗号隔开如:red,white,black)</label>
                <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="addObj.value"
                    clearable>
                </el-input>
            </div>
            <div class="tag-group">
                <span class="tag-group__title">推荐</span>
                <template v-if='addObj.type == "颜色（color）"'>
                    <!-- :effect="(addObj.value.split(',').indexOf(recommendE[index]) == -1) ? '' : 'dark'" -->
                    <el-tag
                        v-for="(item,index) in recommend"
                        @click="pushValue(index)"
                        :effect="(addObj.value.split(',').indexOf(recommendE[index]) == -1) ? '' : 'dark'"
                        :key="item">
                        {{ item }}
                    </el-tag>
                </template>
                <template v-if='addObj.type == "尺寸（sizeNam）"'>
                    <el-tag
                        v-for="(item,index) in recommend1"
                        @click="pushValue(index)"
                        :effect="(addObj.value.split(',').indexOf(recommend1E[index]) == -1) ? '' : 'dark'"
                        :key="item">
                        {{ item }}
                    </el-tag>
                </template>
                
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 变体加价弹框 -->
      <el-dialog
        title="变体加价"
        :visible.sync="addVMoneyVisible"
        width="500px">
        <div>
            <el-row style="margin-bottom:10px" v-for="(item,index) in addVMoneyList" :key="index">
                <el-col :span="3">
                    <label style="display:inline-block;line-height:36px">{{item.size}}</label>
                </el-col>
                <el-col :span="21">
                    <el-input
                        placeholder="请输入内容"
                        v-model="item.money"
                        clearable>
                    </el-input>
                </el-col>
                
                
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addVMoneyVisible = false">取 消</el-button>
            <el-button type="primary" @click="addVMoneyClick">确 定</el-button>
        </span>
    </el-dialog>

    </div>
  </div>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  import PageH from '../../common/pageH'
  import { getQuerycategory } from '@/api/product'
  import draggable from 'vuedraggable'
  export default {
    data () {
      var number = (rule, value, callback) => {
        if (/[^\d.]/g.test(value)) {
          callback(new Error('只能填写数字'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        categoryIds:[],
        imgSVList:[],
        addVisible:false,
        addVMoneyVisible:false,
        addItemVVisible:false,
        stockVisible:false,
        uploadImageVisible:false,
        selectImageVisible:false,
        selectImageIndex:null,
        selectImageList:[],
        stock:null,
        addVMoneyList:[],
        itemV:{color:'',size:''},
        roleList: [],
        imgList:[],
        productId:null,
        discountList:[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
        recommend:['米色','黑色','蓝色','青铜','棕色','明确','铜','奶油','金','绿色','灰色','金属','多色','橙子','粉','紫色','红','银','白色','黄色','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
        recommendE:['Beige','Black','Blue','Bronze','Brown','Clear','Copper','Cream','Gold','Green','Grey','Metallic','Multi-colored','Orange','Pink','Purple','Red','Silver','White','Yellow','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
        recommend1:['均码','XS','S','M','L','XL','XXL','XXXL','XXXXL','XXXXXL'],
        recommend1E:['OneSize','XS','S','M','L','XL','XXL','XXXL','XXXXL','XXXXXL'],
        freightLoading:false,
        dataForm: {
            roleIdList:[],
          uploadId: null,
          auditStatus:'',
          productType:'',
          productCategor:null,
          productSku:'',
          imageList:[],
          freightCostList:[{
            countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          },{
              countryCode: "",
            finalPrice: 0,
            foreignCurrency: 0,
            freight: 0,
            optimization: 0,
            price: 0,
            profit: 0,
            profitRate: "0.00%",
          }],
          introductionList:[{},{},{},{},{},{},{}],
          productTitle:'',
          property:{
              purchasePrice:0,
              domesticFreight:0
          },
          info:{},
          variantsInfoList:[],
          variantsParameterList:[],
          viFlag:0,
          vpFlag:0
        },
        addObj:{type:null,value:''},
        nowProTypeId:[],
        options:[],
        props:{
            lazy:true,
            lazyLoad: function(node, resolve) {
                if(node.value){
                    getQuerycategory({'categoryId':node.value}).then((data) => {
                        if (data.data && data.data.code == 0) {
                            const level = node.level;
                            const nodes = [];
                            if(data.data.categoryList.length != 0){
                                data.data.categoryList.forEach(function (item) {
                                    nodes.push({
                                        value:item.categoryId,
                                        label:item.categoryName+'('+item.count+')',
                                        leaf: level >= 2
                                    })
                                })
                                resolve(nodes);
                            }
                        } else {
                            alert(data.msg);
                        }
                    })
                }
            }
        },
        dataRule: {
          purchasePrice: [
            { required: true, message: '采购价格不能为空', trigger: 'blur' },
            { validator: number, trigger: 'blur' }
          ],
          domesticFreight: [
                { required: true, message: '国内运费不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            productWeight: [
                { required: true, message: '包装毛重不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            productWide: [
                { required: true, message: '宽不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            productLength: [
                { required: true, message: '长不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            productHeight: [
                { required: true, message: '高不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            discount: [
                { required: true, message: '不能为空', trigger: 'blur' },
            ],
          categoryId:[
            {required: true, message: '分类不能为空', trigger: 'change' }
          ]
        }
      }
    },
    components: {
      PageH,draggable
    },
    created(){
        this.init(this.$route.params)
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
      dragOptions() {
        return {
            animation: 0,
            group: "description",
            disabled: false,
            ghostClass: "ghost"
        };
      }
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
              url: this.$http.adornUrl('/product/product/productdetails'),
              method: 'get',
              params: this.$http.adornParams({
                  uploadId:this.dataForm.uploadId
              })
            }).then(({data}) => {
                loading.close();
              if (data && data.code === 0) {
                this.dataForm = data.product;
                this.imgList = this.dataForm.imageList.map((item) => {
                    return 'http://'+item.imageUrl
                })
                // console.log(this.imgList)
              }else{
                  this.$message.error(data.msg)
              }
            })
        }else{
            this.$nextTick(() => {
                this.$refs['dataForm'].resetFields();
                this.dataForm = obj.obj;
            })
        }
      },
      checkGroup(val){
          console.log(val)
      },
      // 产品分类下拉列表(一级)
        visibleChange(bol){
            if(bol){
                this.$http({
                    url: this.$http.adornUrl('/product/productcategory/querycategoryone'),
                    method: 'post',
                    data: this.$http.adornData()
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        var that = this;
                        data.categoryOneList.forEach(function(item){
                            that.options.push({
                                value:item.categoryId,
                                label:item.categoryName+'('+item.count+')',
                            })
                        })
                    
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }
            
        },
        productCategorChange(val){
            console.log(val);
            if(val.length != 0){
                var arr = this.$refs['aaa'].getCheckedNodes()[0].pathLabels;
                var arr1 = arr.map((item) => {
                    return item.split('(')[0]
                })
                this.dataForm.categoryName = arr1.join('/');
                this.categoryIds = val;
            }else{
                this.dataForm.categoryName = '';
                this.categoryIds = val;
            }
            
        },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.dataForm.categoryId = this.categoryIds[this.categoryIds.length-1]
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl(`/product/product/${!this.dataForm.uploadId ? 'originalproduct' : 'modifyproduct'}`),
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
                        // this.$nextTick(() => {
                        //   this.$refs['dataForm'].resetFields();
                        // })
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
    //   运费改变
      getcostFreight(str){
          this.$refs['dataForm'].validateField(str,(valid) => {
              if(!valid){
                  this.dataForm.categoryId = this.categoryIds[this.categoryIds.length-1]
                  const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                  this.$http({
                    url: this.$http.adornUrl('/product/productfreightcost/costFreight'),
                    method: 'post',
                    data: this.$http.adornData(this.dataForm)
                }).then(({data}) => {
                    loading.close();
                    if (data && data.code === 0) {
                        console.log(data);
                        this.dataForm.freightCostList = data.freightCostList
                    } else {
                        this.$message.error(data.msg)
                    }
                })
              }
          })
      },
      //   售价改变
      refreshProfitRate(row){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            this.$http({
                url: this.$http.adornUrl('/product/productfreightcost/refreshProfitRate'),
                method: 'post',
                data: this.$http.adornData({
                    productProperty:this.dataForm.property,
                    productFreightCost:row
                })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    row.finalPrice = data.freightCost.finalPrice;
                    row.profit = data.freightCost.profit;
                    row.profitRate =data.freightCost.profitRate;
                } else {
                    this.$message.error(data.msg)
                }
            })
      },
      deptChange(opt){
            this.dataForm.deptName = (this.$store.state.dept.comList.find(item => item.deptId == opt)).name;
            console.log(this.dataForm);
      },
    //   添加变体参数
      add(){
          console.log(this.addObj.value);
          if(this.dataForm.variantsParameterList.length == 0){
              this.dataForm.variantsParameterList.push({
                  paramsType:this.addObj.type,
                  paramsValue:this.addObj.value
              })
          }else if(this.dataForm.variantsParameterList.length == 1){
              if(this.dataForm.variantsParameterList[0].paramsType == this.addObj.type){
                  this.dataForm.variantsParameterList.splice(0,1);
                  this.dataForm.variantsParameterList.push({
                    paramsType:this.addObj.type,
                    paramsValue:this.addObj.value
                  })
                //   this.dataForm.variantsParameterList.type = this.addObj.value
              }else{
                  this.dataForm.variantsParameterList.push({
                        paramsType:this.addObj.type,
                        paramsValue:this.addObj.value
                    })
              }
          }else{
              var that = this;
              this.dataForm.variantsParameterList.forEach(function(item,index){
                  if(item.paramsType == that.addObj.type){
                    that.dataForm.variantsParameterList.splice(index,1);
                    that.dataForm.variantsParameterList.push({
                        paramsType:that.addObj.type,
                        paramsValue:that.addObj.value
                    })
                    // item.type = that.addObj.value
                  }
              })
          }
          this.getVList();

          this.addVisible = false;
          this.dataForm.vpFlag = 1;
      },
    //   修改变体参数
      editV(index){
          this.addVisible = true;
          this.addObj.type = this.dataForm.variantsParameterList[index].paramsType;
          this.addObj.value = this.dataForm.variantsParameterList[index].paramsValue;
      },
    //   删除变体
      del(index){
        this.$confirm('确定删除该变体属性?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if(this.dataForm.uploadId){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                this.$http({
                    url: this.$http.adornUrl('/product/productvariantparameter/delete'),
                    method: 'post',
                    data: this.$http.adornData({
                        paramsId:this.dataForm.variantsParameterList[index].paramsId
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.dataForm.variantsParameterList.splice(index,1);
                            this.getVList();
                            this.dataForm.vpFlag = 1;
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    }
                })
            }else{
                this.dataForm.variantsParameterList.splice(index,1);
                this.getVList();
                this.dataForm.vpFlag = 1;
            }
            
        })
        
      },
    //   点击推荐添加参数值
      pushValue(index){
          var arr = [];
          console.log(this.addObj.value);
          if(this.addObj.value != ''){
              arr = this.addObj.value.split(',');
          }
          if(this.addObj.type == '颜色（color）'){
            if(arr.indexOf(this.recommendE[index]) == -1){
                arr.push(this.recommendE[index]);
            }else{
                console.log(arr.indexOf(this.recommendE[index]));
                arr.splice(arr.indexOf(this.recommendE[index]),1)
            }
          }else{
            if(arr.indexOf(this.recommend1E[index]) == -1){
                arr.push(this.recommend1E[index]);
            }else{
                console.log(arr.indexOf(this.recommend1E[index]));
                arr.splice(arr.indexOf(this.recommend1E[index]),1)
            }
          }
          
          
          this.addObj.value = arr.join(',');
          
      },
    //   变体列表
      getVList(){
          var that = this;
          if(this.dataForm.variantsParameterList.length == 1){
              that.dataForm.variantsInfoList = [];
              this.dataForm.variantsParameterList[0].paramsValue.split(',').forEach(function(item){
                  that.dataForm.variantsInfoList.push({
                      variantCombination:item,
                      variantSku:'',
                      eanCode:'',
                      variantAddPrice:'',
                      variantStock:(Math.round(Math.random()*10) + 60),
                      imageUrl:'',
                  })
              })
              
          }else if(this.dataForm.variantsParameterList.length == 2){
              that.dataForm.variantsInfoList = [];
              if(this.dataForm.variantsParameterList[0].paramsType == '颜色（color）'){
                this.dataForm.variantsParameterList[0].paramsValue.split(',').forEach(function(item){
                    that.dataForm.variantsParameterList[1].paramsValue.split(',').forEach(function(m){
                        that.dataForm.variantsInfoList.push({
                            variantCombination:item + ' - ' + m,
                            variantSku:'',
                            eanCode:'',
                            variantAddPrice:'',
                            variantStock:(Math.round(Math.random()*10) + 60),
                            imageUrl:'',
                        })
                    })
                })
              }else{
                this.dataForm.variantsParameterList[1].paramsValue.split(',').forEach(function(item){
                    that.dataForm.variantsParameterList[0].paramsValue.split(',').forEach(function(m){
                        that.dataForm.variantsInfoList.push({
                            variantCombination:item + ' - ' + m,
                            variantSku:'',
                            eanCode:'',
                            variantAddPrice:'',
                            variantStock:(Math.round(Math.random()*10) + 60),
                            imageUrl:'',
                        })
                    })
                })
              }
              
          }else{
              that.dataForm.variantsInfoList = [];
          }
          this.dataForm.viFlag = 1;
      },
    //   删除变体列表
      delVList(index){
        this.$confirm('确定删除该变体信息?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.dataForm.variantsInfoList.splice(index,1);
            this.dataForm.viFlag = 1;
        })
      },
    //   翻译
        fanyi(text,num){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
            this.$http({
                url: this.$http.adornUrl('/product/productintroduction/titleZhtoOther'),
                method: 'post',
                data: this.$http.adornData({
                    text:text,
                    introductionList:this.dataForm.introductionList,
                    type:num
                })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    this.dataForm.introductionList = data.introductionList
                    
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 变体加价弹框
        addVMoney(){
            var that=this;
            if(this.dataForm.variantsParameterList.length == 2){
                this.addVMoneyVisible =true;
                if(this.dataForm.variantsParameterList[0].paramsType=='尺寸（sizeNam）'){
                    this.dataForm.variantsParameterList[0].paramsValue.split(',').forEach(function(item){
                        that.addVMoneyList.push({
                            size:item,
                            money:''
                        })
                    })
                    
                }else{
                    this.dataForm.variantsParameterList[1].paramsValue.split(',').forEach(function(item){
                        that.addVMoneyList.push({
                            size:item,
                            money:''
                        })
                    })
                }
            }else if(this.dataForm.variantsParameterList.length == 1){
                if(this.dataForm.variantsParameterList[0].paramsType=='尺寸（sizeNam）'){
                    this.addVMoneyVisible =true;
                    this.dataForm.variantsParameterList[0].paramsValue.split(',').forEach(function(item){
                        that.addVMoneyList.push({
                            size:item,
                            money:''
                        })
                    })
                }else{
                    this.$message({
                        message: '暂无需要加价的变体',
                        type: 'warning'
                    });
                }
            }else{
                this.$message({
                    message: '暂无需要加价的变体',
                    type: 'warning'
                });
            }
        },
        // 变体加价
        addVMoneyClick(){
            var that = this;
            if(this.dataForm.variantsParameterList.length == 1){
                this.addVMoneyList.forEach(function(item){
                    that.dataForm.variantsInfoList.forEach(function(m){
                        if(m.variantCombination == item.size){
                            m.variantAddPrice = item.money
                        }
                    })
                })
            }else{
                this.addVMoneyList.forEach(function(item){
                    that.dataForm.variantsInfoList.forEach(function(m){
                        if(m.variantCombination.split(' - ')[1] == item.size){
                            m.variantAddPrice = item.money
                        }
                    })
                })
            }
            this.addVMoneyVisible = false;
            this.dataForm.viFlag = 1;
            
        },
        // 添加单条变体
        addItemVClick(){
            var that = this;
            if(this.itemV.color == '' && this.itemV.size == ''){
                this.$message({
                    message: '请填写至少一种变体属性',
                    type: 'warning'
                });
            }else if(this.itemV.color != '' && this.itemV.size == ''){
                that.dataForm.variantsInfoList.push({
                    variantCombination:this.itemV.color,
                    variantSku:'',
                    eanCode:'',
                    variantAddPrice:'',
                    variantStock:(Math.round(Math.random()*10) + 60),
                    imageUrl:'',
                })
            }else if(this.itemV.color != '' && this.itemV.size != ''){
                that.dataForm.variantsInfoList.push({
                    variantCombination:this.itemV.color + ' - ' + this.itemV.size,
                    variantSku:'',
                    eanCode:'',
                    variantAddPrice:'',
                    variantStock:(Math.round(Math.random()*10) + 60),
                    imageUrl:'',
                })
            }
            else if(this.itemV.color == '' && this.itemV.size != ''){
                that.dataForm.variantsInfoList.push({
                    variantCombination:this.itemV.size,
                    variantSku:'',
                    eanCode:'',
                    variantAddPrice:'',
                    variantStock:(Math.round(Math.random()*10) + 60),
                    imageUrl:'',
                })
            }
            this.dataForm.viFlag = 1;
            this.addItemVVisible = false;
            this.itemV = {
                color:'',
                size:''
            }
            
        },
        // 修改库存
        stockClick(){
            var that = this;
            this.dataForm.variantsInfoList.forEach(function(item){
                item.variantStock = that.stock;
            })
            this.stockVisible = false
            this.dataForm.viFlag = 1;
        },
        // 获取相册
        getImage(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/product/productimage/imageinfo'),
                method: 'get',
                params: this.$http.adornParams({
                    'uploadId': this.dataForm.uploadId,
                })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataForm.imageList = data.imageInfo;
                    this.imgList = this.dataForm.imageList.map((item) => {
                        return 'http://'+item.imageUrl
                    })
                    this.uploadImageVisible = false;
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 保存相册
        saveImageList(){
            // var that=this;
            // console.log(this.dataForm.imageList)
            this.$confirm('确定保存当前相册顺序?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dataForm.imageList.forEach(function(item,index){
                    item.sort = index+1
                })
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http({
                    url: this.$http.adornUrl('/product/productimage/locationsave'),
                    method: 'post',
                    data: this.$http.adornData(this.dataForm.imageList, false)
                }).then(({data}) => {
                    loading.close();
                    if (data && data.code === 0) {
                        console.log(data);
                        this.getImage();
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            })
            
        },
        // 删除图片
        delImageList(){
            // console.log(this.selectImageList);
            this.$confirm('确定删除选中图片?', {
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
                    url: this.$http.adornUrl('/product/productimage/deleteimage'),
                    method: 'post',
                    data: this.$http.adornData(this.selectImageList, false)
                }).then(({data}) => {
                    loading.close();
                    if (data && data.code === 0) {
                        console.log(data);
                        this.getImage();
                    } else {
                        
                    }
                })
            })
            
        },
        // 变体选择图片
        selectImgClick(index){
            if(this.dataForm.imageList.length == 0){
                this.$message({
                    message: '暂无可选择的图片',
                    type: 'warning'
                });
            }else{
                if(this.dataForm.variantsInfoList[index].imageUrl != ''){
                    this.imgSVList = this.dataForm.variantsInfoList[index].imageUrl.split(',');
                }
                
                this.selectImageIndex =index;
                this.selectImageVisible = true;
            }
        },
        // 变体选择图片确定方法
        selectImgOk(){
            this.dataForm.variantsInfoList[this.selectImageIndex].imageUrl = this.imgSVList.join(',');
            this.selectImageVisible = false;
            console.log(this.dataForm.variantsInfoList);
            this.imgSVList = [];
            this.dataForm.viFlag = 1;
        },
        // 变体一键添加图片
        addImgVClick(index){
            this.$confirm('一键添加所有相册?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var that = this;
                var arr = [];
                this.dataForm.imageList.forEach(function(item){
                    arr.push(item.imageUrl);
                })
                this.dataForm.variantsInfoList[index].imageUrl = arr.join(',');
            })
            this.dataForm.viFlag = 1;
            
        },
        // 删除变体选中图片
        delImageVB(num,index){
            this.$confirm('确定删除该图片?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.dataForm.viFlag = 1;
                var arr = this.dataForm.variantsInfoList[num].imageUrl.split(',');
                arr.splice(index,1)
                this.dataForm.variantsInfoList[num].imageUrl = arr.join(',');
            })
            
            
        },
        // 同步所有颜色图片
        syColorImg(index){
            
            if(this.dataForm.variantsInfoList[index].imageUrl == ''){
                this.$message({
                    message: '该组合没有可以同步的图片',
                    type: 'warning'
                });
            }else{
                if(this.dataForm.variantsParameterList.length == 1){
                    this.$message({
                        message: '没有需要同步的变体',
                        type: 'warning'
                    });
                }else{
                    this.$confirm('确定同步该颜色的所有图片?', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var that = this,
                            color = this.dataForm.variantsInfoList[index].variantCombination.split(' - ')[0],
                            str = this.dataForm.variantsInfoList[index].imageUrl;
                        this.dataForm.variantsInfoList.forEach(function(item){
                            if(item.variantCombination.split(' - ')[0] == color){
                                item.imageUrl = str;
                            }
                            
                        })
                    })
                }
                
            }
        }
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
</style>

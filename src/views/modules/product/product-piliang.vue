<template>
  <el-dialog
    title="批量修改"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div class="conDivForm" style="overflow-y:auto;height:500px">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="产品分类" prop="categoryId">
              <!-- <span>{{dataForm.categoryName}}</span> -->
            <el-cascader ref="aaa" v-model="dataForm.categoryId" :options="options" :props="props" clearable @change="productCategorChange" @visible-change="visibleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="审核状态" prop="">
            <el-radio-group v-model="dataForm.auditStatus">
                <el-radio label="001">通过</el-radio>
                <el-radio label="002">待审核</el-radio>
                <el-radio label="003">失效</el-radio>
            </el-radio-group>
          </el-form-item>
          <br>
          <el-form-item label="产品类型" prop="">
            <el-radio-group v-model="dataForm.productType">
                <el-radio label="001">重点</el-radio>
                <el-radio label="002">原创</el-radio>
                <el-radio label="003">海外</el-radio>
                <el-radio label="004">抓取</el-radio>
                <el-radio label="005">其他</el-radio>
                
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品信息</h3>
          <el-form-item label="厂商名称" prop="">
            <el-input v-model="dataForm.info.producerName" placeholder="厂商名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称" prop="">
            <el-input v-model="dataForm.info.brandName" placeholder="品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="厂商编号" prop="">
            <el-input v-model="dataForm.info.manufacturerNumber" placeholder="厂商编号"></el-input>
          </el-form-item>
          <el-form-item label="包装毛重(kg)" prop="property.productWeight" :rules="dataRule.productWeight">
            <el-input v-model="dataForm.property.productWeight" placeholder="包装毛重(kg)"></el-input>
          </el-form-item>
          <el-form-item label="包装尺寸" prop="" required>
              <el-col :span="6">
                  <el-form-item prop="property.productLength" :rules="dataRule.productLength">
                    <el-input v-model="dataForm.property.productLength" placeholder="长"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productWide" :rules="dataRule.productWide">
                    <el-input v-model="dataForm.property.productWide" placeholder="宽"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productHeight" :rules="dataRule.productHeight">
                    <el-input v-model="dataForm.property.productHeight" placeholder="高"></el-input>
                  </el-form-item>
              </el-col>
            
          </el-form-item>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品介绍</h3>
          <el-tabs type="border-card">
            <el-tab-pane label="中文">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[0].productTitle,0)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].productTitle"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[0].keyWord,1)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].keyWord"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[0].keyPoints,2)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].keyPoints"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[0].productDescription,3)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].productDescription"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="英语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[1].productTitle,0)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[1].keyWord,1)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[1].keyPoints,2)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.introductionList[1].productDescription,3)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="法语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[2].productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[2].keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[2].keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[2].productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="意大利语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[3].productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[3].keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[3].keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[3].productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="西班牙语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[4].productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[4].keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[4].keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[4].productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="德语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[5].productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[5].keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[5].keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[5].productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="日语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[6].productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[6].keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[6].keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[6].productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        
      </el-form>
      

    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
      </span>
  </el-dialog>
</template>

<script>
  import { getQuerycategory } from '@/api/product'
  export default {
      props:{
          ids:{
              type:Array
          }
      },
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
        productId:null,
        freightLoading:false,
        dataForm: {
          productId: null,
          auditStatus:'',
          productType:'',
          productCategor:null,
          productSku:'',
          imageList:[],
          freightCostList:[],
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
        options:[],
        props:{
            lazy:true,
            lazyLoad: function(node, resolve) {
                if(node.value){
                    console.log(node)
                    getQuerycategory({'categoryId':node.value}).then((data) => {
                        
                        console.log(data == 0)
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
            productWeight: [
                { validator: number, trigger: 'blur' }
            ],
            productWide: [
                { validator: number, trigger: 'blur' }
            ],
            productLength: [
                { validator: number, trigger: 'blur' }
            ],
            productHeight: [
                { validator: number, trigger: 'blur' }
            ]
        }
      }
    },
    created(){
        this.visible = true;
        this.$nextTick(() => {
            this.$refs['dataForm'].resetFields();
        })
    },
    computed: {
    },
    methods: {
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
            var arr = this.$refs['aaa'].getCheckedNodes()[0].pathLabels;
            this.dataForm.categoryName = arr.join('/')
        },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
              this.dataForm.categoryId = this.dataForm.categoryId[this.dataForm.categoryId.length-1]
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl(`/product/product/${!this.productId ? 'originalproduct' : 'modifyproduct'}`),
                method: 'post',
                data: this.$http.adornData(this.dataForm)
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.visible = false
                            loading.close();
                            this.$emit('refreshDataList')
                        }
                    })
                
                } else {
                    this.$message.error(data.msg)
                    loading.close();
                }
            })
            
          }
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

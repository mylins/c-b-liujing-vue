<template>
  <el-dialog
    title="批量修改"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div class="conDivForm" style="overflow-y:auto;height:500px">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm" style="padding-top:0;">
          <h3 style="margin-top:0;"> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="产品分类" prop="categoryId">
              <!-- <span>{{dataForm.categoryName}}</span> -->
            <el-cascader ref="aaa" v-model="dataForm.categoryId" :options="options" :props="props" clearable @change="productCategorChange" @visible-change="visibleChange"></el-cascader>
          </el-form-item>
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
            <el-input v-model="dataForm.producerName" placeholder="厂商名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称" prop="">
            <el-input v-model="dataForm.brandName" placeholder="品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="厂商编号" prop="">
            <el-input v-model="dataForm.manufacturerNumber" placeholder="厂商编号"></el-input>
          </el-form-item>
          <el-form-item label="包装毛重(kg)" prop="productWeight">
            <el-input v-model="dataForm.productWeight" placeholder="包装毛重(kg)"></el-input>
          </el-form-item>
          <el-form-item label="包装尺寸" prop="">
              <el-col :span="6">
                  <el-form-item prop="productLength">
                    <el-input v-model="dataForm.productLength" placeholder="长"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="productWide">
                    <el-input v-model="dataForm.productWide" placeholder="宽"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="productHeight">
                    <el-input v-model="dataForm.productHeight" placeholder="高"></el-input>
                  </el-form-item>
              </el-col>
            
          </el-form-item>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品介绍</h3>
          <el-tabs type="border-card">
            <el-tab-pane label="英语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.productTitle,0)">一键翻译</el-button>
                        <el-checkbox v-model="dataForm.britainIntroduction.isProductTitle" @change="istitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.britainIntroduction.productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.keyWord,1)">一键翻译</el-button>
                        <el-checkbox v-model="dataForm.britainIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.britainIntroduction.keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.keyPoints,2)">一键翻译</el-button>
                        <el-checkbox v-model="dataForm.britainIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.britainIntroduction.keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.productDescription,3)">一键翻译</el-button>
                        <el-checkbox v-model="dataForm.britainIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.britainIntroduction.productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="法语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox v-model="dataForm.franceIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.franceIntroduction.productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox v-model="dataForm.franceIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.franceIntroduction.keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox v-model="dataForm.franceIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.franceIntroduction.keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox v-model="dataForm.franceIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.franceIntroduction.productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="意大利语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox v-model="dataForm.italyIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.italyIntroduction.productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox v-model="dataForm.italyIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.italyIntroduction.keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox v-model="dataForm.italyIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.italyIntroduction.keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox v-model="dataForm.italyIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.italyIntroduction.productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="西班牙语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox v-model="dataForm.spainIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.spainIntroduction.productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox v-model="dataForm.spainIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.spainIntroduction.keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox v-model="dataForm.spainIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.spainIntroduction.keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox v-model="dataForm.spainIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.spainIntroduction.productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="德语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox v-model="dataForm.germanyIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.germanyIntroduction.productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox v-model="dataForm.germanyIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.germanyIntroduction.keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox v-model="dataForm.germanyIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.germanyIntroduction.keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox v-model="dataForm.germanyIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.germanyIntroduction.productDescription"
                        maxlength="2000"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="日语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox v-model="dataForm.japanIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.japanIntroduction.productTitle"
                        maxlength="200"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox v-model="dataForm.japanIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.japanIntroduction.keyWord"
                        maxlength="250"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox v-model="dataForm.japanIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.japanIntroduction.keyPoints"
                        maxlength="500"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox v-model="dataForm.japanIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.japanIntroduction.productDescription"
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
        roleList: [],
        productId:null,
        freightLoading:false,
        dataForm: {
          productIds: [],
          productType:'',
          categoryName:'',
          producerName:'',
          brandName:'',
          manufacturerNumber:'',
          productWeight:'',
          productLength:'',
          productWide:'',
          productHeight:'',
          britainIntroduction:{},
          franceIntroduction:{},
          germanyIntroduction:{},
          italyIntroduction:{},
          spainIntroduction:{},
          japanIntroduction:{}
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
            ],
        }
      }
    },
    computed: {
    },
    methods: {
        init(ids){
            this.visible = true;
            this.dataForm = {
                productIds: [],
                productType:'',
                categoryName:'',
                producerName:'',
                brandName:'',
                manufacturerNumber:'',
                productWeight:'',
                productLength:'',
                productWide:'',
                productHeight:'',
                britainIntroduction:{},
                franceIntroduction:{},
                germanyIntroduction:{},
                italyIntroduction:{},
                spainIntroduction:{},
                japanIntroduction:{}
            }
            this.dataForm.productIds = ids;
            this.$nextTick(() => {
                this.$refs['dataForm'].resetFields();
            })
            
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
            if(val.length != 0){
                var arr = this.$refs['aaa'].getCheckedNodes()[0].pathLabels;
                var arr1 = arr.map((item) => {
                    return item.split('(')[0]
                })
                this.dataForm.categoryName = arr1.join('/');
            }else{
                this.dataForm.categoryName = '';
            }
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
                        url: this.$http.adornUrl('/product/product/batchmodify'),
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
        // 追加
        istitle(val){
            console.log(val);
            if(val){
                this.dataForm.franceIntroduction.isProductTitle = true;
                this.dataForm.germanyIntroduction.isProductTitle = true;
                this.dataForm.italyIntroduction.isProductTitle = true;
                this.dataForm.spainIntroduction.isProductTitle = true;
                this.dataForm.japanIntroduction.isProductTitle = true;
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

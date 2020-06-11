<template>
  <el-dialog
    title="批量修改"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <div class="conDivForm" style="overflow-y:auto;height:500px">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm" style="padding-top:0;">
          <h3 style="margin-top:0;"> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="产品分类" prop="">
              <!-- <span>{{dataForm.categoryName}}</span> -->
            <el-cascader ref="aaa" v-model="dataForm.categoryId" :options="options" :props="props" clearable @change="productCategorChange" @visible-change="visibleChange"></el-cascader>
          </el-form-item>
          <el-form-item label="产品类型" prop="">
            <el-radio-group v-model="dataForm.productType">
                <el-radio v-for="item in productTypeList" :key="item.code" :label="item.code">{{item.value}}</el-radio>
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
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.britainIntroduction.isProductTitle" @change="istitle('isProductTitle')">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="britainIntroduction.productTitle" :rules="{max: 200,message: '英语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.britainIntroduction.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.keyWord,1)">一键翻译</el-button>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.britainIntroduction.isKeyWord" @change="istitle('isKeyWord')">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="britainIntroduction.keyWord" :rules="{max: 250,message: '英语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.britainIntroduction.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.keyPoints,2)">一键翻译</el-button>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.britainIntroduction.isKeyPoints" @change="istitle('isKeyPoints')">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="britainIntroduction.keyPoints" :rules="{max: 500,message: '英语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.britainIntroduction.keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi(dataForm.britainIntroduction.productDescription,3)">一键翻译</el-button>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.britainIntroduction.isProductDescription" @change="istitle('isProductDescription')">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="britainIntroduction.productDescription" :rules="{max: 2000,message: '英语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.britainIntroduction.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="法语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.franceIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="franceIntroduction.productTitle" :rules="{max: 200,message: '法语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.franceIntroduction.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.franceIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="franceIntroduction.keyWord" :rules="{max: 250,message: '法语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.franceIntroduction.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.franceIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="franceIntroduction.keyPoints" :rules="{max: 500,message: '法语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.franceIntroduction.keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.franceIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="franceIntroduction.productDescription" :rules="{max: 2000,message: '法语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.franceIntroduction.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="意大利语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.italyIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="italyIntroduction.productTitle" :rules="{max: 200,message: '意大利语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.italyIntroduction.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.italyIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="italyIntroduction.keyWord" :rules="{max: 250,message: '意大利语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.italyIntroduction.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.italyIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="italyIntroduction.keyPoints" :rules="{max: 500,message: '意大利语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.italyIntroduction.keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.italyIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="italyIntroduction.productDescription" :rules="{max: 2000,message: '意大利语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.italyIntroduction.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="西班牙语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.spainIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="spainIntroduction.productTitle" :rules="{max: 200,message: '西班牙语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.spainIntroduction.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.spainIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="spainIntroduction.keyWord" :rules="{max: 250,message: '西班牙语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.spainIntroduction.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.spainIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="spainIntroduction.keyPoints" :rules="{max: 500,message: '西班牙语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.spainIntroduction.keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.spainIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="spainIntroduction.productDescription" :rules="{max: 2000,message: '西班牙语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.spainIntroduction.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="德语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.germanyIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="germanyIntroduction.productTitle" :rules="{max: 200,message: '德语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.germanyIntroduction.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.germanyIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="germanyIntroduction.keyWord" :rules="{max: 250,message: '德语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.germanyIntroduction.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.germanyIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="germanyIntroduction.keyPoints" :rules="{max: 500,message: '德语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.germanyIntroduction.keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.germanyIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="germanyIntroduction.productDescription" :rules="{max: 2000,message: '德语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.germanyIntroduction.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="日语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.japanIntroduction.isProductTitle">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="japanIntroduction.productTitle" :rules="{max: 200,message: '日语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.japanIntroduction.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.japanIntroduction.isKeyWord">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="japanIntroduction.keyWord" :rules="{max: 250,message: '日语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.japanIntroduction.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.japanIntroduction.isKeyPoints">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="japanIntroduction.keyPoints" :rules="{max: 500,message: '日语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.japanIntroduction.keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-checkbox :true-label='1' :false-label='0' v-model="dataForm.japanIntroduction.isProductDescription">是否追加</el-checkbox>
                    </label>
                    <div>
                        <el-form-item label="" prop="japanIntroduction.productDescription" :rules="{max: 2000,message: '日语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.japanIntroduction.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
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
        productTypeList:[],
        visible: false,
        roleList: [],
        productId:null,
        freightLoading:false,
        dataForm: {
          productIds: [],
          productType:'',
          categoryId:null,
          categoryName:'',
          producerName:'',
          brandName:'',
          manufacturerNumber:'',
          productWeight:'',
          productLength:'',
          productWide:'',
          productHeight:'',
          britainIntroduction:{
                    countryCode: "GB"
                },
                franceIntroduction:{
                    countryCode: "FR"
                },
                germanyIntroduction:{
                    countryCode: "DE"
                },
                italyIntroduction:{
                    countryCode: "IT"
                },
                spainIntroduction:{
                    countryCode: "ES"
                },
                japanIntroduction:{
                    countryCode: "JP"
                }
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
                categoryId:null,
                categoryName:'',
                categoryId:null,
                producerName:'',
                brandName:'',
                manufacturerNumber:'',
                productWeight:'',
                productLength:'',
                productWide:'',
                productHeight:'',
                britainIntroduction:{
                    countryCode: "GB",
                    productTitle:null,
                    keyWord:null,
                    keyPoints:null,
                    productDescription:null,
                },
                franceIntroduction:{
                    countryCode: "FR",
                    productTitle:null,
                    keyWord:null,
                    keyPoints:null,
                    productDescription:null,
                },
                germanyIntroduction:{
                    countryCode: "DE",
                    productTitle:null,
                    keyWord:null,
                    keyPoints:null,
                    productDescription:null,
                },
                italyIntroduction:{
                    countryCode: "IT",
                    productTitle:null,
                    keyWord:null,
                    keyPoints:null,
                    productDescription:null,
                },
                spainIntroduction:{
                    countryCode: "ES",
                    productTitle:null,
                    keyWord:null,
                    keyPoints:null,
                    productDescription:null,
                },
                japanIntroduction:{
                    countryCode: "JP",
                    productTitle:null,
                    keyWord:null,
                    keyPoints:null,
                    productDescription:null,
                }
            }
            this.dict('产品类型');
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
            this.$refs['dataForm'].validate((valid,pro) => {
                if (valid) {
                    if(this.dataForm.categoryId){
                        this.dataForm.categoryId = this.dataForm.categoryId[this.dataForm.categoryId.length-1]
                    }else{
                        this.dataForm.categoryId = 0
                    }
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
                    
                }else{
                    let str = '';
                    for (let key in pro){
                        pro[key].forEach(function(item){
                            if(str.length == 0){
                                str+=item.message
                            }else{
                                str+='、\t'+item.message
                            }
                        })
                    }
                    this.$message({
                            message: str,
                            type: 'warning'
                        });
                }
            })
        },
        //   翻译
        fanyi(text,num){
            let introductionList = [];
            introductionList.push(this.dataForm.britainIntroduction);
            introductionList.push(this.dataForm.franceIntroduction);
            introductionList.push(this.dataForm.germanyIntroduction);
            introductionList.push(this.dataForm.italyIntroduction);
            introductionList.push(this.dataForm.spainIntroduction);
            introductionList.push(this.dataForm.japanIntroduction);
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/product/productintroduction/titleEntoOthers'),
                method: 'post',
                data: this.$http.adornData({
                    text:text,
                    introductionList:introductionList,
                    type:num
                })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.dataForm.britainIntroduction = data.introductionList[0];
                            this.dataForm.franceIntroduction = data.introductionList[1];
                            this.dataForm.germanyIntroduction = data.introductionList[2];
                            this.dataForm.italyIntroduction = data.introductionList[3];
                            this.dataForm.spainIntroduction = data.introductionList[4];
                            this.dataForm.japanIntroduction = data.introductionList[5];
                        }
                    })
                    // this.dataForm.introductionList = data.introductionList
                    
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 追加
        istitle(val){
            console.log(val);
            if(this.dataForm.britainIntroduction[val]){
                this.dataForm.franceIntroduction[val] = 1;
                this.dataForm.germanyIntroduction[val] = 1;
                this.dataForm.italyIntroduction[val] = 1;
                this.dataForm.spainIntroduction[val] = 1;
                this.dataForm.japanIntroduction[val] = 1;
            }else{
                this.dataForm.franceIntroduction[val] = 0;
                this.dataForm.germanyIntroduction[val] = 0;
                this.dataForm.italyIntroduction[val] = 0;
                this.dataForm.spainIntroduction[val] = 0;
                this.dataForm.japanIntroduction[val] = 0;
            }
        },
        // 数据字典
        dict(type){
            this.$http({
              url: this.$http.adornUrl('/sys/sysdict/selectDict'),
              method: 'get',
              params: this.$http.adornParams({
                  name:type
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                if(type == '审核状态'){
                    this.auditStatusList = data.dictList
                }else if(type = '产品类型'){
                    this.productTypeList = data.dictList
                }
              }else{
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

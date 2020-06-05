<template>
  <div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="订单ID" prop="">
            <span class="decVal">{{dataForm.orderId}}</span>
          </el-form-item>
          <el-form-item label="店铺" prop="">
            <span class="decVal">{{dataForm.shopName}}</span>
          </el-form-item>
          <br>
          <el-form-item label="总数量" prop="">
            <span class="decVal">{{dataForm.orderNumber}}</span>
          </el-form-item>
          <el-form-item label="总采购价(￥)" prop="">
            <span class="decVal">{{dataForm.purchasePrice}}</span>
          </el-form-item>
          <el-form-item label="订单状态" prop="productSku">
              <span class="decVal">{{dataForm.orderState}}</span>
          </el-form-item>
          <el-form-item label="亚马逊单号" prop="">
              <span class="decVal">{{dataForm.amazonOrderId}}</span>
          </el-form-item>
          <el-form-item label="购买日期" prop="">
              <span class="decVal">{{dataForm.buyDate}}</span>
          </el-form-item>
        </div>

        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品信息</h3>
          <el-form-item label="厂商名称" prop="">
              <!-- <span class="decVal">{{dataForm.categoryName}}</span> -->
              <span class="decVal">{{dataForm.info.producerName ? dataForm.info.producerName : '无'}}</span>
          </el-form-item>
          <el-form-item label="品牌名称" prop="">
              <span class="decVal">{{dataForm.info.brandName ? dataForm.info.brandName : '无'}}</span>
          </el-form-item>
          <el-form-item label="厂商编号" prop="">
              <span class="decVal">{{dataForm.info.manufacturerNumber ? dataForm.info.manufacturerNumber : '无'}}</span>
          </el-form-item>
          <el-form-item label="产品库存" prop="stock">
              <span class="decVal">{{dataForm.info.stock ? dataForm.info.stock : '无'}}</span>
          </el-form-item>
          <el-form-item label="产品来源" prop="productSku">
              <span class="decVal">{{dataForm.info.productSource ? dataForm.info.productSource : '无'}}</span>
          </el-form-item>
          <el-form-item label="来源地址" prop="productTitle">
              <span class="decVal">{{dataForm.info.sellerLink ? dataForm.info.sellerLink : '无'}}</span>
          </el-form-item>
          <el-form-item label="附加备注" prop="stock">
              <span class="decVal">{{dataForm.info.productRemark ? dataForm.info.productRemark : '无'}}</span>
          </el-form-item>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;国际物流</h3>
          <br>
          <el-table
            class="freTable"
            :data="dataForm.abroadLogisticsList"
            v-loading="freightLoading"
            style="width: 90%;margin-left:5%">
            <el-table-column
                prop="abroadWaybill"
                label="国际物流单号"
                width="">
            </el-table-column>
            <el-table-column
                prop="trackWaybill"
                label="国际跟踪号"
                width="">
            </el-table-column>
            <el-table-column
                prop="interFreight"
                label="国际运费(¥)"
                width="">
            </el-table-column>
            <el-table-column
                prop="channeDisplayName"
                label="线路"
                width="">
            </el-table-column>
            <el-table-column
                prop="actualWeight"
                label="重量(kg)"
                width="">
            </el-table-column>
            <el-table-column
                prop="shipTime"
                label="发货时间"
                width="">
            </el-table-column>
            <el-table-column
                prop="state"
                label="物流状态"
                width="">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.state">{{scope.row.state}}</el-tag>
                    <el-tag type="info" v-else>无状态</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="type"
                label="同步状态"
                width="">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isSynchronization == 0" type="info">未同步</el-tag>
                    <el-tag v-if="scope.row.isSynchronization == 1">已同步</el-tag>
                    <el-tag v-if="scope.row.isSynchronization == 1">正在同步</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                prop="type"
                label="作废"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="创建时间"
                width="">
            </el-table-column>

                
          </el-table>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;订单明细</h3>
          <br>
          <el-table
            class="freTable"
            :data="orderObj"
            v-loading="freightLoading"
            style="width: 90%;margin-left:5%">
            <el-table-column
                prop="type"
                label="币种"
                width="">
            </el-table-column>
            <el-table-column
                prop="money"
                :label="'订单金额('+dataForm.momentRate+')'"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="Amazon佣金"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="到账金额"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="采购价"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="国际运费"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="平台佣金"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="退货费用"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="利润"
                width="">
            </el-table-column>
            <el-table-column
                prop="type"
                label="利润率"
                width="">
            </el-table-column>

                
          </el-table>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;备注信息</h3>
          
          <el-tabs type="border-card">
            <el-tab-pane label="内部备注">
                <el-button size="small" type="primary" plain @click="remarkVisible = true">添加备注</el-button>
                <el-table
                    v-if="dataForm.remarkList.length != 0"
                    :data="dataForm.remarkList"
                    style="width: 100%">
                    <el-table-column
                        prop="remarkType"
                        label="备注类型"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="备注人"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注内容"
                        width="">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="时间"
                        width="100">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="操作日志">
                <el-table
                    :data="dataForm.logList"
                    style="width: 100%">
                    <el-table-column
                        prop="updateTime"
                        label="操作时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="userName"
                        label="操作人"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        label="备注"
                        width="">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
        
      </el-form>
      <!-- 添加备注 -->
      <el-dialog
        title="添加备注"
        :visible.sync="remarkVisible"
        width="500px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="6">
                    <label style="display:inline-block;line-height:36px">备注类型</label>
                </el-col>
                <el-col :span="18">
                    <el-select v-model="remarkObj.type" placeholder="请选择">
                        <el-option
                        v-for="item in remarkList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:10px">
                <el-col :span="6">
                    <label style="display:inline-block;line-height:36px">备注内容</label>
                </el-col>
                <el-col :span="18">
                    <el-select v-model="remarkObj.con" placeholder="请选择">
                        <el-option
                        v-for="item in remarkList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="remarkVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRemark">确 定</el-button>
        </span>
    </el-dialog>
    <!-- <el-form-item label="包装尺寸" prop="" required>
              <el-col :span="6">
                  <el-form-item prop="property.productLength" :rules="dataRule.productLength">
                      <span class="decVal">{{dataForm.property.productLength ? dataForm.property.productLength : '无'}}</span>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productWide" :rules="dataRule.productWide">
                      <span class="decVal">{{dataForm.property.productWide ? dataForm.property.productWide : '无'}}</span>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productHeight" :rules="dataRule.productHeight">
                      <span class="decVal">{{dataForm.property.productHeight ? dataForm.property.productHeight : '无'}}</span>
                  </el-form-item>
              </el-col>
            
          </el-form-item> -->
    </div>
  </div>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
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
        imgList:[],
        visible: false,
        imgSVList:[],
        remarkList:['内部备注','采购异常','国内物流异常','国际物流异常'],
        remarkVisible:false,
        remarkObj:{
            type:'',
            con:''
        },
        orderObj:[],
        stock:null,
        addVMoneyList:[],
        itemV:{color:'',size:''},
        roleList: [],
        productId:null,
        discountList:[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
        freightLoading:false,
        dataForm: {
          productId: null,
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
          categoryId:[
            {required: true, message: '分类不能为空', trigger: 'change' }
          ]
        }
      }
    },
    created(){
        this.init(this.$route.params)
    },
    methods: {
        moveImg(newIndex,oldIndex,el) {
            // this.dataForm.imageList = this.dataForm.imageList.shunxu((a, b) => a.sort - b.sort);
            console.log(this.dataForm.imageList[newIndex]);
            console.log(this.dataForm.imageList[oldIndex]);
        },
        init (obj) {
            this.productId = obj.productId || 0;
            if(this.productId){
                this.$http({
                url: this.$http.adornUrl('/product/product/productdetails'),
                method: 'get',
                params: this.$http.adornParams({
                    productId:this.productId
                })
                }).then(({data}) => {
                if (data && data.code === 0) {
                    this.dataForm = data.product;
                    this.imgList = this.dataForm.imageList.map((item) => {
                        return 'http://'+item.imageUrl
                    })
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
                
            }
            })
        },
        // 添加备注
        addRemark(){
            // this.remarkObj 备注信息对象
            this.remarkVisible = false;
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

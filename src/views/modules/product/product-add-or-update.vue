<template>
  <div>
    <page-h ref="back" :product="true" :productId="dataForm.productId" :id="productId"></page-h>
    <div class="subDivForm">
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="visible = false">取消</el-button> -->
        <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
      </span>
    </div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="产品编号" prop="">
            <!-- <el-input :disabled="true" v-model="dataForm.productId" placeholder="产品编号"></el-input> -->
            <el-button type="text">{{dataForm.productId}}</el-button>
          </el-form-item>
          <el-form-item label="审核状态" prop="">
            <el-button type="text">{{dataForm.auditStatus == '002' ? '待审核' : ''}}</el-button>
          </el-form-item>
          <el-form-item label="产品类型" prop="">
            <el-button type="text">{{dataForm.productType == '002' ? '原创' : ''}}</el-button>
          </el-form-item>
          <el-form-item label="内部SKU" prop="productSku">
            <el-button type="text">{{dataForm.productSku}}</el-button>
          </el-form-item>
          <br>
          <el-form-item label="产品标题" prop="">
            <el-input v-model="dataForm.productTitle" placeholder="产品标题"></el-input>
          </el-form-item>
          <el-form-item label="SKU修正" prop="productSku">
            <el-input v-model="dataForm.correction" placeholder="SKU修正,建议两位英文字母"></el-input>
          </el-form-item>
          <el-form-item label="产品库存" prop="stock">
            <el-input v-model="dataForm.stock" placeholder="产品库存"></el-input>
          </el-form-item>
          <el-form-item label="产品分类" prop="productCategory">
            <el-input v-model="dataForm.productCategory" placeholder="产品分类"></el-input>
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
          <el-form-item label="产品来源" prop="productSku">
            <el-input v-model="dataForm.info.productSource" placeholder="内部SKU"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="来源地址" prop="productTitle">
            <el-input class="textIN" type="textarea" :rows="2" v-model="dataForm.info.sellerLink" placeholder="来源地址"></el-input>
          </el-form-item>
          <el-form-item label="附加备注" prop="stock">
            <el-input class="textIN" type="textarea" :rows="2" v-model="dataForm.info.productRemark" placeholder="附加备注"></el-input>
          </el-form-item>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;成本运费</h3>
          <el-form-item label="采购价格(¥)" prop="property.purchasePrice" :rules="dataRule.purchasePrice">
            <el-input v-model="dataForm.property.purchasePrice" placeholder="采购价格(¥)" @change="getcostFreight('property.purchasePrice')"></el-input>
          </el-form-item>
          <el-form-item label="国内运费(¥)" prop="property.domesticFreight" :rules="dataRule.domesticFreight">
            <el-input v-model="dataForm.property.domesticFreight" placeholder="国内运费(¥)" @change="getcostFreight('property.domesticFreight')"></el-input>
          </el-form-item>
          <el-form-item label="包装毛重(kg)" prop="property.productWeight" :rules="dataRule.productWeight">
            <el-input v-model="dataForm.property.productWeight" placeholder="包装毛重(kg)" @change="getcostFreight('property.productWeight')"></el-input>
          </el-form-item>
          <el-form-item label="包装尺寸" prop="" required>
              <el-col :span="6">
                  <el-form-item prop="property.productLength" :rules="dataRule.productLength">
                    <el-input v-model="dataForm.property.productLength" placeholder="长" @change="getcostFreight('property.productLength')"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productWide" :rules="dataRule.productWide">
                    <el-input v-model="dataForm.property.productWide" placeholder="宽" @change="getcostFreight('property.productWide')"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productHeight" :rules="dataRule.productHeight">
                    <el-input v-model="dataForm.property.productHeight" placeholder="高" @change="getcostFreight('property.productHeight')"></el-input>
                  </el-form-item>
              </el-col>
            
          </el-form-item>
          <br>
          <el-form-item label="产品打折" prop="productTitle">
            <el-select v-model="dataForm.property.discount" placeholder="请选择">
                <el-option
                v-for="item in discountList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
          </el-form-item>
          <el-table
            class="freTable"
            :data="dataForm.freightCostList"
            v-loading="freightLoading"
            style="width: 90%;margin-left:5%">
            <el-table-column
                prop=""
                label="国家"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.countryCode == 'US'" style="font-size:14px;color:#409EFF">美国</span>
                    <span v-if="scope.row.countryCode == 'CA'" style="font-size:14px;color:#409EFF">加拿大</span>
                    <span v-if="scope.row.countryCode == 'MX'" style="font-size:14px;color:#409EFF">墨西哥</span>
                    <span v-if="scope.row.countryCode == 'GB'" style="font-size:14px;color:#409EFF">英国</span>
                    <span v-if="scope.row.countryCode == 'FR'" style="font-size:14px;color:#409EFF">法国</span>
                    <span v-if="scope.row.countryCode == 'DE'" style="font-size:14px;color:#409EFF">德国</span>
                    <span v-if="scope.row.countryCode == 'IT'" style="font-size:14px;color:#409EFF">意大利</span>
                    <span v-if="scope.row.countryCode == 'ES'" style="font-size:14px;color:#409EFF">西班牙</span>
                    <span v-if="scope.row.countryCode == 'JP'" style="font-size:14px;color:#409EFF">日本</span>
                    <span v-if="scope.row.countryCode == 'AU'" style="font-size:14px;color:#409EFF">澳大利亚</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="freight"
                label="运费(¥)"
                width="180">
            </el-table-column>
            <el-table-column
                prop="price"
                label="售价(¥)">
            </el-table-column>
            <el-table-column
                prop="foreignCurrency"
                label="外币"
                width="180">
            </el-table-column>
            <el-table-column
                prop="optimization"
                label="优化">
            </el-table-column>
            <el-table-column
                prop=""
                label="最终售价"
                width="180">
                <template slot-scope="scope">
                    <el-input placeholder="请输入内容" size="small" v-model="scope.row.finalPrice" clearable @change="refreshProfitRate(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                prop="price"
                label="利润(¥)">
                <template slot-scope="scope">
                    <span style="color:#409EFF">{{scope.row.profit}} ({{scope.row.profitRate}})</span>
                </template>
            </el-table-column>
                
            </el-table>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品介绍</h3>
          <!-- <el-table
            class="freTable"
            :data="dataForm.introductionList"
            v-loading="freightLoading"
            style="width: 100%">
            <el-table-column
                prop=""
                label="国家"
                width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.countryCode == 'ZH'" style="font-size:14px;color:#409EFF">中文</span>
                    <span v-if="scope.row.countryCode == 'GB'" style="font-size:14px;color:#409EFF">英语</span>
                    <span v-if="scope.row.countryCode == 'FR'" style="font-size:14px;color:#409EFF">法语</span>
                    <span v-if="scope.row.countryCode == 'IT'" style="font-size:14px;color:#409EFF">意大利语</span>
                    <span v-if="scope.row.countryCode == 'ES'" style="font-size:14px;color:#409EFF">西班牙语</span>
                    <span v-if="scope.row.countryCode == 'JP'" style="font-size:14px;color:#409EFF">日语</span>
                    <span v-if="scope.row.countryCode == 'DE'" style="font-size:14px;color:#409EFF">德语</span>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="产品标题"
                width="">
                <template slot-scope="scope">
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="scope.row.productTitle"
                    maxlength="30"
                    show-word-limit></el-input>
                    <div style="height:8px"></div>
                    <el-button v-if="scope.row.countryCode == 'ZH'" type="primary" size="small" plain>一键翻译</el-button>
                    <el-button v-if="scope.row.countryCode == 'GB'" type="primary" size="small" plain>一键翻译</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="关键字">
                <template slot-scope="scope">
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="scope.row.keyWord"
                    maxlength="30"
                    show-word-limit></el-input>
                    <div style="height:8px"></div>
                    <el-button v-if="scope.row.countryCode == 'ZH'" type="primary" size="small" plain>一键翻译</el-button>
                    <el-button v-if="scope.row.countryCode == 'GB'" type="primary" size="small" plain>一键翻译</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="重点说明"
                width="180">
                <template slot-scope="scope">
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="scope.row.keyPoints"
                    maxlength="30"
                    show-word-limit></el-input>
                    <div style="height:8px"></div>
                    <el-button v-if="scope.row.countryCode == 'ZH'" type="primary" size="small" plain>一键翻译</el-button>
                    <el-button v-if="scope.row.countryCode == 'GB'" type="primary" size="small" plain>一键翻译</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="产品描述">
                <template slot-scope="scope">
                    <el-input
                    type="textarea"
                    placeholder="请输入内容"
                    v-model="scope.row.optimization"
                    maxlength="30"
                    show-word-limit></el-input>
                    <div style="height:8px"></div>
                    <el-button v-if="scope.row.countryCode == 'ZH'" type="primary" size="small" plain>一键翻译</el-button>
                    <el-button v-if="scope.row.countryCode == 'GB'" type="primary" size="small" plain>一键翻译</el-button>
                    <el-button type="primary" size="small" plain>加粗</el-button>
                </template>
            </el-table-column>
          </el-table> -->

          <el-tabs type="border-card">
            <el-tab-pane label="中文">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].productTitle"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].keyWord"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].keyPoints"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].productDescription"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="英语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].productTitle"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].keyWord"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].keyPoints"
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain>一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].productDescription"
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
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
                        maxlength="30"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        
      </el-form>

    </div>
  </div>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  import PageH from '../../common/pageH'
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
        roleList: [],
        productId:null,
        discountList:[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
        freightLoading:false,
        dataForm: {
          productId: null,
          auditStatus:'',
          productType:'',
          productSku:'',
          freightCostList:[],
          introductionList:[{},{},{},{},{},{},{}],
          productTitle:'',
          property:{
              purchasePrice:0,
              domesticFreight:0
          },
          info:{}
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
          productCategory:[
            {required: true, message: '分类不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      PageH
    },
    activated(){
      this.init(this.$route.params.productId)
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
      init (id) {
        this.dataForm.productId = id || 0;
        this.productId = id || 0;
        if(this.productId){
            this.$http({
              url: this.$http.adornUrl('/product/product/productdetails'),
              method: 'get',
              params: this.$http.adornParams({
                  productId:this.productId
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm = data.product
              }
            })
        }else{
            this.$nextTick(() => {
                this.$refs['dataForm'].resetFields();
            })
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
              url: this.$http.adornUrl('/product/product/getproductid'),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data);
                this.dataForm = data.product;
                loading.close();
              }
            })
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
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
    //   运费改变
      getcostFreight(str){
          this.$refs['dataForm'].validateField(str,(valid) => {
              if(!valid){
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
                property:this.dataForm.property,
                freightCost:row
            })
        }).then(({data}) => {
            loading.close();
            if (data && data.code === 0) {
                console.log(data);
                row.profit = 10000;
                console.log
            } else {
                this.$message.error(data.msg)
            }
        })
    },
      deptChange(opt){
        this.dataForm.deptName = (this.$store.state.dept.comList.find(item => item.deptId == opt)).name;
        console.log(this.dataForm);
      }
    }
  }
</script>
<style>
  .el-form-item input{
    width :195px;
  }
</style>

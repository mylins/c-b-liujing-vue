<template>
  <div class="proLook">
    <!-- <page-h ref="back" :product="productId? false:true" :productId="dataForm.productId" :id="productId"></page-h> -->
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="产品编号" prop="">
            <span class="decVal">{{dataForm.productId}}</span>
            <!-- <el-button type="text">{{dataForm.productId}}</el-button> -->
          </el-form-item>
          <el-form-item label="审核状态" prop="">
            <span class="decVal" v-if="dataForm.auditStatus == '001'">审核通过</span>
            <span class="decVal" v-if="dataForm.auditStatus == '002'">待审核</span>
            <span class="decVal" v-if="dataForm.auditStatus == '003'">失效</span>
            <!-- <el-button type="text">{{dataForm.auditStatus == '002' ? '待审核' : ''}}</el-button> -->
          </el-form-item>
          <el-form-item label="产品类型" prop="">
            <span class="decVal" v-if="dataForm.productType == '001'">重点</span>
            <span class="decVal" v-if="dataForm.productType == '002'">原创</span>
            <span class="decVal" v-if="dataForm.productType == '003'">海外</span>
            <span class="decVal" v-if="dataForm.productType == '004'">采集</span>
            <span class="decVal" v-if="dataForm.productType == '005'">其他</span>
            <span class="decVal" v-if="dataForm.productType == '006'">产品库</span>
            <span class="decVal" v-if="dataForm.productType == '007'">认领</span>
            <!-- <el-button type="text">{{dataForm.productType == '002' ? '原创' : ''}}</el-button> -->
          </el-form-item>
          <el-form-item label="内部SKU" prop="productSku">
              <span class="decVal">{{dataForm.productSku}}</span>
            <!-- <el-button type="text">{{dataForm.productSku}}</el-button> -->
          </el-form-item>
          <el-form-item label="UPC/EAN" prop="productSku">
              <span class="decVal">{{dataForm.eanCode}}</span>
            <!-- <el-button type="text">{{dataForm.productSku}}</el-button> -->
          </el-form-item>
          <el-form-item label="产品分类" prop="">
              <span class="decVal">{{dataForm.categoryName}}</span>
              <!-- <el-button type="text">{{dataForm.categoryName}}</el-button> -->
          </el-form-item>
        </div>

        <div class="blockDivForm">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品相册</h3>
            <div style="margin-left:50px">
                <ul class="imgUl">
                    <li class="imgLi" v-for="item in dataForm.imageList" :key="item.imageId">
                        <el-image
                            style="width: 142px; height: 142px"
                            :preview-src-list="imgList"
                            :src="item.imageUrl"></el-image>
                    </li>
                </ul>
            </div>
        </div>
        <div class="blockDivForm" v-if="dataForm.info.sellerLink">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;商家信息</h3>
            <el-form-item label="商家信息">
                <a :href="dataForm.info.sellerLink" target="_blank">产品页</a>
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
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;成本运费</h3>
          <el-form-item label="采购价格(¥)" prop="property.purchasePrice" :rules="dataRule.purchasePrice">
              <span class="decVal">{{dataForm.property.purchasePrice ? dataForm.property.purchasePrice : '无'}}</span>
          </el-form-item>
          <el-form-item label="国内运费(¥)" prop="property.domesticFreight" :rules="dataRule.domesticFreight">
              <span class="decVal">{{dataForm.property.domesticFreight ? dataForm.property.domesticFreight : '无'}}</span>
          </el-form-item>
          <el-form-item label="包装毛重(kg)" prop="property.productWeight" :rules="dataRule.productWeight">
              <span class="decVal">{{dataForm.property.productWeight ? dataForm.property.productWeight : '无'}}</span>
          </el-form-item>
          <el-form-item label="包装尺寸" prop="" required>
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
            
          </el-form-item>
          <el-form-item label="产品打折" prop="productTitle">
              <span class="decVal">{{dataForm.property.discount ? dataForm.property.discount : '无'}}</span>
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
                    <span v-if="scope.row.countryCode == 'NL'" style="font-size:14px;color:#409EFF">荷兰</span>
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
                prop="finalPrice"
                label="最终售价"
                width="180">
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
          
          <el-tabs type="border-card">
            <el-tab-pane label="中文">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-input
                        :disabled="true"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].productTitle"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-input
                        :disabled="true"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].keyWord"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-input
                        :disabled="true"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].keyPoints"
                        show-word-limit></el-input>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-input
                        :disabled="true"
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
                    </label>
                    <div>
                        <el-input
                        :disabled="true"
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
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        :disabled="true"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[1].keyWord"
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
                        :disabled="true"
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
                    </label>
                    <div>
                        <el-input
                        type="textarea"
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
                        :disabled="true"
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
        <div class="blockDivForm">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;规格变体</h3>
            <div style="margin-left:5%">

                <div class="tag-group" v-for="(item,index) in dataForm.variantsParameterList" :key="index">
                    <span class="tag-group__title">{{item.paramsType}}</span>
                    <el-tag
                        v-for="m in item.paramsValue.split(',')"
                        :key="m"
                        effect="plain">
                        {{ m }}
                    </el-tag>
                </div>
            </div>
            
            <el-table
                class="freTable"
                :data="dataForm.variantsInfoList"
                style="width: 90%;margin-left:5%;margin-top:16px">
                <el-table-column
                    type="index"
                    width="40">
                </el-table-column>
                <el-table-column
                    prop="variantCombination"
                    label="变体组合"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="variantSku"
                    label="SKU修正"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="加价（¥）"
                    width="100">
                    <template slot-scope="scope">
                        <div style="display:flex">
                            <span>{{scope.row.variantAddPrice}}</span>
                            <!-- <el-input placeholder="请输入" size="small" v-model="scope.row.variantAddPrice"></el-input>&nbsp;&nbsp; -->
                            <el-button type="text" size="mini" icon="" @click="showSaleMoney(scope.row.variantAddPrice)">最终售价</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="variantStock"
                    label="库存"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="eanCode"
                    label="UPC／EAN"
                    width="120">
                </el-table-column>
                <!-- <el-table-column
                    prop=""
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button type="text" icon="" @click="selectImgClick(scope.$index)">选择图片</el-button>
                        <el-button type="text" icon="" @click="addImgVClick(scope.$index)">一键添加</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="delVList(scope.$index)"></el-button>
                    </template>
                </el-table-column> -->
                <el-table-column
                    prop=""
                    label="变体图片">
                    <template slot-scope="scope">
                        <div class="biantiDiv" v-if="scope.row.imageUrl != ''">
                            <div v-for="(item,index) in scope.row.imageUrl.split(',')" :key="index">
                                <!-- <span class="close"><el-button type="text" icon="el-icon-error" @click="delImageVB(scope.$index,index)"></el-button></span> -->
                                <el-image
                                    style="width: 50px; height: 50px"
                                    :src="item"></el-image>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                
            </el-table>

        </div>
        
      </el-form>
      <!-- 最终售价 -->
        <el-dialog
            title="最终售价（¥）"
            :visible.sync="saleMoneyVisible"
            width="800px">
            <div style="">
                <el-table
                class="freTable tableVi"
                :data="saleMoneyList">
                    <el-table-column
                        v-for="(item,index) in saleMoneyListH"
                        :key="index"
                        :prop="'price'+index"
                        :label="item">
                    </el-table-column>
                </el-table>
            </div>
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
        imgList:[],
        saleMoneyVisible:false,
        saleMoneyList:[],
        saleMoneyListH:[],
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
        discountList:[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
        recommend:['米色','黑色','蓝色','青铜','棕色','明确','铜','奶油','金','绿色','灰色','金属','多色','橙子','粉','紫色','红','银','白色','黄色','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
        recommendE:['Beige','Black','Blue','Bronze','Brown','Clear','Copper','Cream','Gold','Green','Grey','Metallic','Multi-colored','Orange','Pink','Purple','Red','Silver','White','Yellow','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
        recommend1:['均码','XS','S','M','L','XL','XXL','XXXL','XXXXL','XXXXXL'],
        recommend1E:['OneSize','XS','S','M','L','XL','XXL','XXXL','XXXXL','XXXXXL'],
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
        options:[],
        props:{
            lazy:true,
            // value:'label',
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
      }
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
                    return item.imageUrl
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
            if(this.productId){
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
        // 获取最终售价
        showSaleMoney(variantAddPrice){
            
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/product/product/queryMoney'),
                method: 'post',
                data: this.$http.adornData({
                    productId:this.dataForm.productId,
                    variantAddPrice:variantAddPrice
                })
            }).then(({data}) => {
                if (data && data.code === 0) {
                    this.saleMoneyList[0] = {};
                    this.saleMoneyListH = [];
                    var that = this;
                    data.priceList.forEach(function(item,index){
                        that.saleMoneyList[0]['price'+index] = item.price
                        that.saleMoneyListH.push(item.country)
                    })
                    this.saleMoneyVisible = true;
                    loading.close()
                } else {
                    this.$message.error(data.msg)
                }
            })
        }
    }
  }
</script>
<style>
  .proLook .el-form-item{
      margin-bottom: 10px;
  }
  .imgUl{
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap:wrap;
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
      flex-wrap: wrap;
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

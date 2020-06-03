<template>
  <div>
    <!-- <page-h ref="back" :product="productId? false:true" :productId="dataForm.productId" :id="productId"></page-h> -->
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
          <el-form-item label="产品分类" prop="">
              <el-button type="text">{{dataForm.categoryName}}</el-button>
          </el-form-item>
        </div>

        <div class="blockDivForm">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品相册</h3>
            <div style="margin-left:50px">
                <ul class="imgUl">
                    <li class="imgLi" v-for="item in dataForm.imageList" :key="item.imageId">
                        <el-image
                            style="width: 142px; height: 142px"
                            :src="'http://'+item.imageUrl"></el-image>
                    </li>
                </ul>
            </div>
        </div>

        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品信息</h3>
          <el-form-item label="厂商名称" prop="">
              <el-button type="text" :disabled="dataForm.info.producerName ? false : true">{{dataForm.info.producerName ? dataForm.info.producerName : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="品牌名称" prop="">
              <el-button type="text" :disabled="dataForm.info.brandName ? false : true">{{dataForm.info.brandName ? dataForm.info.brandName : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="厂商编号" prop="">
              <el-button type="text" :disabled="dataForm.info.manufacturerNumber ? false : true">{{dataForm.info.manufacturerNumber ? dataForm.info.manufacturerNumber : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="产品库存" prop="stock">
              <el-button type="text" :disabled="dataForm.info.stock ? false : true">{{dataForm.info.stock ? dataForm.info.stock : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="产品来源" prop="productSku">
              <el-button type="text" :disabled="dataForm.info.productSource ? false : true">{{dataForm.info.productSource ? dataForm.info.productSource : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="来源地址" prop="productTitle">
              <el-button type="text" :disabled="dataForm.info.sellerLink ? false : true">{{dataForm.info.sellerLink ? dataForm.info.sellerLink : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="附加备注" prop="stock">
              <el-button type="text" :disabled="dataForm.info.productRemark ? false : true">{{dataForm.info.productRemark ? dataForm.info.productRemark : '无'}}</el-button>
          </el-form-item>
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;成本运费</h3>
          <el-form-item label="采购价格(¥)" prop="property.purchasePrice" :rules="dataRule.purchasePrice">
              <el-button type="text" :disabled="dataForm.property.purchasePrice ? false : true">{{dataForm.property.purchasePrice ? dataForm.property.purchasePrice : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="国内运费(¥)" prop="property.domesticFreight" :rules="dataRule.domesticFreight">
              <el-button type="text" :disabled="dataForm.property.domesticFreight ? false : true">{{dataForm.property.domesticFreight ? dataForm.property.domesticFreight : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="包装毛重(kg)" prop="property.productWeight" :rules="dataRule.productWeight">
              <el-button type="text" :disabled="dataForm.property.productWeight ? false : true">{{dataForm.property.productWeight ? dataForm.property.productWeight : '无'}}</el-button>
          </el-form-item>
          <el-form-item label="包装尺寸" prop="" required>
              <el-col :span="6">
                  <el-form-item prop="property.productLength" :rules="dataRule.productLength">
                      <el-button type="text" :disabled="dataForm.property.productLength ? false : true">{{dataForm.property.productLength ? dataForm.property.productLength : '无'}}</el-button>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productWide" :rules="dataRule.productWide">
                      <el-button type="text" :disabled="dataForm.property.productWide ? false : true">{{dataForm.property.productWide ? dataForm.property.productWide : '无'}}</el-button>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                *
              </el-col>
              <el-col :span="6">
                  <el-form-item prop="property.productHeight" :rules="dataRule.productHeight">
                      <el-button type="text" :disabled="dataForm.property.productHeight ? false : true">{{dataForm.property.productHeight ? dataForm.property.productHeight : '无'}}</el-button>
                  </el-form-item>
              </el-col>
            
          </el-form-item>
          <br>
          <el-form-item label="产品打折" prop="productTitle">
              <el-button type="text" :disabled="dataForm.property.discount ? false : true">{{dataForm.property.discount ? dataForm.property.discount : '无'}}</el-button>
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
                    prop="variantAddPrice"
                    label="加价（¥）"
                    width="100">
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
                                    :src="'http://'+item"></el-image>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                
            </el-table>

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

    <!-- 单条变体弹框 -->
      <el-dialog
        title="添加单条变体"
        :visible.sync="addItemVVisible"
        width="500px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="3">
                    <label style="display:inline-block;line-height:36px">颜色</label>
                </el-col>
                <el-col :span="21">
                    <el-input
                        placeholder="请输入内容"
                        v-model="itemV.color"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:10px">
                <el-col :span="3">
                    <label style="display:inline-block;line-height:36px">尺寸</label>
                </el-col>
                <el-col :span="21">
                    <el-input
                        placeholder="请输入内容"
                        v-model="itemV.size"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addItemVVisible = false">取 消</el-button>
            <el-button type="primary" @click="addItemVClick">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 修改库存 -->
      <el-dialog
        title="修改库存"
        :visible.sync="stockVisible"
        width="500px">
        <div>
            <el-row style="margin-bottom:10px">
                <el-col :span="3">
                    <label style="display:inline-block;line-height:36px">库存</label>
                </el-col>
                <el-col :span="21">
                    <el-input
                        placeholder="请输入内容"
                        v-model="stock"
                        clearable>
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="stockVisible = false">取 消</el-button>
            <el-button type="primary" @click="stockClick">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 图片上传 -->
      <el-dialog
        title="上传图片"
        :visible.sync="uploadImageVisible"
        width="500px">
        <div>
            <el-upload
                class="upload-demo"
                drag
                :action="$http.adornUrl('/product/productimage/upload')"
                :data="{'productId':dataForm.productId}"
                :headers="{'token':$cookie.get('token')}"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="uploadImageVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="getImage">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 变体选择图片 -->
    <el-dialog
        title="选择变体图片"
        :visible.sync="selectImageVisible"
        width="800px">
        <div style="height:400px;overflow-y:auto">
            <el-checkbox-group size="medium" v-model="imgSVList" @change="checkGroup">
                <ul class="imgUl">
                    <li class="imgLi" v-for="item in dataForm.imageList" :key="item.imageId">
                        <span class="selec">
                            <el-checkbox :label="item.imageUrl"></el-checkbox>
                        </span>
                        <el-image
                        style="width: 142px; height: 142px"
                        :src="'http://'+item.imageUrl"></el-image>
                    </li>
                </ul>
            </el-checkbox-group>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="selectImageVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectImgOk">确 定</el-button>
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
        list:[
            {
                imageId:1,
                sort:0,
                imageUrl:'http://39.105.120.226/images/2020/5/10504785/1.jpg'
            },
            {
                imageId:2,
                sort:1,
                imageUrl:'http://39.105.120.226/images/2020/3/10444483/0.jpg'
            },
            {
                imageId:3,
                sort:2,
                imageUrl:'http://39.105.120.226/images/2020/3/10444450/0.jpg'
            }
        ],
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
                this.dataForm = data.product
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
                    'productId': this.dataForm.productId,
                })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataForm.imageList = data.imageInfo;
                    this.uploadImageVisible = false;
                } else {
                    
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
            
            console.log(this.dataForm.variantsInfoList[index].imageUrl);
        },
        // 删除变体选中图片
        delImageVB(num,index){
            this.$confirm('确定删除该图片?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var arr = this.dataForm.variantsInfoList[num].imageUrl.split(',');
                arr.splice(index,1)
                this.dataForm.variantsInfoList[num].imageUrl = arr.join(',');
            })
            
            
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

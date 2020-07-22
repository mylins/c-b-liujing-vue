<template>
  <div>
    <page-h ref="back" :product="productId? false:true" :productId="dataForm.productId" :id="productId"></page-h>
    <div class="subDivForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="goBack">返回</el-button>
        <el-button v-if="productId" type="danger" @click="delPro">删除</el-button>
        <el-button type="primary" @click="dataFormSubmit()">提交</el-button>
      </span>
    </div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息</h3>
          <el-form-item label="产品编号" prop="">
            <!-- <el-input :disabled="true" v-model="dataForm.productId" placeholder="产品编号"></el-input> -->
            <span class="decVal">{{dataForm.productId}}</span>
            <!-- <el-button type="text">{{dataForm.productId}}</el-button> -->
          </el-form-item>
          <br>
          <el-form-item v-if="!productId" label="审核状态" prop="">
              <span class="decVal">待审核</span>
            <!-- <el-button type="text">{{dataForm.auditStatus == '002' ? '待审核' : ''}}</el-button> -->
          </el-form-item>
          <el-form-item v-if="!productId" label="产品类型" prop="">
              <span class="decVal">原创</span>
            <!-- <el-button type="text">{{dataForm.productType == '002' ? '原创' : ''}}</el-button> -->
          </el-form-item>
          <el-form-item label="内部SKU" prop="productSku">
              <div style="display:inline-block">
                  <el-input v-model="dataForm.productSku" placeholder="SKU"></el-input>
              </div>
              
                <div style="display:inline-block;">
                    <el-input v-model="dataForm.correction" placeholder="SKU修正"></el-input>
                </div>
          </el-form-item>

          <el-form-item label="UPC/EAN" prop="productSku">
              <el-input v-model="dataForm.eanCode" placeholder="UPC/EAN"></el-input>
          </el-form-item>
          <el-form-item label="产品分类" prop="categoryId">
            <el-cascader ref="aaa" v-model="categoryIds" :options="options" :props="props" clearable @change="productCategorChange" @visible-change="visibleChange"></el-cascader>
            <!-- <br>
            <span class="decVal">{{dataForm.categoryName}}</span> -->
          </el-form-item>
          <br>
          <el-form-item v-if="productId" label="审核状态" prop="">
            <el-radio-group v-model="dataForm.auditStatus">
                <el-radio v-for="item in auditStatusList" :key="item.code" :label="item.code">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <br> -->
          <el-form-item v-if="productId" label="产品类型" prop="">
            <el-radio-group v-model="dataForm.productType">
                <el-radio v-for="item in productTypeList" :key="item.code" :label="item.code">{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="blockDivForm">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;产品相册</h3>
            <div style="margin-left:50px">
                <el-checkbox-group v-model="selectImageList">
                    <draggable 
                        v-model="dataForm.imageList"
                        tag="ul"
                        v-bind="dragOptions"
                        @start="isDragging = true"
                        @end="endImg"
                        @moved='moveImg'>
                        <transition-group type="transition" name="flip-list" class="imgUl">
                            <li class="imgLi" v-for="item in dataForm.imageList" :key="item.imageId">
                                <span class="selec">
                                    <el-checkbox :label="item.imageId"></el-checkbox>
                                </span>
                                <el-image
                                style="width: 152px; height: 152px"
                                :preview-src-list="imgList"
                                :src="item.imageUrl"></el-image>
                            </li>
                        </transition-group>
                    </draggable>
                </el-checkbox-group>
                <div style="height:10px"></div>
                <el-button type="primary" size="small" plain @click="allSelectxcImg">图片全选</el-button>
                <el-button type="primary" size="small" plain @click="uploadImageVisible = true">上传图片</el-button>
                <el-button type="primary" size="small" plain @click="downImg">图片下载</el-button>
                <el-button type="primary" size="small" plain @click="delImageList">图片删除</el-button>
                <div style="color:#F56C6C;margin-top:6px;font-size:13px">图片位置修改后，请点击 '保存相册' 按钮使其生效</div>
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
            <el-input v-model="dataForm.info.producerName" placeholder="厂商名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌名称" prop="">
            <el-input v-model="dataForm.info.brandName" placeholder="品牌名称"></el-input>
          </el-form-item>
          <el-form-item label="厂商编号" prop="">
            <el-input v-model="dataForm.info.manufacturerNumber" placeholder="厂商编号"></el-input>
          </el-form-item>
          <el-form-item label="产品库存" prop="">
            <el-input v-model="dataForm.stock" placeholder="产品库存"></el-input>
          </el-form-item>
          <el-form-item label="产品来源" prop="">
            <el-input v-model="dataForm.info.productSource" placeholder="产品来源"></el-input>
          </el-form-item>
          <br>
          <el-form-item label="来源地址" prop="">
            <el-input class="textIN" type="textarea" :rows="2" v-model="dataForm.info.sellerLink" placeholder="来源地址"></el-input>
          </el-form-item>
          <el-form-item label="附加备注" prop="">
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
          <el-form-item label="产品打折" prop="property.discount">
              <el-input v-model="dataForm.property.discount" placeholder="包装毛重(kg)" @change="getcostFreight('property.discount')"></el-input>
            <!-- <el-select v-model="dataForm.property.discount" placeholder="请选择" @change="getcostFreight('property.discount')">
                <el-option
                v-for="item in discountList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="包装尺寸" prop="" required>
              <el-col :span="4">
                  <el-form-item prop="property.productLength" :rules="dataRule.productLength">
                    <el-input v-model="dataForm.property.productLength" placeholder="长" @change="getcostFreight('property.productLength')"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="1">
                *
              </el-col>
              <el-col :span="4">
                  <el-form-item prop="property.productWide" :rules="dataRule.productWide">
                    <el-input v-model="dataForm.property.productWide" placeholder="宽" @change="getcostFreight('property.productWide')"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="1">
                *
              </el-col>
              <el-col :span="4">
                  <el-form-item prop="property.productHeight" :rules="dataRule.productHeight">
                    <el-input v-model="dataForm.property.productHeight" placeholder="高" @change="getcostFreight('property.productHeight')"></el-input>
                  </el-form-item>
              </el-col>
            
          </el-form-item>
          <!-- <br> -->
          
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
          
          <el-tabs type="border-card">
            <!-- <el-tab-pane label="中文">
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
                        :rows="4"
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
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="dataForm.introductionList[0].productDescription"
                        show-word-limit></el-input>
                    </div>
                </div>
            </el-tab-pane> -->
            <el-tab-pane v-for="(item,index) in dataForm.introductionList" :key="index" :label="comObj[item.countryCode]">
                <el-button v-if="index == 1" type="primary" size="mini" plain @click="fanyi2()">一键从英文翻译</el-button>
                <div style="height:10px"></div>
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button v-if="index == 1" type="primary" size="mini" plain @click="fanyi1(item.productTitle,0)">一键翻译</el-button>
                        <el-button v-if="index == 0" type="primary" size="mini" plain @click="fanyi(item.productTitle,0)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        v-if="index == 0"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="item.productTitle"
                        show-word-limit></el-input>
                        <el-form-item v-else label="">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="item.productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button v-if="index == 1" type="primary" size="mini" plain @click="fanyi1(item.keyWord,1)">一键翻译</el-button>
                        <el-button v-if="index == 0" type="primary" size="mini" plain @click="fanyi(item.keyWord,1)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        v-if="index == 0"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="item.keyWord"
                        show-word-limit></el-input>
                        <el-form-item v-else label="">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="item.keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button v-if="index == 0" type="primary" size="mini" plain @click="fanyi(item.keyPoints,2)">一键翻译</el-button>
                        <el-button v-if="index == 1" type="primary" size="mini" plain @click="fanyi1(item.keyPoints,2)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        v-if="index == 0"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="item.keyPoints"
                        show-word-limit></el-input>
                        <el-form-item v-else label="">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="4"
                            v-model="item.keyPoints"
                            maxlength="2500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button v-if="index == 0" type="primary" size="mini" plain @click="fanyi(item.productDescription,3)">一键翻译</el-button>
                        <el-button v-if="index == 1" type="primary" size="mini" plain @click="fanyi1(item.productDescription,3)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-input
                        v-if="index == 0"
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="item.productDescription"
                        show-word-limit></el-input>
                        <el-form-item v-else label="">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="4"
                            v-model="item.productDescription"
                            maxlength="2000"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="英语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi1(dataForm.introductionList[1].productTitle,0)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[1].productTitle" :rules="{max: 200,message: '英语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[1].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi1(dataForm.introductionList[1].keyWord,1)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[1].keyWord" :rules="{max: 250,message: '英语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[1].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi1(dataForm.introductionList[1].keyPoints,2)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[1].keyPoints" :rules="{max: 500,message: '英语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="4"
                            v-model="dataForm.introductionList[1].keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                        <el-button type="primary" size="mini" plain @click="fanyi1(dataForm.introductionList[1].productDescription,3)">一键翻译</el-button>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[1].productDescription" :rules="{max: 2000,message: '英语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="4"
                            v-model="dataForm.introductionList[1].productDescription"
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
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[2].productTitle" :rules="{max: 200,message: '法语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[2].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[2].keyWord" :rules="{max: 250,message: '法语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[2].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[2].keyPoints" :rules="{max: 500,message: '法语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[2].keyPoints"
                            maxlength="500"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[2].productDescription" :rules="{max: 2000,message: '法语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[2].productDescription"
                            maxlength="2000"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="意大利语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[3].productTitle" :rules="{max: 200,message: '意大利语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[3].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[3].keyWord" :rules="{max: 250,message: '意大利语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[3].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[3].keyPoints" :rules="{max: 500,message: '意大利语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="4"
                            v-model="dataForm.introductionList[3].keyPoints"
                            maxlength="500"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[3].productDescription" :rules="{max: 2000,message: '意大利语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            :rows="4"
                            v-model="dataForm.introductionList[3].productDescription"
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
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[4].productTitle" :rules="{max: 200,message: '西班牙语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[4].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[4].keyWord" :rules="{max: 250,message: '西班牙语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[4].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[4].keyPoints" :rules="{max: 500,message: '西班牙语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[4].keyPoints"
                            maxlength="500"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[4].productDescription" :rules="{max: 2000,message: '西班牙语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[4].productDescription"
                            maxlength="2000"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="德语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[5].productTitle" :rules="{max: 200,message: '德语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[5].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[5].keyWord" :rules="{max: 250,message: '德语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[5].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[5].keyPoints" :rules="{max: 500,message: '德语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[5].keyPoints"
                            maxlength="500"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[5].productDescription" :rules="{max: 200,message: '德语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[5].productDescription"
                            maxlength="2000"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="荷兰语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[6].productTitle" :rules="{max: 200,message: '荷兰语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[6].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                         <el-form-item label="" prop="introductionList[6].keyWord" :rules="{max: 250,message: '荷兰语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[6].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                         </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                         <el-form-item label="" prop="introductionList[6].keyPoints" :rules="{max: 500,message: '荷兰语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[6].keyPoints"
                            maxlength="500"
                            :rows="4"
                            show-word-limit></el-input>
                         </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[6].productDescription" :rules="{max: 2000,message: '荷兰语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[6].productDescription"
                            maxlength="2000"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="日语">
                <div class="intrDiv">
                    <label>
                        <span>产品标题</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[7].productTitle" :rules="{max: 200,message: '日语标题最多200个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[7].productTitle"
                            maxlength="200"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>关键字</span>  <br>
                    </label>
                    <div>
                         <el-form-item label="" prop="introductionList[7].keyWord" :rules="{max: 250,message: '日语关键字最多250个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[7].keyWord"
                            maxlength="250"
                            show-word-limit></el-input>
                         </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>重点说明</span>  <br>
                    </label>
                    <div>
                         <el-form-item label="" prop="introductionList[7].keyPoints" :rules="{max: 500,message: '日语重点说明最多500个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[7].keyPoints"
                            maxlength="500"
                            :rows="4"
                            show-word-limit></el-input>
                         </el-form-item>
                    </div>
                </div>
                <div class="intrDiv">
                    <label>
                        <span>产品描述</span>  <br>
                    </label>
                    <div>
                        <el-form-item label="" prop="introductionList[7].productDescription" :rules="{max: 2000,message: '日语产品描述最多2000个字',trigger: 'blur'}">
                            <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="dataForm.introductionList[7].productDescription"
                            maxlength="2000"
                            :rows="4"
                            show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-tab-pane> -->
            
          </el-tabs>
        </div>
        <div class="blockDivForm">
            <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;规格变体</h3>
            <div style="margin-left:5%">
                <el-button type="primary" plain v-if="dataForm.variantsParameterList.length < 2" @click="addVisible = true;addObj.type=null;addObj.value='';addObj.id=''">添加变体参数</el-button>

                <div class="tag-group" v-for="(item,index) in dataForm.variantsParameterList" :key="index">
                    <span class="tag-group__title">{{item.paramsType}}</span>
                    <el-tag
                        v-for="m in item.paramsValue.split(',')"
                        :key="m"
                        effect="plain">
                        {{ m }}
                    </el-tag>
                    <el-button type="text" icon="el-icon-edit" @click="editV(index)"></el-button>
                    <el-button type="text" icon="el-icon-delete" @click="del(index)"></el-button>
                </div>
                <div>
                    <el-button type="primary" size="small" plain v-if="dataForm.variantsInfoList.length != 0" @click="addVMoney">变体加价</el-button>
                    <el-button type="primary" size="small" plain v-if="dataForm.variantsInfoList.length != 0" @click="addItemVVisible = true">添加单条变体</el-button>
                    <el-button type="primary" size="small" plain v-if="dataForm.variantsInfoList.length != 0" @click="stockVisible = true">修改库存</el-button>
                </div>
            </div>
            
            <el-table
                class="freTable tableVi"
                :data="dataForm.variantsInfoList"
                style="width: 90%;margin-left:5%;margin-top:16px">
                <el-table-column
                    type="index"
                    width="40">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="变体组合"
                    width="180">
                    <template slot-scope="scope">
                        <el-button type="text" @click="syColorImg(scope.$index)">{{scope.row.variantCombination}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="SKU修正"
                    width="120">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入" size="small" v-model="scope.row.variantSku" @change="dataForm.viFlag = 1;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="加价（¥）"
                    width="120">
                    <template slot-scope="scope">
                        <div style="display:flex">
                            <el-input placeholder="请输入" size="small" v-model="scope.row.variantAddPrice" @change="dataForm.viFlag = 1;"></el-input>&nbsp;&nbsp;
                            <el-button type="text" size="mini" icon="" @click="showSaleMoney(scope.row.variantAddPrice)">最终售价</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="库存"
                    width="80">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入" size="small" v-model="scope.row.variantStock" @change="dataForm.viFlag = 1;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="UPC／EAN"
                    width="120">
                    <template slot-scope="scope">
                        <el-input placeholder="请输入" size="small" v-model="scope.row.eanCode" @change="dataForm.viFlag = 1;"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作"
                    width="180">
                    <template slot-scope="scope">
                        <el-button type="text" icon="" @click="selectImgClick(scope.$index)">选择图片</el-button>
                        <el-button type="text" icon="" @click="addImgVClick(scope.$index)">一键添加</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="delVList(scope.$index)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="变体图片">
                    <template slot-scope="scope">
                        <div class="biantiDiv" v-if="scope.row.imageUrl != ''">
                            <div v-for="(item,index) in scope.row.imageUrl.split(',')" :key="index">
                                <span class="close"><el-button type="text" icon="el-icon-error" @click="delImageVB(scope.$index,index)"></el-button></span>
                                <el-tooltip placement="top" effect="light">
                                    <div slot="content">
                                        <el-image
                                        style="width: 300px; height: 300px"
                                        :src="item"></el-image>
                                    </div>
                                        <el-image
                                        style="width: 50px; height: 50px"
                                        :src="item"></el-image>
                                </el-tooltip>
                                
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
                    <!-- :effect="(addObj.value.split(',').indexOf(recommendE[index]) == -1) ? '' : 'dark'" -->
                    <span 
                    v-for="(item,index) in recommend"
                    :key="item"
                    @click="pushValue(index)"
                    class="el-tag el-tag--medium" 
                    :style="(addObj.value.split(',').indexOf(recommendE[index]) != -1) ? {'background':'#409EFF','color':'#fff','border':'1px solid #409EFF'} : {'color':'#409EFF','background':'#fff','border':'1px solid #409EFF'}">
                    {{ item }}</span>
                    <!-- <el-tag
                        v-for="(item,index) in recommend"
                        @click="pushValue(index)"
                        :effect="(addObj.value.split(',').indexOf(recommendE[index]) == -1) ? '' : 'dark'"
                        :key="item">
                        {{ item }}
                    </el-tag> -->
                </template>
                <template v-if='addObj.type == "尺寸（sizeNam）"'>
                    <span 
                    v-for="(item,index) in recommend1"
                    :key="item"
                    @click="pushValue(index)"
                    class="el-tag el-tag--medium" 
                    :style="(addObj.value.split(',').indexOf(recommend1E[index]) != -1) ? {'background':'#409EFF','color':'#fff','border':'1px solid #409EFF'} : {'color':'#409EFF','background':'#fff','border':'1px solid #409EFF'}">
                    {{ item }}</span>
                    <!-- <el-tag
                        v-for="(item,index) in recommend1"
                        @click="pushValue(index)"
                        :effect="(addObj.value.split(',').indexOf(recommend1E[index]) == -1) ? '' : 'dark'"
                        :key="item">
                        {{ item }}
                    </el-tag> -->
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
        <div class="upDivDia">
            <el-upload
                class="upload-demo"
                drag
                ref="upload"
                :action="$http.adornUrl('/product/productimage/upload')"
                :data="{'productId':dataForm.productId}"
                :headers="{'token':$cookie.get('token')}"
                list-type="picture"
                :file-list="fileList"
                :on-success="upOk"
                :auto-upload="false"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>选择图片</em></div>
                <div class="el-upload__tip" slot="tip" style="display:flex">
                    <span style="flex:1;">只能上传jpg/png文件，且不超过500kb</span>

                    <el-button size="mini" type="primary" @click="submitUpload">开始上传</el-button>
                </div>
            </el-upload>
        </div>
        
    </el-dialog>

        <!-- 变体选择图片 -->
        <el-dialog
            title="选择变体图片"
            :visible.sync="selectImageVisible"
            width="800px">
            <div style="height:400px;overflow-y:auto">
                <el-checkbox-group size="medium" v-model="imgSVList">
                    <ul class="imgUl">
                        <li class="imgLi" v-for="item in dataForm.imageList" :key="item.imageId">
                            <span class="selec">
                                <el-checkbox :label="item.imageUrl"></el-checkbox>
                            </span>
                            <el-image
                            @click="selectImageClick(item.imageUrl)"
                            style="width: 142px; height: 142px"
                            :src="item.imageUrl"></el-image>
                        </li>
                    </ul>
                </el-checkbox-group>
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="selectImageVisible = false">取 消</el-button>
                <el-button type="primary" @click="selectImgOk">确 定</el-button>
            </span>
            
        </el-dialog>

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
        isDragging:false,
        saleMoneyVisible:false,
        saleMoneyList:[],
        saleMoneyListH:[],
        fileList:[],
        visible: false,
        categoryIds:null,
        imgSVList:[],
        auditStatusList:[],
        productTypeList:[],
        addVisible:false,
        addVMoneyVisible:false,
        addItemVVisible:false,
        stockVisible:false,
        uploadImageVisible:false,
        selectImageVisible:false,
        selectImageIndex:null,
        selectImageList:[],
        selectImageList1:[],
        stock:null,
        addVMoneyList:[],
        itemV:{color:'',size:''},
        roleList: [],
        imgList:[],
        productId:null,
        discountList:[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
        recommend:['米色','黑色','蓝色','青铜','棕色','明确','铜','奶油','金','绿色','灰色','金属','多色','橙子','粉','紫色','红','银','白色','黄色','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','A-C','A-F','A-L','A-I','A-O','A-Z'],
        recommendE:['Beige','Black','Blue','Bronze','Brown','Clear','Copper','Cream','Gold','Green','Grey','Metallic','Multi-colored','Orange','Pink','Purple','Red','Silver','White','Yellow','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','A-C','A-F','A-L','A-I','A-O','A-Z'],
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
          introductionList:[{},{},{},{},{},{},{},{}],
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
        addObj:{type:null,value:'',id:null},
        nowProTypeId:null,
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
                                        label:item.categoryName,
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
        },
        comObj:{
            'US':'美国',
            'JP':'日语',
            'ES':'西班牙语',
            'FR':'法语',
            'GB':'英语',
            'IT':'意大利语',
            'DE':'德语',
            'BR':'巴西',
            'CA':'加拿大',
            'MX':'墨西哥',
            'AU':'澳大利亚',
            'NL':'荷兰语',
            'ZH':'中文'
        }
      }
    },
    components: {
      PageH,draggable
    },
    created(){
        this.init(this.$route.params);
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
        // tabs, 删除tab
        removeTabHandle (tabName) {
            this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
            if (this.mainTabs.length >= 1) {
            // 当前选中tab被删除
            if (tabName === this.mainTabsActiveName) {
                var tab = this.mainTabs[this.mainTabs.length - 1]
                this.$router.push({ name: tab.name, query: tab.query, params: tab.params }, () => {
                this.mainTabsActiveName = this.$route.name
                })
            }
            } else {
            this.menuActiveName = ''
            this.$router.push({ name: 'home' })
            }
        },
        // 返回
        goBack(){
            this.$confirm('确定取消当前填写信息?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            console.log(this.product);
            if(!this.productId){
                this.$http({
                url: this.$http.adornUrl('/product/product/cancelOriginal'),
                method: 'get',
                params: this.$http.adornParams({
                    productId:this.dataForm.productId
                })
                }).then(({data}) => {
                if (data && data.code === 0) {
                    this.removeTabHandle(this.mainTabsActiveName)
                }
                })
                
            }else{
                this.removeTabHandle(this.mainTabsActiveName)
            }
            })
            
            
        },
        // 删除
        delPro(){
            this.$confirm('确定删除改产品?', {
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
                    url: this.$http.adornUrl('/product/product/falsedeletion'),
                    method: 'post',
                    data: this.$http.adornData([this.dataForm.productId], false)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.$refs.back.removeTabHandle(this.mainTabsActiveName);
                            loading.close()
                        }
                    })
                    } else {
                    this.$message.error(data.msg)
                    loading.close()
                    }
                })
            }).catch(() => {})
        },
        moveImg(newIndex,oldIndex,el) {
            // this.dataForm.imageList = this.dataForm.imageList.shunxu((a, b) => a.sort - b.sort);
            console.log(this.dataForm.imageList[newIndex]);
            console.log(this.dataForm.imageList[oldIndex]);
        },
        endImg(){
            this.isDragging = false;
            this.saveImageList();
            console.log('111')
        },
        init (obj) {
            console.log(obj);
            this.productId = obj.productId || 0;
            if(this.productId){
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
                    productId:this.productId
                })
                }).then(({data}) => {
                    loading.close();
                if (data && data.code === 0) {
                    this.dataForm = data.product;
                    this.imgList = this.dataForm.imageList.map((item) => {
                        return item.imageUrl
                    })
                    this.categoryIds = this.dataForm.categoryId;
                    console.log(this.categoryIds);
                    this.options = [{
                        value:this.dataForm.categoryId,
                        label:this.dataForm.categoryName,
                        leaf:true
                    }]
                }else{
                    this.$message.error(data.msg)
                }
                })
                this.dict('审核状态');
                this.dict('产品类型');
            }else{
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields();
                    this.dataForm = obj.obj;
                })
            }
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
                        this.options = [];
                        var that = this;
                        data.categoryOneList.forEach(function(item){
                            that.options.push({
                                value:item.categoryId,
                                label:item.categoryName,
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
            if(val.length == 3){
                var arr = this.$refs['aaa'].getCheckedNodes()[0].pathLabels;
                var arr1 = arr.map((item) => {
                    return item.split('(')[0]
                })
                this.dataForm.categoryName = arr1.join('/');
                this.dataForm.categoryId = val[val.length-1];
            }
            
        },
        // 表单提交
        dataFormSubmit () {
            this.$refs['dataForm'].validate((valid,pro) => {
            if (valid) {
                // this.dataForm.categoryId = this.dataForm.categoryId[this.dataForm.categoryId.length-1]
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
                                // console.log(this.$route)
                                // this.$refs.back.removeTabHandle(this.mainTabsActiveName);
                                loading.close();
                                var tab = this.$route
                                this.removeTabHandle(tab.name)
                                this.$nextTick(() => {
                                    this.$router.push({ name: tab.name, query: tab.query, params: {"productId":this.dataForm.productId,"auditStatus":this.dataForm.auditStatus} })
                                })
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
                console.log(pro);
                this.$message({
                        message: str,
                        type: 'warning'
                    });
            }
            })
        },
        //   运费改变
        getcostFreight(str){
            this.$refs['dataForm'].validateField(str,(valid) => {
                if(!valid){
                    //   this.dataForm.categoryId = this.dataForm.categoryId[this.dataForm.categoryId.length-1]
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
                    paramsValue:this.addObj.value,
                    paramsId:this.addObj.id,
                })
            }else if(this.dataForm.variantsParameterList.length == 1){
                if(this.dataForm.variantsParameterList[0].paramsType == this.addObj.type){
                    this.dataForm.variantsParameterList.splice(0,1);
                    this.dataForm.variantsParameterList.push({
                        paramsType:this.addObj.type,
                        paramsValue:this.addObj.value,
                        paramsId:this.addObj.id,
                    })
                    //   this.dataForm.variantsParameterList.type = this.addObj.value
                }else{
                    this.dataForm.variantsParameterList.push({
                            paramsType:this.addObj.type,
                            paramsValue:this.addObj.value,
                            paramsId:this.addObj.id,
                        })
                }
            }else{
                var that = this;
                this.dataForm.variantsParameterList.forEach(function(item,index){
                    if(item.paramsType == that.addObj.type){
                        that.dataForm.variantsParameterList.splice(index,1);
                        that.dataForm.variantsParameterList.push({
                            paramsType:that.addObj.type,
                            paramsValue:that.addObj.value,
                            paramsId:that.addObj.id,
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
            this.addObj.id = this.dataForm.variantsParameterList[index].paramsId;
        },
        //   删除变体
        del(index){
            this.$confirm('确定删除该变体属性?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.dataForm.variantsParameterList[index].paramsId){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http({
                        url: this.$http.adornUrl('/product/productvariantparameter/delete'),
                        method: 'post',
                        data: this.$http.adornData(this.dataForm.variantsParameterList[index])
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
            console.log(this.dataForm.variantsInfoList[index]);
            this.$confirm('确定删除该变体信息?', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.dataForm.variantsInfoList[index].variantId){
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                        });
                    this.$http({
                        url: this.$http.adornUrl('/product/productvariantsinfo/delete'),
                        method: 'post',
                        data: this.$http.adornData(this.dataForm.variantsInfoList[index])
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.dataForm.variantsInfoList.splice(index,1);
                                    loading.close()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                            loading.close()
                        }
                    })
                }else{
                    this.dataForm.variantsInfoList.splice(index,1);
                }
                
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
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.dataForm.introductionList = data.introductionList
                        }
                    })
                    
                    
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        fanyi1(text,num){
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
                    introductionList:this.dataForm.introductionList,
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
                            this.dataForm.introductionList = data.introductionList
                        }
                    })
                    
                    
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
                    'productId': this.dataForm.productId,
                })
            }).then(({data}) => {
                loading.close();
                if (data && data.code === 0) {
                    console.log(data);
                    this.dataForm.imageList = data.imageInfo;
                    this.imgList = this.dataForm.imageList.map((item) => {
                        return item.imageUrl
                    })
                    // this.uploadImageVisible = false;
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 保存相册
        saveImageList(){
            // var that=this;
            // console.log(this.dataForm.imageList)
            // this.$confirm('确定保存当前相册顺序?', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
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
                        // this.$message({
                        //     message: '操作成功',
                        //     type: 'success',
                        //     duration: 1000,
                        //     onClose: () => {
                        //         this.getImage();
                        //     }
                        // })
                        
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            // })
            
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
                    
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.selectImageList = [];
                                this.getImage();
                            }
                        })
                        
                    } else {
                        
                    }
                    loading.close();
                })
            })
            
        },
        // 全选图片
        allSelectxcImg(){
            this.selectImageList = [];
            var that = this;
            this.dataForm.imageList.forEach(function(item,index){
                that.selectImageList.push(item.imageId);
            })
        },
        // 下载图片
        downImg(){
            var arr = [];
            var that = this;
            this.selectImageList.forEach(function(item,index){
                that.dataForm.imageList.forEach(function(m){
                    if(m.imageId == item){
                        arr.push(m.imageUrl);
                    }
                })
            })
            // var i = 0;
            this.forFunc(0,arr)
            // arr.forEach(function(url){
            //     window.location.href = that.$http.adornUrl('/product/productimage/downloadImage?url='+url+'&token='+that.$cookie.get("token"));
            // })
            // window.location.href = this.$http.adornUrl('/product/productimage/downloadImage?url='+'http://rongyihui.obs.cn-north-4.myhuaweicloud.com/images/1/1/1/0c406a2b6281427094f3125fa54c8565..jpg?x-image-process=style/style-1000'+'&token='+this.$cookie.get("token"));
            
        },
        // 循环
        forFunc(i,arr){
            var that = this;
            if(i<arr.length){
                window.location.href = that.$http.adornUrl('/product/productimage/downloadImage?url='+arr[i]+'&token='+that.$cookie.get("token"));
                setTimeout(function() {
                    that.forFunc(i+1,arr);
                }, 1000)
            }
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
                        this.dataForm.viFlag = 1;
                    })
                }
                
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
        // 开始上传
        submitUpload(){
            this.$refs.upload.submit();
        },
        upOk(response, file, fileList){
            console.log(response);
            console.log(file);
            console.log(fileList);
            var that = this;
            if(response.code == 0){
                this.fileList = [];
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                
                setTimeout(() => {
                    that.uploadImageVisible = false;
                    that.getImage();
                    loading.close()
                },3000)
                // this.$nextTick(() => {
                //     this.getImage();
                // })
                
            }else{
                this.$message.error(response.msg)
            }
        },
        selectImageClick(url){
            var index = this.imgSVList.indexOf(url);
            if(index == -1){
                this.imgSVList.push(url)
            }else{
                this.imgSVList.splice(index,1);
            }
            
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
        },
        // 一键从英文翻译
        fanyi2(){
            console.log(this.dataForm.introductionList[1]);
            if(this.dataForm.introductionList[1].productTitle == '' || this.dataForm.introductionList[1].productDescription == '' || this.dataForm.introductionList[1].keyPoints == '' || this.dataForm.introductionList[1].keyWord == '' || JSON.stringify(this.dataForm.introductionList[1].productTitle) == 'null' || JSON.stringify(this.dataForm.introductionList[1].productDescription) == 'null' || JSON.stringify(this.dataForm.introductionList[1].keyPoints) == 'null' || JSON.stringify(this.dataForm.introductionList[1].keyWord) == 'null'){
                this.$message({
                    message: '请讲英文产品介绍都填写完成后再翻译',
                    type: 'warning'
                });
            }else{
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                this.$http({
                    url: this.$http.adornUrl('/product/productintroduction/allEntoOthers'),
                    method: 'post',
                    data: this.$http.adornData({
                        introduction:this.dataForm.introductionList[1],
                        introductionList:this.dataForm.introductionList,
                    })
                }).then(({data}) => {
                    loading.close();
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.dataForm.introductionList = data.introductionList
                            }
                        })
                        
                        
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }
            
        },
    }
  }
</script>
<style>
    
  .imgUl{
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
  }
  .imgUl .imgLi{
      list-style: none;
      width: 152px;
      margin: 3px;
      position: relative;
      overflow: hidden;
  }
  .imgUl .imgLi .selec{
      position: absolute;
      left: 6px;
      top: 6px;
  }
  .imgUl .imgLi .down{
      position: absolute;
      top: -30px;
      left: 0;
      height: 30px;
      width: 100%;
      background: rgba(0, 0, 0, .1);
      z-index: 1;
      text-align: right;
  }
  .imgUl .imgLi .down i{
      cursor: pointer;
  }
  .imgUl .imgLi:hover .down{
      top: 0;
      transition:top 1s;
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
  .intrDiv .el-form-item , .intrDiv .el-form-item .el-form-item__content{
      width: 100%;
  }
  .tableVi .el-input__inner{
      padding: 0 4px;
  }
  .el-dialog__body .el-upload--picture , .el-dialog__body .el-upload--picture .el-upload-dragger{
      width: 100%;
  }
  .upDivDia .el-upload-list__item{
      display: inline-block;
      margin-right: 6px;
      width: 70px;
      padding: 10px 10px 10px 80px;
  }
  .upDivDia .el-upload-list--picture .el-upload-list__item-thumbnail{
      margin-left:-70px
  }
  .upDivDia .el-upload-list__item .el-icon-close{
      top: 0px;
      right: 0px;
  }
  .upDivDia .el-upload-list--picture .el-upload-list__item-status-label{
      z-index: 1;
  }
</style>

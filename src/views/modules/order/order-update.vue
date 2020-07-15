<template>
  <div>
    <div class="conDivForm">
      <el-form :inline="true" :model="dataForm" :rules="dataRule" ref="dataForm" label-width="120px">
        <div class="blockDivForm">
          <h3> 
              <i class="el-icon-menu"></i> &nbsp;&nbsp;基本信息&nbsp;&nbsp;
              <el-button v-if="dataForm.orderState == '国际已发货' && dataForm.abnormalState != '国内物流异常' && dataForm.abnormalState != '国际物流异常'" type="primary" icon="" size="small" plain @click="okClick">已完成</el-button>&nbsp;&nbsp;
              <el-button v-if="dataForm.abnormalState == '国内物流异常' && dataForm.abnormalState == '国际物流异常'" type="primary" icon="" size="small" plain @click="shipAddressVi = true">已处理</el-button>
          </h3>
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
          <h3> 
              <i class="el-icon-menu"></i> &nbsp;&nbsp;产品信息
          </h3>
          <div v-for="item in dataForm.orderProductList" :key="item.productId">
              <div class="proDiv">
                  <div class="img" style="width:120px">
                      <el-image
                        style="width: 110px; height: 110px"
                        :src="item.productImageUrl"></el-image>
                  </div>
                  <div class="con">
                      <div style="color:#666;margin-bottom:10px"><el-link :href="item.amazonProductUrl" target="_blank">{{item.productTitle}}</el-link></div>
                      <el-row :gutter="20">
                          <el-col :span="9">
                              <span style="color:#999">SKU：</span>
                              <open-tab v-if="item.productId" :isMore="true" size="medium" type="text" icon="" :dec='item.productSku' urlName='productAddUpdate' :opt='{"productId":item.productId}'></open-tab>
                              <span style="color:#666" v-else>{{item.productSku}}</span>
                          </el-col>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <el-col :span="9">
                              <span style="color:#999">ASIN：</span>
                              <span style="color:#666">{{item.productAsin}}</span>
                          </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="9">
                              <span style="color:#999">数量：</span>
                              <span style="color:#666">{{item.orderItemNumber}}</span>
                          </el-col>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <el-col :span="9">
                              <span style="color:#999">金额：</span>
                              <span style="color:#666">{{item.productPrice}}</span>
                          </el-col>
                      </el-row>
                  </div>
              </div>
              <div class="domDiv">
                <h4> 
                    <i class="el-icon-truck"></i> &nbsp;&nbsp;物流信息&nbsp;&nbsp;
                    <el-button type="primary" icon="" size="small" plain @click="wuliuobj = item.domesticLogistics;wuliuObjVi = true">采购物流编辑</el-button>&nbsp;&nbsp;
                    <el-button type="primary" icon="" size="small" plain @click="wuliuobj = item.domesticLogisticsReissue;wuliuObjVi = true">补发物流编辑</el-button>
                </h4>
                <div class="con">
                    <el-form-item label="采购价(￥)" prop="">
                        <span class="decVal">{{item.domesticLogistics.price ? item.domesticLogistics.price : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="物流单号" prop="">
                        <span class="decVal">{{item.domesticLogistics.waybill ? item.domesticLogistics.waybill : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="物流公司" prop="">
                        <span class="decVal">{{item.domesticLogistics.logisticsCompany ? item.domesticLogistics.logisticsCompany : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="发货日期" prop="">
                        <span class="decVal">{{item.domesticLogistics.issuanceDate ? item.domesticLogistics.issuanceDate : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="尺寸" prop="">
                        <span class="decVal">{{item.domesticLogistics.size ? item.domesticLogistics.size : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="颜色" prop="">
                        <span class="decVal">{{item.domesticLogistics.color ? item.domesticLogistics.color : '无'}}</span>
                    </el-form-item>
                </div>
                <div class="con">
                    <el-form-item label="采购价(￥)" prop="">
                        <span class="decVal">{{item.domesticLogisticsReissue.price ? item.domesticLogisticsReissue.price : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="物流单号" prop="">
                        <span class="decVal">{{item.domesticLogisticsReissue.waybill ? item.domesticLogisticsReissue.waybill : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="物流公司" prop="">
                        <span class="decVal">{{item.domesticLogisticsReissue.logisticsCompany ? item.domesticLogisticsReissue.logisticsCompany : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="更新日期" prop="">
                        <span class="decVal">{{item.domesticLogisticsReissue.issuanceDate ? item.domesticLogisticsReissue.issuanceDate : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="尺寸" prop="">
                        <span class="decVal">{{item.domesticLogisticsReissue.size ? item.domesticLogisticsReissue.size : '无'}}</span>
                    </el-form-item>
                    <el-form-item label="颜色" prop="">
                        <span class="decVal">{{item.domesticLogisticsReissue.color ? item.domesticLogisticsReissue.color : '无'}}</span>
                    </el-form-item>
                </div>
              </div>
              

          </div>
          
          
        </div>

        <div class="blockDivForm">
          <h3> 
              <i class="el-icon-menu"></i> &nbsp;&nbsp;寄件信息&nbsp;&nbsp;
              <el-button type="primary" icon="" size="small" plain @click="shipAddressVi = true">编辑</el-button>
          </h3>
          <el-form-item label="收件人" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipName ? dataForm.shipAddress.shipName : '无'}}</span>
          </el-form-item>
          <el-form-item label="Tel" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipTel ? dataForm.shipAddress.shipTel : '无'}}</span>
          </el-form-item>
          <el-form-item label="收件人国家" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipCountry ? dataForm.shipAddress.shipCountry : '无'}}</span>
          </el-form-item>
          <el-form-item label="收件人国家(中文)" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipCountryName ? dataForm.shipAddress.shipCountryName : '无'}}</span>
          </el-form-item>
          <el-form-item label="ZIP" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipZip ? dataForm.shipAddress.shipZip : '无'}}</span>
          </el-form-item>
          <el-form-item label="州" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipRegion ? dataForm.shipAddress.shipRegion : '无'}}</span>
          </el-form-item>
          <el-form-item label="市" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipCity ? dataForm.shipAddress.shipCity : '无'}}</span>
          </el-form-item>
          <el-form-item label="街道" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipAddressLine1 ? dataForm.shipAddress.shipAddressLine1 : '无'}}</span>
          </el-form-item>
          <el-form-item label="详细地址" prop="">
              <span class="decVal">{{dataForm.shipAddress.shipAddressDetail ? dataForm.shipAddress.shipAddressDetail : '无'}}</span>
          </el-form-item>
          
        </div>
        <div class="blockDivForm">
          <h3> <i class="el-icon-menu"></i> &nbsp;&nbsp;国际物流&nbsp;&nbsp; <el-button type="primary" icon="" size="small" plain @click="abroadLogisticsListVi = true;wuliuDetails.abroadLogisticsId = ''">添加</el-button></h3>
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
            <el-table-column
                prop=""
                label="操作"
                width="">
                <template slot-scope="scope">
                    <template v-if="scope.row.isSynchronization == 0">
                        <el-button v-if="scope.row.orderState == '虚发货' || scope.row.orderState == '仓库已入库' || scope.row.orderState == '国际已发货'" type="text" icon="el-icon-bottom" size="small" @click="tongbu(scope.row.abroadLogisticsId)">同步</el-button>
                    </template>
                    <el-button type="text" icon="el-icon-bottom" size="small" @click="dayin(scope.row.abroadLogisticsId)">打印</el-button>
                    <el-button type="text" icon="el-icon-bottom" size="small" @click="mingxi(scope.row)">明细</el-button>
                    <el-button v-if="scope.row.isDeleted == 0" type="text" icon="el-icon-bottom" size="small" @click="zuof(scope.row.abroadLogisticsId)">作废</el-button>
                </template>
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
                prop="orderMoney"
                :label="'订单金额('+dataForm.momentRate+')'"
                width="">
            </el-table-column>
            <el-table-column
                prop="amazonCommission"
                label="Amazon佣金"
                width="">
            </el-table-column>
            <el-table-column
                prop="accountMoney"
                label="到账金额"
                width="">
            </el-table-column>
            <el-table-column
                prop="purchasePrice"
                label="采购价"
                width="">
            </el-table-column>
            <el-table-column
                prop="interFreight"
                label="国际运费"
                width="">
            </el-table-column>
            <el-table-column
                prop="platformCommissions"
                label="平台佣金"
                width="">
            </el-table-column>
            <el-table-column
                prop="returnCost"
                label="退货费用"
                width="">
            </el-table-column>
            <el-table-column
                prop="orderProfit"
                label="利润"
                width="">
            </el-table-column>
            <el-table-column
                prop="profitRate"
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
        <div class="remakDiv">
            <el-form :model="remarkObj" :rules="remarkObjRule" status-icon ref="remarkObjForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="备注类型" prop="type">
                    <el-select v-model="remarkObj.type" placeholder="请选择">
                        <el-option
                        v-for="item in remarkList"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注内容" prop="con">
                    <el-input type="textarea" v-model="remarkObj.con"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="remarkVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRemark">确 定</el-button>
        </span>
      </el-dialog>
        <!-- 编辑寄件信息 -->
        <el-dialog
            title="寄件信息编辑"
            :visible.sync="shipAddressVi"
            width="600px">
            <div>
                <el-form :model="shipAddressObj" status-icon ref="shipAddressObjForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="收件人" prop="">
                        <el-input v-model="shipAddressObj.shipName" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="TEL" prop="">
                        <el-input v-model="shipAddressObj.shipTel" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="收件人国家" prop="">
                        <el-input v-model="shipAddressObj.shipCountry" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="收件人国家(中文)" prop="">
                        <el-input v-model="shipAddressObj.shipCountryName" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="ZIP" prop="">
                        <el-input v-model="shipAddressObj.shipZip" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="州" prop="">
                        <el-input v-model="shipAddressObj.shipRegion" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="市" prop="">
                        <el-input v-model="shipAddressObj.shipCity" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="街道" prop="">
                        <el-input v-model="shipAddressObj.shipAddressLine1" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="">
                        <el-input type="textarea" v-model="shipAddressObj.shipAddressDetail"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="shipAddressVi = false">取 消</el-button>
                <el-button type="primary" @click="shipAddressClick">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加国际物流 -->
        <el-dialog
            title="添加国际物流"
            :visible.sync="abroadLogisticsListVi"
            width="1000px">
            <div>
                <template v-if="!wuliuDetails.abroadLogisticsId">
                    <div class="proDiv" style="margint-bottom:16px" v-for="item in dataForm.orderProductList" :key="item.productId">
                        <div class="img">
                            <el-image
                            style="width: 110px; height: 110px"
                            :src="item.productImageUrl"></el-image>
                        </div>
                        <div class="con">
                            <div style="color:#666;margin-bottom:16px">{{item.productTitle}}</div>
                            <el-row :gutter="20">
                                <el-col :span="9">
                                    <span style="color:#999">SKU：</span>
                                    <open-tab v-if="item.productId" :isMore="true" size="medium" type="text" icon="" :dec='item.productSku' urlName='productAddUpdate' :opt='{"productId":item.productId}'></open-tab>
                                    <span style="color:#666" v-else>{{item.productSku}}</span>
                                </el-col>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <el-col :span="9">
                                    <span style="color:#999">数量：</span>
                                    <span style="color:#666">{{item.orderItemNumber}}</span>
                                </el-col>
                            </el-row>
                            <!-- <el-row :gutter="20">
                                <el-col :span="10">
                                    <span style="color:#999">运输数量：</span>
                                    <el-input-number v-model="num" :min="1" :max="item.orderItemNumber" label="描述文字"></el-input-number>
                                </el-col>
                            </el-row> -->

                        </div>
                    </div>
                </template>
                
                <el-form :inline="true" :model="wuliuDetails" :rules="dataRule" status-icon ref="wuliuDetailsForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="中文" prop="chineseName">
                        <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.chineseName}}</span>
                        <el-input v-else v-model="wuliuDetails.chineseName" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="英文" prop="englishName">
                        <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.englishName}}</span>
                        <el-input v-else v-model="wuliuDetails.englishName" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="重量" prop="weight">
                        <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.weight}}</span>
                        <el-input v-else v-model="wuliuDetails.weight" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item label="体积" prop="" required>
                        <el-col :span="6">
                            <el-form-item prop="length">
                                <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.length}}</span>
                                <el-input v-else v-model="wuliuDetails.length" placeholder="请输入内容" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1" style="text-align:center">
                            *
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="width">
                                <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.width}}</span>
                                <el-input v-else v-model="wuliuDetails.width" placeholder="请输入内容" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1" style="text-align:center">
                            *
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="height">
                                <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.height}}</span>
                                <el-input v-else v-model="wuliuDetails.height" placeholder="请输入内容" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <br>
                    <el-form-item label="物流" prop="wuliuType">
                        <el-col :span="10">
                            <el-form-item label="" prop="wuliuType">
                                <el-select v-model="wuliuDetails.wuliuType" filterable placeholder="请选择" :disabled="wuliuDetails.abroadLogisticsId ? true : false">
                                    <el-option
                                            key="0"
                                            label="云途小包"
                                            value="0">
                                    </el-option>
                                    <el-option
                                            key="1"
                                            label="三态大包"
                                            value="1">
                                    </el-option>
                                    <!-- <el-option
                                            key="2"
                                            label="燕文物流"
                                            value="2">
                                    </el-option>
                                    <el-option
                                            key="3"
                                            label="德邦物流"
                                            value="3">
                                    </el-option> -->
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">
                            <div style="height:10px"> </div>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="" prop="xianlu">
                                <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.channelName}}</span>
                                <el-select v-else v-model="wuliuDetails.xianlu" filterable placeholder="请选择" @focus="getWuliuXianl">
                                    <el-option
                                            v-for="item in guojilogistics"
                                            :key="item.channelId"
                                            :label="item.channelName"
                                            :value="item.channelId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="wuliuDetails.wuliuType == 1 || wuliuDetails.wuliuType == 2" label="海关编码" prop="itemCodeId">
                        <span v-if="wuliuDetails.abroadLogisticsId" class="decVal">{{wuliuDetails.itemCode}} {{wuliuDetails.itemCnMaterial}}</span>
                        <el-select v-else v-model="wuliuDetails.itemCodeId" filterable placeholder="请选择" @focus="getHGBM" @change="changeHG">
                            <el-option
                                    v-for="item in itemCodelist"
                                    :key="item.itemCodeId"
                                    :label="item.itemCode+item.itemCnMaterial"
                                    :value="item.itemCodeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-button type="primary" icon="" size="small" plain @click="createdNum">生产运单号</el-button>
                    <br>
                    <el-form-item v-if="wuliuDetails.wuliuType == 1" label="门牌号" prop="">
                        <el-input v-model="wuliuDetails.doorNumber" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="运单号" prop="">
                        <el-input v-model="wuliuDetails.addyundanhao" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="追踪号" prop="">
                        <el-input v-model="wuliuDetails.addzhuizonghao" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
                <!-- <span slot="footer" class="dialog-footer">
                    <el-button @click="abroadLogisticsListVi = false">确 定</el-button>
                </span> -->
            </div>
        </el-dialog>  
        

        <!-- 国内物流编辑  -->
        <el-dialog
            title="寄件信息编辑"
            :visible.sync="wuliuObjVi"
            width="600px">
            <div>
                <el-form :model="shipAddressObj" status-icon ref="shipAddressObjForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="采购价（¥）" prop="">
                        <el-input v-model="wuliuobj.price" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="物流单号" prop="">
                        <el-input v-model="wuliuobj.waybill" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="物流公司" prop="">
                        <el-input v-model="wuliuobj.logisticsCompany" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="尺寸" prop="">
                        <el-input v-model="wuliuobj.size" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="颜色" prop="">
                        <el-input v-model="wuliuobj.color" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="发货日期" prop="">
                        <el-input v-model="wuliuobj.issuanceDate" placeholder="请输入内容" clearable></el-input>
                    </el-form-item> -->
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="wuliuObjVi = false">取 消</el-button>
                <el-button type="primary" @click="wuliuObjViClick">确 定</el-button>
            </span>
        </el-dialog>
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
        shipAddressVi:false,
        abroadLogisticsListVi:false,
        shipAddressObj:{},
        orderObj:[{},{}],
        stock:null,
        addVMoneyList:[],
        itemV:{color:'',size:''},
        roleList: [],
        productId:null,
        discountList:[1,0.9,0.8,0.7,0.6,0.5,0.4,0.3,0.2,0.1],
        freightLoading:false,
        wuliuDetails:{
            abroadLogisticsId:'',
            chineseName:'',
            englishName:'',
            weight:'',
            length:'',
            width:'',
            height:'',
            doorNumber:'',
            addyundanhao:'',
            addzhuizonghao:'',
            itemCodeId:'',
            xianlu:'',
            wuliuType:'',
            itemCodeId:''
        },
        wuliuobj:{},
        wuliuObjVi:false,
        wuliuType:'',
        xianlu:'',
        guojilogistics:[],
        itemCodelist:[],
        dataForm: {
          orderId:'',
          shopName:'',
          orderNumber:'',
          purchasePrice:'',
          orderState:'',
          amazonOrderId:'',
          buyDate:'',
          remarkList:[],
          abroadLogisticsList:[],
          info:{},
          shipAddress:{},
          orderProductList:[]
        },
        addObj:{type:null,value:''},
        nowProTypeId:[],
        
        dataRule: {
            chineseName: [
                { required: true, message: '中文不能为空', trigger: 'blur' }
            ],
            englishName: [
                { required: true, message: '英文不能为空', trigger: 'blur' }
            ],
            weight: [
                { required: true, message: '重量不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            width: [
                { required: true, message: '宽不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            length: [
                { required: true, message: '长不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            height: [
                { required: true, message: '高不能为空', trigger: 'blur' },
                { validator: number, trigger: 'blur' }
            ],
            wuliuType:[
                {required: true, message: '不能为空', trigger: 'change' }
            ],
            xianlu:[
                {required: true, message: '不能为空', trigger: 'change' }
            ],
            itemCodeId:[
                {required: true, message: '不能为空', trigger: 'change' }
            ],
        },
        remarkObjRule:{
            type:[
                {required: true, message: '请选择备注类型', trigger: 'change' }
            ],
            con:[
                {required: true, message: '请填写备注内容', trigger: 'blur' }
            ]
        }
      }
    },
    created(){
        this.dataForm.orderId = this.$route.params.orderId;
        this.init()
    },
    methods: {
        init () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http({
                url: this.$http.adornUrl('/order/order/getOrderInfo'),
                method: 'get',
                params: this.$http.adornParams({
                    orderId:this.dataForm.orderId
                })
            }).then(({data}) => {
                loading.close()
                if (data && data.code === 0) {
                    this.dataForm = data.orderDTO;
                    
                    if(!this.dataForm.shipAddress){
                        this.dataForm.shipAddress = {};
                    }
                    this.shipAddressObj = JSON.parse(JSON.stringify(this.dataForm.shipAddress))
                    this.orderObj[0].type = '国际币种';
                    this.orderObj[1].type = '人民币';
                    this.orderObj[0].amazonCommission = this.dataForm.amazonCommissionForeign;
                    this.orderObj[1].amazonCommission = this.dataForm.amazonCommission;
                    this.orderObj[0].orderMoney = this.dataForm.orderMoneyForeign;
                    this.orderObj[1].orderMoney = this.dataForm.orderMoney;
                    this.orderObj[0].accountMoney = this.dataForm.accountMoneyForeign;
                    this.orderObj[1].accountMoney = this.dataForm.accountMoney;
                    this.orderObj[0].purchasePrice = '--';
                    this.orderObj[1].purchasePrice = this.dataForm.purchasePrice;
                    this.orderObj[0].interFreight = '--';
                    this.orderObj[1].interFreight = this.dataForm.interFreight;
                    this.orderObj[0].platformCommissions = '--';
                    this.orderObj[1].platformCommissions = this.dataForm.platformCommissions;
                    this.orderObj[0].returnCost = '--';
                    this.orderObj[1].returnCost = this.dataForm.returnCost;
                    this.orderObj[0].orderProfit = '--';
                    this.orderObj[1].orderProfit = this.dataForm.orderProfit;
                    this.orderObj[0].profitRate = '--';
                    this.orderObj[1].profitRate = this.dataForm.profitRate;
                }else{
                    this.$message.error(data.msg)
                }
            })
        },
        checkGroup(val){
            console.log(val)
        },
        // 表单提交
        dataFormSubmit () {
            this.$refs['dataForm'].validate((valid) => {
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
            this.$refs['remarkObjForm'].validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http({
                        url: this.$http.adornUrl('/order/orderremark/saveNew'),
                        method: 'post',
                        data: this.$http.adornData({
                            orderId:this.dataForm.orderId,
                            remark:this.remarkObj.con,
                            remarkType:this.remarkObj.type
                        })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    loading.close();
                                    this.init();
                                    // this.$nextTick(() => {
                                    //     this.$refs['wuliuDetailsForm'].resetFields();
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
        // 编辑寄件信息
        shipAddressClick(){
            this.$confirm('确定修改寄件信息?', {
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
                    url: this.$http.adornUrl('/order/ordershipaddress/update'),
                    method: 'post',
                    data: this.$http.adornData(this.shipAddressObj)
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.dataForm.shipAddress = this.shipAddressObj;
                            this.shipAddressVi = false;
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
        // 获取物流线路
        getWuliuXianl(){
            if(this.wuliuDetails.wuliuType){
                this.$http({
                    url: this.$http.adornUrl('/order/order/getShippingMethodCode'),
                    method: 'get',
                    params: this.$http.adornParams({
                        type:this.wuliuDetails.wuliuType
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        this.guojilogistics = data.channelilist;
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }else{
                this.$message({
                    message: '请选择物流类型',
                    type: 'warning'
                });
            }
            
        },
        // 获取海关编码
        getHGBM(){
            this.$http({
                url: this.$http.adornUrl('/order/order/getItemCode'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    this.itemCodelist = data.itemCodelist;
                } else {
                    this.$message.error(data.msg)
                }
            })
        },
        // 海关编码改变
        changeHG(val){
            var obj = this.itemCodelist.find(item => item.itemCodeId == val);
            this.wuliuDetails.chineseName = obj.itemCnMaterial;
            this.wuliuDetails.englishName = obj.itemEnMaterial;
        },
        // 生成运单号
        createdNum(){
            this.$refs['wuliuDetailsForm'].validate((valid) => {
                if (valid) {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$http({
                        url: this.$http.adornUrl('/order/order/createAbroadWaybill'),
                        method: 'post',
                        data: this.$http.adornData({
                            orderId:this.dataForm.orderId,
                            orderItemRelationList:this.dataForm.orderProductList,
                            amazonOrderId:'',
                            packageType:parseInt(this.wuliuDetails.wuliuType),
                            channelId:this.wuliuDetails.xianlu,
                            doorNumber:this.wuliuDetails.doorNumber,
                            chineseName:this.wuliuDetails.chineseName,
                            englishName:this.wuliuDetails.englishName,
                            length:this.wuliuDetails.length,
                            width:this.wuliuDetails.width,
                            height:this.wuliuDetails.height,
                            weight:this.wuliuDetails.weight
                        })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    loading.close();
                                    // this.$nextTick(() => {
                                    //     this.$refs['wuliuDetailsForm'].resetFields();
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
        // 已完成
        okClick(){
            this.$confirm('确定该订单已完成?', {
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
                    url: this.$http.adornUrl('/order/order/updateState'),
                    method: 'post',
                    data: this.$http.adornData({
                        orderId:this.dataForm.orderId,
                        orderState:'已完成'
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.init();
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
        // 已处理
        okClick(){
            this.$confirm('确定该订单已处理?', {
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
                    url: this.$http.adornUrl('/order/order/updateOrderAbnormalState'),
                    method: 'get',
                    params: this.$http.adornParams({
                        orderId:this.dataForm.orderId
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.init();
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
        // 打印
        dayin(id){
            let obj = this.dataForm.abroadLogisticsList.find(item => item.abroadLogisticsId == id)
            if(obj.printUrl){
                window.open(obj.printUrl)
            }else{
                this.$http({
                    url: this.$http.adornUrl('/order/order/printLogisticAbroad'),
                    method: 'get',
                    params: this.$http.adornParams({
                        abroadLogisticsId:id
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                window.open(data.url)
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }

        },
        // 作废
        zuof(id){
            this.$confirm('确定作废该物流?', {
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
                    url: this.$http.adornUrl('/order/order/deleteLogisticAbroad'),
                    method: 'get',
                    params: this.$http.adornParams({
                        abroadLogisticsId:id
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.init();
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
        // 明细
        mingxi(row){
            this.wuliuDetails = row;
        },
        // 同步
        tongbu(id){
            this.$confirm('确定同步该运单?', {
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
                    url: this.$http.adornUrl('/order/order/synchronization'),
                    method: 'get',
                    params: this.$http.adornParams({
                        abroadLogisticsId:id,
                        orderId:this.dataForm.orderId
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.init();
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
        // 国内物流编辑
        wuliuObjViUp(obj){
            this.wuliuobj = {
                color: obj.color,
                createTime: obj.createTime,
                domesticLogisticsId: obj.domesticLogisticsId,
                isReissue: obj.isReissue,
                issuanceDate: obj.issuanceDate,
                itemId: obj.itemId,
                logisticsCompany: obj.logisticsCompany,
                orderId: obj.orderId,
                price: obj.price,
                size: obj.size,
                state: obj.state,
                waybill: obj.waybill,
            }
            this.wuliuObjVi = true;
        },
        // 国内物流编辑确定
        wuliuObjViClick(){
            this.$confirm('确定修改物流信息?', {
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
                    url: this.$http.adornUrl('/order/orderdomesticlogistics/addDomesticLogistics'),
                    method: 'post',
                    data: this.$http.adornData(this.wuliuobj)
                }).then(({data}) => {
                    loading.close()
                    if (data && data.code === 0) {
                        
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.init();
                                this.wuliuObjVi = false;
                            }
                        })
                    } else {
                        this.$message.error(data.msg)
                    }
                })
            }).catch(() => {})
        }

    }
  }
</script>
<style>
    
  .remakDiv .el-select{
      width: 100%;
  }
  .proDiv{
      display: flex;
      margin-left: 60px;
  }
  .proDiv .img{
      width: 120px;
      padding-right: 10px;
  }
  .proDiv .el-row{
      margin-bottom: 10px;
  }
  .domDiv{
      margin-bottom: 10px;
  }
  .domDiv h4{
      color: #409EFF;
      margin-bottom: 10px;
  }
</style>

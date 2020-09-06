<template>
    <div>
        <!-- 搜索 -->
        <div class="sous">
            <el-row :gutter="20">
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-input
                        size="medium"
                        placeholder="上传ID"
                        v-model="q.id">
                    </el-input>
                </el-col>
                
                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3">
                    <el-button type="primary" icon="el-icon-search" size="medium" @click="getDataList">查询</el-button>
                    <!-- <el-button type="" icon="el-icon-refresh" size="medium" @click="clean">重置</el-button> -->
                </el-col>
            </el-row>
        </div>
        <!-- 操作 -->
        <div class="">
            <!-- <el-button type="primary" icon="el-icon-plus" size="small" @click="toProduct">原创产品</el-button> -->
            <open-tab type="primary" icon="el-icon-plus" dec='添加上传' urlName='uploadAddUpdate' :opt='{"uploadId":null}'></open-tab>
            
        </div>
        <!-- 列表 -->
        <div class="divM">
            <el-table
                :data="dataList"
                v-loading="dataListLoading"
                style="width: 100%">
                <el-table-column
                prop="uploadId"
                label="上传编号"
                width="120">
                </el-table-column>
                <el-table-column
                prop="grantShop"
                label="授权账户"
                width="150">
                </el-table-column>
                <el-table-column
                prop=""
                label="上传ID"
                width="130">
                <template slot-scope="scope">
                    <el-tooltip class="item" :content="scope.row.uploadProductsIds" placement="bottom-start" effect="light">
                        <span style="display: inline-block;width: 120px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{scope.row.uploadProductsIds}}</span>
                    </el-tooltip>
                </template>
                </el-table-column>
                <el-table-column
                prop="amazonCategory"
                label="AMAZON类目"
                width="">
                </el-table-column>
                <el-table-column
                prop="amazonTemplate"
                label="分类类型"
                width="">
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="更新时间"
                width="100">
                </el-table-column>
                <el-table-column
                prop=""
                label="产品状态"
                width="120">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.uploadState == 0" type="info">等待上传</el-tag>
                        <el-tag v-if="scope.row.uploadState == 1">正在上传</el-tag>
                        <el-tag  v-if="scope.row.uploadState == 2" type="success">上传成功</el-tag>
                        <el-tag type="danger" v-if="scope.row.uploadState == 3">上传失败</el-tag>
                        <el-tag type="warning" v-if="scope.row.uploadState == 4">上传警告</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <open-tab size="medium" type="text" icon="el-icon-edit" dec='' urlName='uploadAddUpdate' :opt='{"uploadId":scope.row.uploadId}'></open-tab>
                    <el-button type="text" icon="el-icon-delete" @click="del(scope.row.uploadId)"></el-button>
                    &nbsp;&nbsp;&nbsp;
                    <el-dropdown trigger="click" v-if="scope.row.uploadState == 3 || scope.row.uploadState == 4">
                        <span class="el-dropdown-link spanDown">
                            更多<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" class="tableDown">
                            <el-dropdown-item icon="el-icon-tickets">
                                <open-tab size="medium" type="text" icon="" dec='报告列表' urlName='baogaoList' :opt='{"uploadId":scope.row.uploadId}'></open-tab>
                            </el-dropdown-item>
                            <el-dropdown-item icon="el-icon-refresh-right">
                                <el-button type="text" size="small" @click="againUploadClick(scope.row.uploadId)">重新上传</el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
            :current-page="pageIndex"
            :page-sizes="[20, 30, 50]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import OpenTab from '../../common/open'
    export default {
        components: {
            OpenTab
        },
        data() {
            return{
                q:{
                    id:''
                },
                pageSize:20,
                pageIndex:1,
                totalPage:0,
                dataList:[],
                dataListLoading:true,
            }
        },
        created(){
            this.getDataList();
        },
        methods:{
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 获取数据列表
            getDataList () {
                // console.log(this.nowProTypeId);
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/upload/upload/getMyUploadList'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'page': this.pageIndex,
                        'limit': this.pageSize,
                        'uploadProductsIds':this.q.id,
                        'type':0
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        console.log(data);
                        this.dataList = data.page.list
                        this.totalPage = data.page.totalCount
                        console.log(this.$store.state.dept)
                    } else {
                        this.$message.error(data.msg)
                    }
                    this.dataListLoading = false
                })
            },
            // 删除
            del(id){
                this.$confirm('确定删除该条数据?', {
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
                        url: this.$http.adornUrl('/upload/upload/delete'),
                        method: 'post',
                        data: this.$http.adornData({
                            uploadId:id
                        })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList()
                                loading.close()
                            }
                        })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }).catch(() => {})
            },
            // 重新上传
            againUploadClick(id){
                console.log(id);
                this.$confirm('确定重新上传?', {
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
                        url: this.$http.adornUrl('/upload/upload/againUploadByButton'),
                        method: 'post',
                        data: this.$http.adornData({
                            uploadId:id
                        })
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success',
                            duration: 1000,
                            onClose: () => {
                                this.getDataList()
                                loading.close()
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
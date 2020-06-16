<template>
  <div class="mod-demo-echarts">
    <div id="J_chartBarBox" class="chart-box" :style="{height:documentClientHeight-172+'px'}"></div>
  </div>
</template>


<script>
  import echarts from 'echarts'
  export default {
    data () {
      return {
        chartLine: null,
        chartBar: null,
        chartPie: null,
        chartScatter: null
      }
    },
    mounted () {
      // this.initChartBar()
      this.getDataList();
    },
    activated () {
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      // if (this.chartBar) {
      //   this.chartBar.resize()
      // }
    },
    computed:{
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight }
      },
    },
    methods: {
      // 获取数据
        getDataList () {
            // console.log(this.nowProTypeId);
            this.$http({
                url: this.$http.adornUrl('/order/statistics/orderMonth'),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data && data.code === 0) {
                    console.log(data);
                    var count = [];
                    var money = [];
                    var time = [];
                    data.dataList.forEach(function(item){
                      count.push(item.count);
                      money.push(item.money/100);
                      time.push(item.time);
                    })
                    this.initChartBar(count,money,time);

                    // this.dataList = data.page.list
                    // this.totalPage = data.page.totalCount
                } else {
                    this.$message.error(data.msg)
                }
                // this.dataListLoading = false
            })
        },
      // 柱状图
      initChartBar (count,money,time) {
        var option = {
          color:['#409eff','#0bb2d4'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter:function(opt){
              console.log(opt)
              return opt[0].name+'<br /><span style="display:inline-block;width:8px;height:8px;border-radius:6px;background:#409eff;margin-right:4px"></span>销售额：'+opt[0].value+'(百元)<br /><span style="display:inline-block;width:8px;height:8px;border-radius:6px;background:#0bb2d4;margin-right:4px"></span>订单量：'+opt[1].value
            }
          },
          legend: {
            data: ['销售额', '订单量']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: time
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '销售额',
              type: 'bar',
              data: money,
              // barMaxWidth:
            },
            {
              name: '订单量',
              type: 'bar',
              stack: '广告',
              data: count
            }
          ]
        }
        this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
        this.chartBar.setOption(option)
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      },
    }
  }
</script>

<style lang="scss">
  .mod-demo-echarts {
    height: 100%;
    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      // height: 100%;
      // min-height: 600px;
    }
  }
</style>

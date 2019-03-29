<style scoped>
  @import "reportDetail.css";
</style>
<template>
  <div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div class="returnlast" @click="$router.go(-1)"><<返回上一级</div>
          <span>报告详情</span>
        </div>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <table class="reportDetail" width="100%">
              <tr>
                <td>
                  <span class="word">姓名 : </span><span
                  style="width: 200px;height: 50px;">{{reportDetaile.patientName}}</span>
                </td>
                <td>
                  <span class="word">性别 : </span>
                  <span>
                    <span v-show="reportDetaile.patientSex == '0'">女</span>
                    <span v-show="reportDetaile.patientSex == '1'">男</span>
                  </span>
                </td>
                <td>
                  <span class="word">年龄 : </span><span>{{reportDetaile.patientAge}}</span>
                </td>
                <td>
                  <span class="word">问诊方式 : </span>
                  <span v-show="reportDetaile.patienttypeCode == 'INP'">住院</span>
                  <span v-show="reportDetaile.patienttypeCode == 'OP'">门诊</span>
                  <span v-show="reportDetaile.patienttypeCode == 'EP'">急诊</span>
                  <span v-show="reportDetaile.patienttypeCode == 'HP'">体检</span>
                  <span v-show="reportDetaile.patienttypeCode == 'OHP'">外院</span>
                  <span v-show="reportDetaile.patienttypeCode == 'RP'">远程会诊</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span class="word">用户编码 : </span><span>{{reportDetaile.patientId}}</span>
                </td>
                <td>
                  <span class="word">检查号 : </span><span>{{reportDetaile.studyAccnumber}}</span>
                </td>
                <td>
                  <span class="word">检查项目 : </span><span>{{reportDetaile.studyItemdesc}}</span>
                </td>
              </tr>

              <tr>
                <td colspan="2">
                  <span class="word">报告医生 : </span><span> {{reportDetaile.reportdoc}}</span>
                </td>
                <td>
                  <span class="word">报告时间 : </span><span>{{reportDetaile.reportDatetime}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <span class="word">审核医生 :</span><span> {{reportDetaile.reportverifydoc}}</span>
                </td>
                <td>
                  <span class="word">审核时间 :</span><span> {{reportDetaile.reportVerifydatetime}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span class="word">影像描述 : </span>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="message">
                    {{reportDetaile.reportExam}}
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <span class="word">诊断意见 : </span>
                </td>
              </tr>
              <tr>
                <td colspan="4" >
                 <div class="message">
                   {{reportDetaile.reportResult}}
                 </div>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <el-button class="showReportImage" @click="showReportImage(reportDetaile.studyAccnumber)">查看影像
                  </el-button>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>


<script>

  import {getReportDetail} from '@/api/index'

  export default {
    name: 'reportdetail',
    data () {
      return {
        form: {},
        studyAccnumber: '',
        dialogVisible: false,
        imgUrl : "",
        reportDetaile: {
          patientName: '',
          patientSex: '',
          patientAge: '',
          patienttypeCode: '',
          patientId: '',
          studyAccnumber: '',
          studyItemdesc: '',
          reportExam: '',
          reportResult: '',
          reportdoc: '',
          reportDatetime: '',
          reportverifydoc: '',
          reportVerifydatetime: '',
        }
      }
    },
    methods: {
      getReportDetail () {
        console.log('studyAccnumber', this.$route.query.studyAccnumber)
        getReportDetail(this.$route.query.studyAccnumber).then(res => {
          console.log('reportDetail ===', res.data)
          this.reportDetaile = res.data
        })
      },

      showReportImage (accnumber) {
        this.studyAccnumber = accnumber;
        this.imgUrl = "http://healthbp.cn:8989/DicomServer/studyReportImageInfo.html?accessionnumber=" + this.studyAccnumber + "&studyUID=&seriesUID=&serieskey=0";

        window.open(this.imgUrl, "_blank")
      }
    },
    mounted () {
      this.getReportDetail()
    }
  }
</script>

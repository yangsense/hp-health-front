<style scoped>
   @import "reportDetail.css";
</style>
<template>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>报告详情</span>
        </div>
        <div>


          <el-form ref="form" :model="form" label-width="80px">
            <table class="reportDetail">
              <tr>
                <td>
                  <span class="word">姓名 : </span><span style="width: 200px;height: 50px;">{{reportDetaile.patientName}}</span>
                </td>
                <td>
                  <span class="word">性别 : </span><span>{{reportDetaile.patientSex}}</span>
                </td>
                <td>
                  <span class="word">年龄 : </span><span>{{reportDetaile.patientAge}}</span>
                </td>
                <td>
                  <span class="word">问诊方式 : </span><span>{{reportDetaile.patienttypeCode}}</span>
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
                <td colspan="100">
                  <span class="word">影像描述 : </span><span>{{reportDetaile.reportExam}}</span>
                </td>
              </tr>
              <tr>
                <td colspan="100">
                  <span class="word">诊断意见 : </span><span>{{reportDetaile.reportResult}}</span>
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
                <td>
                  <el-button class="showReportImage" @click="showReportImage()">查看影像</el-button>
                </td>
              </tr>
            </table>
          </el-form>
        </div>
      </el-card>
    </div>
</template>


<script>

  import { getReportDetail} from '@/api/index'

    export default {
        name: "reportdetail",
        data(){
          return {
            studyAccnumber : "",
            reportDetaile: {
              patientName: '',
              patientSex: '',
              patientAge:"",
              patienttypeCode:"",
              patientId:"",
              studyAccnumber:"",
              studyItemdesc:"",
              reportExam:"",
              reportResult:"",
              reportdoc:"",
              reportDatetime:"",
              reportverifydoc:"",
              reportVerifydatetime:"",
            }
          }
        },
        methods:{
          getReportDetail(){
            //this.studyAccnumber = this.$router.query
            console.log("studyAccnumber",this.$route.query.studyAccnumber);
            getReportDetail(this.$route.query.studyAccnumber).then(res => {
              console.log("reportDetail ===", res.data)
              this.reportDetaile = res.data;
            })
          }
        },
      mounted() {
        this.getReportDetail();
      }
    }
</script>

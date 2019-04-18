<style scoped>
  @import "reportlist.css";
</style>
<template>
  <div class="container">
    <p>影像报告列表</p>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%;margin-top: 10px;">
      <el-table-column
        fixed="left"
        prop="reportDatetime"
        label="报告日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="patientId"
        label="ID"
        width="150">
      </el-table-column>
      patientName
      <el-table-column
        prop="patientName"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="studyAccnumber"
        label="报告编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="studyItemdesc"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        width="150"
        prop="orgName"
        label="医院名称">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="showDetailClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  import {getReportList, getOperatorByToken} from '@/api/index'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      //根据token查询用户信息
      getOperator(){
        var token = localStorage.getItem("token");
        console.log("token ===" , token)
        getOperatorByToken(token).then(res => {
          this.tableData = res.data;
        })
      },
      //接受user信息并获取报告列表,
      getTableData() {
        var phone = localStorage.getItem("phone");
        console.log("phone ===" , phone)
        getReportList(phone).then(res => {
          this.tableData = res.data;
        })
      },
      //根据报告编号查看报告详情
      showDetailClick(row){
        this.$router.push({
          path: '/reportDetail',
          query: {
            studyAccnumber: row.studyAccnumber
          }
        })
      },
      init() {
        this.getTableData()
        //this.getOperator();
      }
    },

    mounted() {
      this.init();
    }
  }


</script>



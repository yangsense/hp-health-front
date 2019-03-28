<style scoped>
  @import "reportlist.css";
</style>
<template>
  <div class="container">
    <p>影像报告列表</p>
    <el-table
      :data="tableData"
      border
      style="width: 100%;margin-top: 10px;">
      <el-table-column
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
        width="100">
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

  import {getReportList} from '@/api/index'

  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      //接受user信息并获取报告列表,
      getTableData() {
        var phone = localStorage.getItem("phone");
        console.log("用户手机号为 ===" , phone)
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
      }
    },

    mounted() {
      this.init();
    }
  }


</script>



<template>
    <div>
      <el-button @click="test">test</el-button>
    </div>
</template>

<script>
  export default {
    name: 'login',
    methods:{
      test(){
        this.$router.push("/reportlist")
      }
    }
  }
</script>

<style scoped>

</style>

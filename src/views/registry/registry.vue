<template>
  <div class="doctorlogin">
    <div class="doctor-form">
      <el-form  :model="ruleForm" :rules="rules" ref="ruleForm2">
        <h3 class="login-title">短信登录</h3>
        <ul class="myInput">
          <li>
            <el-form-item prop="phone"  class = "login_message">
              <el-input type="text" v-model.number="ruleForm.phone" auto-complete="off" placeholder="请输入注册手机号" :maxlength="11" style = "height:100%;">
              </el-input>
              <button :disabled="!rightPhone" class="get_verification"
                      :class="{right_phone : rightPhone}" @click.prevent="getCode">
                {{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}
              </button>
            </el-form-item>
          </li>
          <li>
            <el-form-item prop="code" >
              <el-input type="text" v-model="ruleForm.code" auto-complete="off" placeholder="请输入验证码" :maxlength="6" style="width: 80%;"></el-input>
            </el-form-item>
          </li>
        </ul>
        <p class="login-button" @click="registry('ruleForm')"><a>点 击 登 录</a></p>
        <p class="redirect"><a href="/login">已经有账号，马上去</a></p>
        <p class="message_registry" style="font-size: .2rem;color: darkgrey;margin-top: 0.1rem;width: 4rem;margin-left: 2rem">
          温馨提示：未注册帐号的手机号，登录时将自动注册，且代表已同意
          <a href="javascript:;">《用户服务协议》</a>
        </p>
      </el-form>
    </div>

    <!---->
    <!--<div class="logo">
            <img src="../assets/03.png" alt="图片" />
        </div>  -->
    <canvas id="canvas" class="canvas"></canvas>
  </div>
</template>
<script>

  import {login, reqSendCode, loginByCode} from '@/api/index'

  export default {
    data() {
      var msg="111"
      var reg = /^1[3|4|5|7|8][0-9]{9}$/;
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('登录名不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入手机号'));
          } else {
            if (!reg.test(value)) {
              callback(new Error('登录名格式错误'));
            }else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        computeTime: 0, //计时时间
        loginRouter:'',
        ruleForm: {
          phone: '',
          code: ''
        },
        rules: {
          account: [{
            validator: checkAccount,
            trigger: 'blur'
          }],
          checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      };//return结束
    },//data结束
    computed:{
      rightPhone () {
        return /^1\d{10}$/.test(this.ruleForm.phone)
      }
    },

    created(){
      /* 登录背景画布开始 */
      setTimeout(function(){
        //定义画布宽高和生成点的个数

        var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 35;

        var canvas = document.getElementById('canvas');
        canvas.width = WIDTH,
          canvas.height = HEIGHT;
        var context = canvas.getContext('2d');
        context.strokeStyle = 'rgba(255,255,255,0.3)',
          context.strokeWidth = 1,
          context.fillStyle = 'rgba(255,255,255,0.3)';
        var circleArr = [];

        //线条：开始xy坐标，结束xy坐标，线条透明度
        function Line (x, y, _x, _y, o) {
          this.beginX = x,
            this.beginY = y,
            this.closeX = _x,
            this.closeY = _y,
            this.o = o;
        }
        //点：圆心xy坐标，半径，每帧移动xy的距离
        function Circle (x, y, r, moveX, moveY) {
          this.x = x,
            this.y = y,
            this.r = r,
            this.moveX = moveX,
            this.moveY = moveY;
        }
        //生成max和min之间的随机数
        function num (max, _min) {
          var min = arguments[1] || 0;
          return Math.floor(Math.random()*(max-min+1)+min);
        }
        // 绘制原点
        function drawCricle (cxt, x, y, r, moveX, moveY) {
          var circle = new Circle(x, y, r, moveX, moveY)
          cxt.beginPath()
          cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
          cxt.closePath()
          cxt.fill();
          return circle;
        }
        //绘制线条
        function drawLine (cxt, x, y, _x, _y, o) {
          var line = new Line(x, y, _x, _y, o)
          cxt.beginPath()
          cxt.strokeStyle = 'rgba(255,255,255,'+ o +')'
          cxt.moveTo(line.beginX, line.beginY)
          cxt.lineTo(line.closeX, line.closeY)
          cxt.closePath()
          cxt.stroke();

        }
        //初始化生成原点
        function init () {
          circleArr = [];
          for (var i = 0; i < POINT; i++) {
            circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
          }
          draw();
        }

        //每帧绘制
        function draw () {
          context.clearRect(0,0,canvas.width, canvas.height);
          for (var i = 0; i < POINT; i++) {
            drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
          }
          for (var i = 0; i < POINT; i++) {
            for (var j = 0; j < POINT; j++) {
              if (i + j < POINT) {
                var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
                  B = Math.abs(circleArr[i+j].y - circleArr[i].y);
                var lineLength = Math.sqrt(A*A + B*B);
                var C = 1/lineLength*7-0.009;
                var lineOpacity = C > 0.1 ? 0.1 : C;
                if (lineOpacity > 0) {
                  drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
                }
              }
            }
          }
        }

        //调用执行
        //window.onload = function () {
        init();
        setInterval(function () {
          for (var i = 0; i < POINT; i++) {
            var cir = circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > WIDTH) cir.x = 0;
            else if (cir.x < 0) cir.x = WIDTH;
            if (cir.y > HEIGHT) cir.y = 0;
            else if (cir.y < 0) cir.y = HEIGHT;

          }
          draw();
        });
        //}
      })
      /* 登录背景画布结束 */
    },
    methods: {
      //获取验证码
      getCode(){
        console.log("获取验证码")
        if(!this.computeTime) {
          // 启动倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0) {
              // 停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)

          // 发送ajax请求(向指定手机号发送验证码短信)
          console.log("打印输入用户手机号", this.ruleForm.phone);
          const result = reqSendCode(this.ruleForm.phone)
          if(result.code===1) {
            // 显示提示
            this.showAlert(result.msg)
            // 停止计时
            if(this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }
      },


      submitForm(ruleForm) {
        //在外部定义一个值指代Vue实例 用来解决 Cannot read property '$router' of undefined
        //参考文档 https://segmentfault.com/q/1010000009919004/a-1020000009920694
        var self = this;

        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            //md5加密
            console.log(this.ruleForm.checkPass)
            this.ruleForm.checkPass = this.$md5(this.ruleForm.checkPass)
            console.log(this.ruleForm.checkPass)

            login(this.ruleForm.account, this.ruleForm.checkPass).then(function (res) {
              console.log("code==" ,res.code + "data==" , res.data);
              if(res.code === 20000){

                //将用户信息保存到local
                console.log("telNo",res.data.telNo)
                localStorage.setItem("phone", res.data.telNo)
                //不带参数的跳转
                self.$router.push('/reportlist');
                //带参数跳转方式
                /*self.$router.push({
                  path: '/reportlist',
                  query: {
                    phone:res.data.telNo
                  }
                })*/

              }else{
                this.$message({message: '错了哦，请确认登录名或密码',type: 'error'});
              }
            })
          } else {
            return false;
          }
        });
      },
      registry(){
        var _this = this;
        //将用户信息保存到local
        localStorage.setItem("phone", this.ruleForm.phone)
        loginByCode(this.ruleForm.phone, this.ruleForm.code).then(function (res) {
          console.log("code==" ,res.code + "data==" , res.data);
          if(res.code === 20000){
            //不带参数的跳转
            _this.$router.push('/reportlist');
          }else{
            this.$message({message: res.data, type: 'error'});
          }
        })
      }
    }//methods结束
  }
</script>
<style lang="scss">
  @import "../../styles/core/reset.scss";
  @import "registry.css";
  .doctorlogin{
    width: 100%;
    height: 100%;
    @include flexbox;
    position: relative;
    .doctor-form{
      width: 8.02rem;
      position: absolute;
      top: 28%;
      left: 50%;
      transform: translate(-50%,0);
      .el-form{
        h3{
          font-size: .46rem;
          color:#fff;
          text-align: center;
          font-weight: normal;
        }
        .myInput{
          text-align: center;
          margin: .75rem auto 0 auto;
          width: 4rem;
          height: 1.2rem;
          background: #fff;
          border-radius: 4px;
          overflow: hidden;
          li{
            width: 100%;
            height: .6rem;
            font-weight:normal;
            &:first-child{
              border-bottom:1px solid #EEEEEE;
              box-sizing: border-box;
            }
            input{
              width: 3.4rem;
              height: 100%;
              border:none;
              outline: none;
              font-size: .18rem;
              font-weight:normal;
            }
          }

          .el-form-item{
            margin-bottom: 0px;
            height: 100%;
            .el-form-item__content{
              line-height: .6rem;
              position: relative;
              font-size: .14rem;
              .el-input,.el-input{
                margin-bottom: 0px;
                height: 100%;
                .el-input__inner{
                  background: #fff;
                }
              }
              .el-form-item__error {
                color: #ff4949;
                font-size: 12px;
                line-height: 60px;
                position: absolute;
                top: 0;
                right: 8px;
                padding: 0 8px;
                left: auto;
              }
            }
          }
        }


        .forgot-button{
          margin-left: 2rem;
          font-size: .16rem;
          a{
            color: #fff;
          }
        }

        .redirect{
          margin-left: 4.5rem;
          font-size: .16rem;
          a{
            color: #fff;
          }
        }

        .login-button{
          width: 4rem;
          height: .6rem;
          background: #fff;
          text-align: center;
          line-height: .6rem;
          margin: .2rem auto;
          border-radius: .04rem;
          font-size: .18rem;
          color: #0A81E5;
          font-weight: normal;
          a{
            color: #467DE5;
            font-weight: bolder;
            font-weight:normal;
            cursor: pointer;
            width: 100%;
            height: 100%;
            display: inline-block;
          }
        }
        .go-doctrlogin{
          text-align: center;
          padding-top: .2rem;
          font-size: .18rem;
          a{
            color: #fff;
          }
        }
      }
    }
    .login-footer{
      position: absolute;
      left: 50%;
      bottom: .3rem;
      font-size: .14rem;
      color: rgba(255,255,255,0.5);
      transform: translate(-50%,0);
    }
    .logo{
      position: absolute;
      top: .4rem;
      left: .4rem;
      img{
        width: 1.7rem;
        height: .35rem;
        display: block;
      }
    }
    .canvas{
      display: block;
      background: #0982E5;
      @include flex;
    }
  }
</style>

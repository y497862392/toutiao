<template>
    <div class="login-container">
        <van-nav-bar class="page-nav-bar" title="登录"></van-nav-bar>

        <van-form @submit="onSubmit" ref="loginForm">
            <van-field v-model="user.mobile" name="mobile" placeholder="请输入手机号"   :rules="userFormRules.mobile" type="number" maxlength="11">
                <i slot="left-icon" style="font-size: 16px; margin-top: 2px" class="toutiao toutiao-shouji"></i>
            </van-field>

            <van-field v-model="user.code" name="code" placeholder="请输入验证码"  :rules="userFormRules.code" type="code" maxlength="6">
                <i slot="left-icon" style="font-size: 16px; margin-top: 2px" class="toutiao toutiao-yanzhengma"></i>
                
                <template #button
                >
                    <van-count-down :time="1000 * 60"
                    v-if="isCountDownShow"
                     format="ss s"
                     @finish="isCountDownShow = false"
                     />
                    <van-button 
                    v-else 
                    type="default" 
                    class="send-sms-btn" 
                    round 
                    size="small"
                    native-type="button"
                    @click="onSendSms"
                    >
                    发送验证码
                </van-button>
                </template>
            </van-field>

            <div style="margin: 16px">
                
                <van-button block type="info" native-type="submit" >登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { login,sendSms } from '@/api/user'
export default {
    name: 'LoginIndex',
    data() {
        return {
            user: {
                mobile: '',
                code: '246810'
            },
            userFormRules: {
                mobile: [{
                    required: true,
                    message: '请填写用户名'
                }, {
                    pattern: /1[3|5|7|8]\d{9}/,
                    message:'手机格式错误'
                }
                ],
                code: [{
                    required: true,
                    message: '请填写用户名'
                },
                    {
                        pattern: /^\d{6}$/,
                    message:'验证码格式错误'
                }
                ]
            },
            isCountDownShow: false
        }
    },
    methods: {
        async onSubmit() {
           
                this. $toast.loading({
                    message: "登录中...",
                    forbidClick: true,
                    duration: 200
                })
                try {
                    const { data } = await login(this.user)
                    this.$store.commit('setUser',data.data)
                    this.$toast.success('登录成功')
                } catch (err) {
                    if (err.response.status === 400) {
                        console.log('手机号和验证码错误')
                    } else {
                        console.log('登录失败，请稍后重试',err)
                    }
                    
                }
            },
        async onSendSms() {
          
            try {
                await this.$refs.loginForm.validate('mobile')
                 console.log("验证成功")
            } catch(err) {
                return console.log('验证失败', err)
               
            }
            this.isCountDownShow= true
            try {
            const res =await sendSms (this.user.mobile)
             console.log('发送成功',res)
            }
            catch (err) {
                this.isCountDownShow = false
                if (err.response.status === 429) {
                    this.$toast('发送太频繁了,请稍后重试')
                } else {
                    this.$toast('发送失败,请稍后重试')
                }
            }
            
        }
    }
}
</script>

<style lang="less" scoped>
.login-container {
    .toutiao {
        font-size: 37px;
    }

    .send-sms-btn {
        width: 90px;
        height: 26px;
        line-height: 20px;
        background-color: #ededed;
        font-size: 14px;
        color: #666;
    }

    .login-btn-wrap {
        padding: 53px 33px;

        .login-btn {
            background-color: #6db4fb;
            border: none;
        }
    }
}
</style>

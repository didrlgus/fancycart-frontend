<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>Login</li>
                </ul>
            </div>
        </div>

        <section class="login-area ptb-60">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <div class="login-content">
                            <div class="section-title">
                                <h2><span class="dot"></span> 로그인</h2>
                            </div>

                            <form @submit.prevent="onSubmit" class="login-form">
                                <div class="form-group">
                                    <label>이메일</label>
                                    <input type="email" class="form-control" placeholder="Enter your name" id="name" name="name" v-model="login.email">
                                </div>

                                <div class="form-group">
                                    <label>비밀번호</label>
                                    <input type="password" class="form-control" placeholder="Enter your password" id="password" name="password" v-model="login.password">
                                </div>

                              <button  class="btn" :class="{'btn-success': !invalidForm}" type="submit" :disabled="invalidForm">로그인</button>

<!--                                <nuxt-link to="/" class="forgot-password">Lost your password?</nuxt-link>-->
                            </form>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-12">
                        <div class="new-customer-content">
                            <div class="section-title">
                                <h2><span class="dot"></span> 새로운 고객</h2>
                            </div>

                            <span>회원가입</span>
                            <p>회원가입 시 다양한 서비스를 제공 받을 수 있습니다.</p>
                            <nuxt-link to="/signup" class="btn btn-light">회원가입 하기</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
  import {mapActions} from 'vuex'

  export default {
    data () {
      return {
        login: {
          email: '',
          password: ''
        },
        error: '',
        rPath: ''
      }
    },
    computed: {
      invalidForm () {
        return !this.login.email || !this.login.password
      }
    },
    created () {
      this.rPath = this.$route.query.rPath || '/'
    },
    methods: {
      ...mapActions([
        'LOGIN'
      ]),
      async onSubmit () {
        try {
          let response = await this.$auth.loginWith('local', {
            data: this.login
          })
          this.$router.push('/');
          this.$toast.success(this.$auth.user + "님 어서오세요!")
        } catch (err) {
          this.$toast.error('아이디 또는 비밀번호가 적절하지 않습니다.', { icon: 'fas fa-trash' })
        }
      }
    }
  }
</script>

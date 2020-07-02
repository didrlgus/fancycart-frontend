<template>
    <!-- Start Top Header Area -->
    <div class="top-header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-7 col-md-6">
<!--                    <ul class="top-header-nav">-->
<!--                        <li><nuxt-link to="/login">로그인</nuxt-link></li>-->
<!--                        <li><nuxt-link to="/signup">회원가입</nuxt-link></li>-->
<!--                    </ul>-->
                </div>

                <div class="col-lg-5 col-md-6">
                    <ul v-if="$auth.loggedIn" class="top-header-right-nav">
                      <li><a href="">{{ $auth.user }}</a></li>
                      <li>
                        <a @click="logout"href="">로그아웃</a>
                      </li>
                    </ul>
                    <ul v-else class="top-header-right-nav">
                      <li><nuxt-link to="/login">로그인</nuxt-link></li>
                      <li><nuxt-link to="/signup">회원가입</nuxt-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- End Top Header Area -->
</template>
<script>
  export default {
    methods: {
      async logout({ state, commit }) {
        await this.$auth.logout()
        window.location = '/login'
      }
    }
  }

</script>

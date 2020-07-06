<template>
	<div class="emb-signIn-wrap section-gap">
		<div class="container py-0">
			<v-layout row wrap align-center justify-center>
				<v-flex sm12 md12 lg8 xl7>
					<v-layout row mx-sm-0 mx-3 wrap align-center justify-center>
						<v-flex sm6 md7 lg6 xl6 hidden-sm-and-down>
							<div class="form-img sign-in-image"></div>
						</v-flex>
						<v-flex sm10 md5 lg5 xl6>
							<div class="emb-card sign-in-form form-margin d-block white pa-6">
								<h4>User Sign In</h4>
								<v-form @submit.prevent="onSubmit" ref="form" v-model="valid">
									<v-text-field
										type="email"
										placeholder="Email*"
                                        :rules="emailRules"
                                        v-model="email">
									</v-text-field>
									<v-text-field
										type="password"
										placeholder="Password*"
                                        :rules="inputRules.basictextRules"
                                        v-model="password">
									</v-text-field>
									<div class="layout align-center justify-space-between">
										<v-checkbox
											v-model="checkbox"
											label="Remember Me" />
										<router-link to="/session/forgot-password" class=" text-lg-right">패스워드를 잊어버리셨나요?</router-link>
									</div>
									<v-btn type="submit" class="accent mb-3 ma-0" large>
										Sign In
									</v-btn>
									<p>회원이 아니신가요? <router-link to="/session/signup" class="accent--text">여기를 눌러주세요.</router-link></p>
								</v-form>
							</div>
						</v-flex>
					</v-layout>
				</v-flex>
			</v-layout>
		</div>
   </div>
</template>
<script>
	import { mapActions } from 'vuex'

    export default{
	  data(){
        return{
          checkbox: false,
          email: '',
          password: '',
          valid: false,
          rPath: '',
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+/.test(v) || 'E-mail must be valid'
          ],
          inputRules: {
            basictextRules: [v => !!v || 'This field should not be empty']
          }
        }
      },
      created() {
        this.rPath = this.$route.query.rPath || '/'
      },
      methods: {
	    ...mapActions([
	      'LOGIN'
        ]),
        onSubmit() {
          this.$refs.form.validate();
          if(this.valid) {
            this.LOGIN({email: this.email, password: this.password})
              .then(data => {
                location.href = this.rPath
                // this.$snotify.success(this.email + '님 어서오세요.',{
                //   closeOnClick: false,
                //   pauseOnHover: false,
                //   timeout: 1000,
                //   showProgressBar:false,
                // });
              })
              .catch(err => {
                this.$snotify.error(err.data.message,{
                  showProgressBar:false
                });
              })
          }
        }
      }
	}
</script>

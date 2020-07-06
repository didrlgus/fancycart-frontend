<template>
	<div class="emb-register-wrap section-gap">
		<div class="container py-0">
			<v-layout row wrap align-center justify-center>
				<v-flex sm12 md12 lg8 xl7>
					<v-layout row mx-sm-0 mx-3  wrap align-center justify-center>
						<v-flex sm6 md7 lg6 xl6 hidden-sm-and-down>
							<div class="form-img"></div>
						</v-flex>
						<v-flex sm10 md5 lg6 xl6>
							<div class="emb-card sign-in-form form-margin d-block white pa-6">
								<h4>회원가입</h4>
								<v-form ref="form" v-model="valid">
									<v-text-field
										type="text"
										placeholder="Name*"
										:rules="inputRules.basictextRules"
                                        v-model="name">
									</v-text-field>
									<v-text-field
										type="email"
										placeholder="Email*"
										:rules="emailRules"
                                        v-model="email">
									</v-text-field>
									<v-text-field
										type="password"
										placeholder="Enter Password*"
										:rules="inputRules.basictextRules"
                                        v-model="password">
									</v-text-field>
									<v-btn class="accent mx-0 mb-4" large  @click.stop.prevent="saveDetails">
										Sign Up
									</v-btn>
									<p>이미 계정이 있다면?<router-link to="/session/signin" class="accent--text"> Sign In</router-link></p>
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
  import {mapActions} from 'vuex'

  export default{
    data () {
      return {
        selected: '',
        name: '',
        email: '',
        password: '',
        rPath: '',
        valid: false,
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        inputRules: {
          basictextRules: [v => !!v || 'This field should not be empty']
        }
      }
    },
    methods: {
      ...mapActions([
        'REGISTER'
      ]),
      saveDetails(){
        this.$refs.form.validate();
        if(this.valid){
          this.REGISTER({name: this.name, email: this.email, password: this.password})
            .then(data => {
              this.$snotify.success('회원가입에 성공하였습니다.',{
                closeOnClick: false,
                pauseOnHover: false,
                timeout: 1000,
                showProgressBar:false,
              });
              this.$router.push('/home')
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

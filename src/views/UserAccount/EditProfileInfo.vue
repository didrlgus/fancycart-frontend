<template>
   <div class="editInfo-wrap emb-card pa-4">
      <div class="">
         <h4>프로필 수정하기</h4>
         <v-form ref="form" v-model="valid">
            <v-layout row wrap>
               <v-flex xs12 sm12 md12 lg6 xl6>
                  <v-layout row wrap>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                          <v-text-field label="Name" v-model="name" :rules="inputRules.basictextRules" />
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                          <v-menu
                                  ref="menu"
                                  :close-on-content-click="false"
                                  v-model="menu"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  min-width="290px">
                              <template v-slot:activator="{ on }">
                                  <v-text-field v-model="birth"
                                                v-on="on"
                                                label="생일"
                                                append-icon="event"
                                                readonly
                                                :rules="inputRules.basictextRules" />
                              </template>
                              <v-date-picker
                                      ref="picker"
                                      v-model="birth"
                                      min="1950-01-01"
                                      @change="save"/>
                          </v-menu>
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                         <v-radio-group v-model="agreeMessageByEmail">
                             <v-radio label="이메일 수신" value="YES" />
                             <v-radio label="이메일 수신 X" value="NO" />
                         </v-radio-group>
                     </v-flex>
                      <v-flex xs20 sm20 md20 lg20 xl20 py-1>
                          <v-text-field label="도로명 주소"  v-model="roadAddr"  />
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                          <v-text-field label="건물이름" v-model="buildingName"  />
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                          <v-text-field label="상세주소" v-model="detailAddr" />
                      </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-1>
                          <v-btn class="accent mx-0 mb-4"  @click.prevent="onRegistAddr">우편번호 검색</v-btn>
                      </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex xs12 sm12 md6 lg6 xl6 user-bg edit-profile hidden-md-and-down>
               </v-flex>
            </v-layout>
         </v-form>
          <DaumPostcode v-if="isDaumPostcode" :on-complete=handleAddress />
          <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 pt-1 pb-0>
                  <v-btn class="accent mx-0 mb-4" @click.stop.prevent="saveDetails">수정하기</v-btn>
              </v-flex>
          </v-layout>
      </div>
   </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import DaumPostcode from "vuejs-daum-postcode"

	export default{
        components: {
            DaumPostcode,
        },
	    data () {
	        let profile=this.$store.state.user.userProfile
            return {
	            val: '',
                valid: false,
                isDaumPostcode: false,
                inputRules: {
                   basictextRules: [v => !!v || 'This field should not be empty']
                },
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                name: profile.name,
                birth: profile.birth,
                agreeMessageByEmail: profile.agreeMessageByEmail,
                roadAddr: profile.roadAddr,
                buildingName: profile.buildingName,
                detailAddr: profile.detailAddr,
                menu: false,
                modal: false
             }
        },
          watch: {
            menu (val) {
                val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
            }
          },
          methods: {
	        ...mapActions([
	            'UPDATE_PROFILE'
            ]),
              onRegistAddr() {
                  this.isDaumPostcode = true
              },
              handleAddress(data) {
                  let fullAddress = data.address
                  let extraAddress = ''
                  if (data.addressType === 'R') {
                      if (data.bname !== '') {
                          extraAddress += data.bname
                      }
                      if (data.buildingName !== '') {
                          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName)
                      }
                      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
                  }
                  this.roadAddr = data.address
                  this.buildingName = extraAddress
                  this.isDaumPostcode = false
              },
            saveDetails(){
                this.$refs.form.validate()
                if(this.valid === true){
                    let profile = this.$store.state.user.userProfile
                    let userId = this.$store.state.user.userId

                    if(this.name === profile.name && this.birth === profile.birth
                            && this.agreeMessageByEmail === profile.agreeMessageByEmail
                            && this.roadAddr === profile.roadAddr && this.buildingName === profile.buildingName
                            && this.detailAddr === profile.detailAddr) {
                        this.$snotify.error('변경 사항이 없습니다.', {
                            showProgressBar:false
                        });
                        return;
                    }

                    this.UPDATE_PROFILE({id: userId, name: this.name, birth: this.birth,
                        agreeMessageByEmail: this.agreeMessageByEmail, roadAddr: this.roadAddr,
                        buildingName: this.buildingName, detailAddr: this.detailAddr})
                        .then(data => {
                            this.$snotify.success('프로필이 변경 되었습니다.',{
                                closeOnClick: false,
                                pauseOnHover: false,
                                timeout: 1000,
                                showProgressBar:false,
                            });
                            setTimeout(() => {
                                this.$router.push({ path: '/account/profile' });
                            }, 50)
                        })
                        .catch(err => {
                            this.$snotify.error(err.data.message,{
                                showProgressBar:false
                            })
                        })
                }
            },
              save (date) {
                this.$refs.menu.save(date)
            }
          }
   }
</script>

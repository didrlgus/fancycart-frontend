<template>
   <div v-if="$route.query.type === 'address' || $route.query.type === 'ship-address'">
      <div class="edit-address-wrap emb-card pa-4">
			<h4 v-if="$route.query.type === 'ship-address'">주소 수정</h4>
			<h4 v-else>주소 수정</h4>
         <v-form ref="form" v-model="valid">
             <v-layout row wrap>
               <v-flex xs12 sm12 md12 lg6 xl6>
                  <v-layout row wrap>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-2>
                        <v-text-field label="도로명 주소" :rules="inputRules.basictextRules"  v-model="roadAddr" disabled />
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-2>
                        <v-text-field label="건물이름" :rules="inputRules.basictextRules" v-model="buildingName" disabled />
                     </v-flex>
                     <v-flex xs12 sm12 md12 lg12 xl12 py-2>
                        <v-text-field label="상세주소" :rules="inputRules.basictextRules" v-model="detailAddr" />
                     </v-flex>
                      <v-flex xs12 sm12 md12 lg12 xl12 py-2>
                          <v-btn class="accent mx-0 mb-4"  @click.prevent="onRegistAddr">우편번호 검색</v-btn>
                      </v-flex>
                  </v-layout>
               </v-flex>
               <v-flex xs12 sm12 md6 lg6 xl6 reciept-bg edit-profile hidden-md-and-down>
               </v-flex>
            </v-layout>
         </v-form>
          <DaumPostcode v-if="isDaumPostcode" :on-complete=handleAddress />
          <v-layout row wrap>
              <v-flex xs12 sm12 md12 lg12 xl12 py-2>
                  <v-btn class="accent mx-0 mb-4"  @click.stop.prevent="saveDetails" type="billing">수정하기</v-btn>
              </v-flex>
          </v-layout>
      </div>
   </div>

</template>


<script>
    import DaumPostcode from "vuejs-daum-postcode"

    export default{
        components: {
            DaumPostcode,
        },
        data () {
            return {
                valid: false,
                isModalVisible: false,
                isDaumPostcode: false,
                roadAddr: '',
                buildingName: '',
                detailAddr: '',
                inputRules: {
                   basictextRules: [v => !!v || 'This field should not be empty']
                },
             }
          },

          methods: {
             saveDetails(){
                    this.$refs.form.validate()
                if(this.valid === true){
                   this.$snotify.success('Your account Information Updated succesfully',{
                   closeOnClick: false,
                   pauseOnHover: false,
                   timeout: 1000,
                   showProgressBar:false,
                });
                setTimeout(() => {
                   this.$router.push({ path: '/account/address' });
                }, 50);
                }
             },
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
          }
   }
</script>

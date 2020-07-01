<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>Sign up</li>
                </ul>
            </div>
        </div>

        <section class="signup-area ptb-60">
            <div class="container">
                <div class="signup-content">
                    <div class="section-title">
                        <h2><span class="dot"></span> 계정 생성하기</h2>
                    </div>

                    <form @submit.prevent="onSubmit" class="signup-form">
                        <div class="form-group">
                            <label>*이름</label>
                            <input type="text" class="form-control" placeholder="이름을 적어주세요." id="name" name="name" v-model="name">
                        </div>

                        <div class="form-group">
                            <label>*이메일</label>
                            <input type="email" class="form-control" placeholder="메일 주소를 적어주세요." id="email" name="email" v-model="email">
                        </div>

                        <div class="form-group">
                            <label>*비밀번호</label>
                            <input type="password" class="form-control" id="password" name="password" v-model="password">
                        </div>

                        <div class="form-group">
                          <b-form-group label="메일 수신 여부">
                            <b-form-radio v-model="selected" name="some-radios" value="true">Yes</b-form-radio>
                            <b-form-radio v-model="selected" name="some-radios" value="false">No</b-form-radio>
                          </b-form-group>
                        </div>


                        <div class="row">
                          <div class="form-group col-md-6">
                            <label>*도로명 주소</label>
                            <input name="roadAddr" class="form-control" type="text" v-model="roadAddr" disabled/>
                          </div>
                          <div class="form-group col-md-6">
                            <label>*건물이름</label>
                            <input name="buildingName" class="form-control" type="text" v-model="buildingName" disabled/>
                          </div>
                          <div class="form-group col-md-6">
                            <label>*상세주소</label>
                            <input name="detailAddr" class="form-control" type="text" placeholder="상세주소를 입력하세요." v-model="detailAddr"/>
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col-md-6">
                            <button type="button" class="btn btn-success" @click.prevent="onRegistAddr">우편번호 검색</button>
                          </div>
                        </div>
                        <DaumPostcode v-if="isDaumPostcode" :on-complete=handleAddress />

                        <button :class="{'btn-success': !invalidForm}" :disabled="invalidForm" type="submit" class="btn btn-primary">회원가입 하기</button>

                        <nuxt-link to="/" class="return-store">홈으로</nuxt-link>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
  import DaumPostcode from 'vuejs-daum-postcode'
  import {mapActions} from 'vuex'

  export default {
    components: {
      DaumPostcode
    },
    data() {
      return {
        selected: '',
        options: [
          { text: 'Yes', value: true },
          { text: 'No', value: false }
        ],
        name: '',
        email: '',
        password: '',
        roadAddr: '',
        buildingName: '',
        detailAddr: '',
        isDaumPostcode: false,
        error: '',
        rPath: ''
      }
    },
    computed: {
      invalidForm() {
        return !this.name || !this.email || !this.password || !this.selected
          || !this.roadAddr || !this.buildingName || !this.detailAddr
      }
    },
    methods: {
      ...mapActions([
        'ADD_USER'
      ]),
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
      onRegistAddr() {
        this.isDaumPostcode = true
      },
      onSubmit() {
        this.ADD_USER({name: this.name, email: this.email, password: this.password, agreeMessageByEmail: this.selected,
          roadAddr: this.roadAddr, buildingName: this.buildingName, detailAddr: this.detailAddr})
          .then(_ => {
            this.$router.push("/");
            this.$toast.success(`회원가입에 성공하였습니다.`, { icon: 'fas fa-trash'})
          })
          .catch(err => {
            let field = err.data.errors ? err.data.errors[0].field : null
            if (field) {
              this.$toast.error(field + " 을/를 올바르게 입력하세요.", { icon: 'fas fa-trash' })
            } else {
              this.$toast.error(err.data, { icon: 'fas fa-trash' })
            }
          })
      }
    }
  }

</script>

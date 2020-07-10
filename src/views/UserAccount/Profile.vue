<template>
   <div class="profile-wrapper emb-card pa-4">
      <h4>프로필 정보</h4>
      <div class="pt-4">
         <div class="proflie-field mb-4" v-for="(info,key) in profileData" :key="key">
            <label>{{info.key}} :</label>
            <span>{{info.value}}</span>
         </div>
         <router-link :to="{name: 'EditProfileInfo', query: {type: 'info'}}" > <v-btn class="accent mx-0">수정하기</v-btn> </router-link>
      </div>
   </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    const { userId } = localStorage
    export default {
      computed: {
        ...mapState({
          userProfile: 'userProfile'
        })
      },
      created() {
        this.$store.state.userId = userId
        this.fetchData().then(() => {
            let profile=this.$store.state.user.userProfile
            this.profileData.push({key:"이름", value:profile.name})
            this.profileData.push({key:"이메일", value:profile.email})
            this.profileData.push({key:"생일", value:profile.birth})
            this.profileData.push({key:"이메일 수신 여부", value:profile.agreeMessageByEmail})
            this.profileData.push({key:"도로명 주소", value:profile.roadAddr})
            this.profileData.push({key:"건물명", value:profile.buildingName})
            this.profileData.push({key:"상세 주소", value:profile.detailAddr})
        })
      },
      methods: {
        ...mapActions([
          'GET_PROFILE'
        ]),
        fetchData() {
          return this.GET_PROFILE({id: userId})
        }
      },
      data() {
        return {
          profileData: []
        }
      }
    }
</script>

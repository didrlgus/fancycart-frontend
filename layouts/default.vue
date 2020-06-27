<template>
  <div>
    <TopPanel v-if="isShowing" @clicked="onTopPanelClose" />
    <TopHeader />
    <Menubar />
    <nuxt />
    <Footer />
    <SiteLoader v-if="loading" />
    <BackToTop />
  </div>
</template>

<script>
import TopPanel from './TopPanel'
import TopHeader from './TopHeader'
import Menubar from './Menubar'
import Footer from './Footer'
import BackToTop from './BackToTop'
import SiteLoader from './SiteLoder'
export default {
  components: {
    TopPanel, TopHeader, Menubar, Footer, BackToTop, SiteLoader
  },
  data () {
    return {
      loading: true,
      isShowing: true
    }
  },
  watch: {
    '$route' (pathUrl) {
      this.loading = true
      setTimeout(() => { this.loading = false }, 600)
    }
  },
  mounted () {
    setTimeout(() => { this.loading = false }, 600)
  },
  methods: {
    onTopPanelClose (value) {
      this.isShowing = value
    }
  }
}
</script>

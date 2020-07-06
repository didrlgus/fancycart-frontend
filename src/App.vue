<template>
    <div id="app">
		<router-view />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	computed: {
      ...mapGetters([
        'isAuth'
      ]),
		mobileMenu: {
			get() {
				return this.$store.getters.sidebarOpen;
			},
			set(val) {
				this.$store.dispatch("toggleSidebar", val);
			}
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>



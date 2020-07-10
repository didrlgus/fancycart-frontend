<template>
	<div>
		<v-menu transition="scale-transition" offset-overflow nudge-bottom="30" nudge-right="20" min-width="200"
			max-width="200" class="userblock-dropdown" light>
			<template v-slot:activator="{ on }">
				<v-btn fab small v-on="on">
					<img src="/static/images/user.png" width="40" height="40" class="v-btn--round">
				</v-btn>
			</template>
			<v-list class="user-dropdown-list">
				<v-list-item href="/account/profile">
					<v-icon class="mr-2">account_circle</v-icon>
					<span>User Profile</span>
				</v-list-item>
                <v-list-item href="/account/profile">
                    <v-icon class="mr-2">settings</v-icon>
                    <span>Account</span>
                </v-list-item>
                <v-list-item href="/account/profile">
                    <v-icon class="mr-2">local_post_office</v-icon>
                    <span>Messages</span>
                </v-list-item>
                <v-list-item @click.prevent="logout" href="">
                    <v-icon class="mr-2">power_settings_new</v-icon>
                    <span>LogOut</span>
                </v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'

    export default {
      methods: {
        ...mapMutations([
          'LOGOUT'
        ]),
        logout() {
          this.LOGOUT()
          this.$router.push('/session/signin')
        }
      }
	}
</script>

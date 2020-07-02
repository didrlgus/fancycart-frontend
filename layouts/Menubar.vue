<template>
    <div>
        <!-- Start Navbar Area -->
        <div :class="['navbar-area', {'is-sticky': isSticky}]">
            <div class="comero-nav">
                <div class="container">
                    <nav class="navbar navbar-expand-md navbar-light">
                        <nuxt-link class="navbar-brand" to="/">
                            <img src="../assets/img/logo.png" alt="logo">
                        </nuxt-link>

                        <b-navbar-toggle target="navbarSupportedContent"></b-navbar-toggle>

                        <b-collapse class="collapse navbar-collapse" id="navbarSupportedContent" is-nav>
                            <ul class="navbar-nav">

                              <li class="nav-item p-relative"><a href="#" class="nav-link"><strong>상품 카테고리</strong><i class="fas fa-chevron-down"></i></a>
                                    <ul class="dropdown-menu">
                                        <li class="nav-item">
                                            <nuxt-link to="/" class="nav-link active">가방</nuxt-link>
                                        </li>

                                        <li class="nav-item">
                                            <nuxt-link to="/diction-two" class="nav-link active">신발</nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                            <nuxt-link to="/diction-three" class="nav-link active">시계</nuxt-link>
                                        </li>
                                        <li class="nav-item">
                                          <nuxt-link to="/diction-three" class="nav-link active">안경</nuxt-link>
                                        </li>
                                    </ul>
                                </li>

                                <li class="nav-item">
                                    <nuxt-link to="/cart" class="nav-link"><strong>주문내역</strong></nuxt-link>
                                </li>

                                <li class="nav-item">
                                    <nuxt-link to="/contact" class="nav-link"><strong>문의</strong></nuxt-link>
                                </li>
                            </ul>

                            <div class="others-option">
<!--                                <div class="option-item">-->
<!--                                    <nuxt-link to="/login">Login</nuxt-link>-->
<!--                                </div>-->
                                <div class="option-item">
                                    <a v-if="$auth.loggedIn" @click.prevent="toggle" href="#">
                                        Cart({{cart.length}}) <i class="fas fa-shopping-bag"></i>
                                    </a>
                                </div>
                            </div>
                        </b-collapse>
                    </nav>
                </div>
            </div>
        </div>
        <!-- End Navbar Area -->

        <SidebarPanel></SidebarPanel>
    </div>
</template>

<script>
import SidebarPanel from '../layouts/SidebarPanel';
import { mutations } from '../utils/sidebar-util';
export default {
    components: {
        SidebarPanel
    },
    data(){
        return {
            isSticky: false
        }
    },
    mounted(){
        const that = this;
        window.addEventListener('scroll', () => {
            let scrollPos = window.scrollY;
            if(scrollPos >= 100){
                that.isSticky = true;
            } else {
                that.isSticky = false;
            }
        })
    },
    computed: {
        cart(){
            return this.$store.getters.cart
        }
    },
    methods: {
        toggle() {
            mutations.toggleNav()
        }
    }
}
</script>

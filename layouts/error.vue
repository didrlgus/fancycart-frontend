<template>
    <div>
        <div class="page-title-area">
            <div class="container">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li>페이지를 찾을 수 없습니다.</li>
                </ul>
            </div>
        </div>

        <section class="error-area ptb-60">
            <div class="container">
                <div class="error-content">
                    <img src="../assets/img/404.png" alt="error">

                    <h3>Page Not Found</h3>
                    <p>잘못된 요청입니다.</p>

                    <nuxt-link to="/" class="btn btn-light">홈으로</nuxt-link>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props: ['error'],
    layout: 'error-layout'
}
</script>

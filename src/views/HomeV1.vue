<template>
    <div class="main">
        <div class="banner-wrap">
            <emb-home-main-banner-v3 :data="homeBannerV3Data"></emb-home-main-banner-v3>
        </div>
        <feature-v2 :data="featureV2Data"></feature-v2>
        <collection-gallery></collection-gallery>
        <shop-by-category :data="shopbyCategoryData" secTitle="Shop By Category"></shop-by-category>
        <emb-feature-product-v2	secTitle="New Products"	:data="featureProductV2Data"></emb-feature-product-v2>
        <banner></banner>
    </div>
</template>

<script>
  // layout components
  import HomeMainBannerV3 from "Components/Layouts/Banner/HomeMainBannerV3";
  // widgets
  import FeatureV2 from "Components/Widgets/FeatureV2";
  import CollectionGallery from "Components/Widgets/CollectionGallery";
  import ShopByCategory from "Components/Widgets/ShopByCategory";
  import FeatureProductV2 from "Components/Widgets/FeatureProductV2";
  import Banner from "Components/Widgets/BannerV1";

  // data
  import homeBannerV3Data from "Assets/data/homeBannerV3Data";
  import featureV2Data from "Assets/data/featureV2Data";
  import shopbyCategoryData from "Assets/data/shopbyCategoryData";
  import featureProductV2Data from "Assets/data/featureProductV2Data";

  export default {
    components: {
        embHomeMainBannerV3: HomeMainBannerV3,
        featureV2: FeatureV2,
        collectionGallery:CollectionGallery,
        ShopByCategory:ShopByCategory,
        embFeatureProductV2: FeatureProductV2,
        Banner: Banner,
    },
    data() {
      return {
        homeBannerV3Data,
        featureV2Data,
        shopbyCategoryData,
        featureProductV2Data
      }
    }
  }
</script>

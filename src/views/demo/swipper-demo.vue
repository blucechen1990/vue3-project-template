

<template>
   <div class="h-[500px] w-[400px] p-4 border test">
     <swiper
       :modules="modules"
       :slides-per-view="1"
       :space-between="50"
       :pagination="{ clickable: true }"
       :scrollbar="{ draggable: true }"
       @swiper="onSwiper"
       @slideChange="onSlideChange"
     >
       <swiper-slide >
        <div class="h-[100px]">Slide 1</div>
       </swiper-slide>
       <swiper-slide>
        <div class="h-[100px]">Slide 2</div>
       </swiper-slide>
       <swiper-slide>
        <div class="h-[100px]">Slide 3</div>
       </swiper-slide>
     </swiper>
   </div>
</template>
<script>
  // import Swiper core and required modules
  import { Navigation, Pagination, Scrollbar, A11y, Mousewheel  } from 'swiper/modules';

  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

 

  // Import Swiper styles
  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    setup() {
      const onSwiper = (swiper) => {
        console.log(swiper);
      };
      const onSlideChange = () => {
        console.log('slide change');
      };
      return {
        onSwiper,
        onSlideChange,
        modules: [Navigation, Pagination, Scrollbar, A11y, Mousewheel],
      };
    },
  };
</script>
<style  lang="scss" >
.test {
    // Import Swiper styles
    @import 'swiper/scss';
    @import 'swiper/scss/navigation';
    @import 'swiper/scss/pagination';
    @import 'swiper/scss/scrollbar';
    @import 'swiper/scss/mousewheel';

}
</style>
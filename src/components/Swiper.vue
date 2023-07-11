<template>
    <div class="carousel">
        <transition name="fade" mode="out-in">
            <img :src="currentSlide.image" :key="currentSlide.id" class="slide" alt="Slide Image" />
        </transition>
        <div class="pagination">
            <span :class="{ dot: true, active: index === currentIndex }" v-for="(slide, index) in slides" :key="slide.id"
                @click="goToSlide(index)"></span>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    data() {
        return {
            slides: [
                { id: 1, image: 'https://th.bing.com/th/id/R.774b9223b5a3526c61691fcc5ecb3145?rik=i7Rvf49CF7Zc4w&riu=http%3a%2f%2fseopic.699pic.com%2fphoto%2f50041%2f7432.jpg_wh1200.jpg&ehk=969PSODhgWgR359dXTJbOB4maXRx3XZ536jGL%2fUyUy0%3d&risl=&pid=ImgRaw&r=0' },
                { id: 2, image: 'https://th.bing.com/th/id/OIP.a_2XJOKnYxsnGU-tYazCWwHaF7?pid=ImgDet&rs=1' },
                { id: 3, image: 'https://th.bing.com/th/id/OIP.a_2XJOKnYxsnGU-tYazCWwHaF7?pid=ImgDet&rs=1' },
            ],
            currentIndex: ref(0),
        };
    },
    computed: {
        currentSlide() {
            return this.slides[this.currentIndex];
        },
    },

    mounted() {
        this.startSlideShow();
    },
    beforeUnmount() {
        this.stopSlideShow();
    },
    watch: {
        currentIndex() {
            this.stopSlideShow();
            this.startSlideShow();
        },
    },
    methods: {
        startSlideShow() {
            this.slideShowInterval = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            }, 3000);
        },
        stopSlideShow() {
            clearInterval(this.slideShowInterval);
        },
        goToSlide(index) {
            this.currentIndex = index;
        },
    },
});
</script>
  
<style scoped>
.carousel {
    position: relative;
    width: 100%;
    height: 400px;
}

.slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pagination {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #bbb;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dot.active {
    background-color: #333;
}
</style>
  
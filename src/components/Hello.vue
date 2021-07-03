<template>
  <div class="meme">
    <section class="greet show">
      <div class="greet-message">
        <h1 class="message"></h1>
      </div>
      <div class="greet-btn">
        <button @click="handleClickstart">Get your daily meme</button>
      </div>
    </section>

    <section class="select">
      <div class="title">
        <h1>Pick a keyword!</h1>
      </div>

      <div class="category-wrapper">
        <Category
          v-for="(category, index) in categories"
          :key="index"
          :title="category.searchterm"
          :image="category.image"
          @select="selectCategory"
        ></Category>
      </div>
    </section>

    <section class="result">
      <button class="result-btn result-btn--goback" @click="goBackToSelect">GO BACK TO CATEGORY</button>

      <div class="title">
        <h1>It's for you!</h1>
        <h1>Is this the {{ selectedCategory }} meme what you wanted?</h1>
      </div>

      <div class="result-wrapper">
        <img src="" />
      </div>

      <div class="result-action">
        <button class="result-btn result-btn--copylink" @click="CopyShareUrl">Copy Share URL</button>
        <div class="tooltip">Copied to Clipboard</div>
      </div>
    </section>
  </div>
</template>

<script lang="js">
import { defineComponent, ref, onMounted } from 'vue';
import Category from './Category.vue'
import axios from 'axios'
import categoryUseCase from '../UseCase/categoryUseCase'
import memeUseCase from '../UseCase/memeUseCase'
import userUseCase from '../UseCase/userUseCase'

export default defineComponent({
  name: 'Hello',
  components: {
    Category,
  },
  data() {
    return {
      selectedCategory: '',
      meme: ''
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      memeUseCase.getMeme(this.selectedCategory, this.meme)
    },
    goBackToSelect() {
      userUseCase.goBackToSelect();
    },
    CopyShareUrl() {
      memeUseCase.copyUrl();
    }
  },
  setup() {
    const categories = ref([]);

    onMounted(() => {
      userUseCase.showGreetMessage(`Hello everyone.Please choose a keyword that fits your mood. Here's a meme for you.`)
      categoryUseCase.getCategoryList(categories);
    })

    const handleClickstart = () => {
      userUseCase.start()
    };

    const handleClickCategoryItem = () => {
      userUseCase.showResult();
    };


    return { categories, handleClickstart };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
section {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 1s ease;
  &.show {
    opacity: 1;
  }
}

section.greet {
  bottom: 0;
}

.greet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: rgba(#000, 0.9);
  &-message {
    margin-bottom: 2rem;
    h1 {
      margin: 0;
      color: #fff;
      line-height: 2;
    }
  }
  &-btn {
    opacity: 0;
    transition: opacity 1.5s ease;
    z-index: -1;
    &.show {
      opacity: 1;
      z-index: 1;
    }
    button {
      border: none;
      background-color: transparent;
      color: #da0037;
      font-weight: bold;
      font-size: 2rem;
      cursor: pointer;
      height: 3rem;
      transition: font-size 0.3s ease;
      &:hover {
        font-size: 2.4rem;
      }
    }
  }
}

.select,
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem 2rem;
  background-color: rgba(218, 0, 55, 0.9);
  &.show {
    opacity: 1;
    z-index: 1;
  }
  .title {
    margin-bottom: 2rem;
    h1 {
      margin: 0;
      color: #171717;
      font-weight: 900;
    }
  }
  .category-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
}

.result {
  background-color: rgba(#000, 0.9);
  &.show {
    opacity: 1;
    z-index: 1;
  }
  canvas {
    position: absolute;
    z-index: -1;
  }
  .title {
    h1 {
      color: #fff;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    img {
      display: none;
      &.show {
        display: block;
      }
    }
  }
  &-action {
    position: relative;
    width: 100%;
    .tooltip {
      position: absolute;
      top: -130%;
      left: 50%;
      padding: 0.1rem 0.4rem;
      transform: translateX(-50%);
      background-color: #fff;
      color: teal;
      border-radius: 0.5rem;
      opacity: 0;
      transition: opacity 0.5s ease;
      &.show {
        opacity: 1;
      }
    }
  }
  &-btn {
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: transparent;
    &.result-btn--goback {
      position: absolute;
      top: 10%;
      left: 10%;

      color: rgba(218, 0, 55, 1);
      transition: transform 0.7s ease;
      &:hover {
        transform: scale(1.3);
      }
    }
    &.result-btn--download,
    &.result-btn--copylink {
      color: #fff;
      font-size: 1.1rem;
      background-color: teal;
    }
  }
}
</style>

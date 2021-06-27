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

      <canvas></canvas>

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
export class BallMovingCanvas {
  constructor(src) {
    this.canvas = document.querySelector('section.result canvas');
    this.ctx = this.canvas.getContext('2d');

    window.addEventListener('resize', this.resize.bind(this), false);

    this.resize();
    this.balls = [];
    for (let i = 0; i < 15; i++) {
      this.balls.push(new Ball(this.stageWidth, this.stageHeight, 30, 5))
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }


  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.balls.forEach(ball => {
      ball.draw(this.ctx, this.stageWidth, this.stageHeight);
    })
  }
}


export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.x = diameter + (Math.random() * stageWidth - diameter);
    this.y = diameter + (Math.random() * stageHeight - diameter);
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);

    ctx.fillStyle = '#fdd700';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }
}


import { defineComponent, ref, onMounted } from 'vue';
import Category from './Category.vue'
import axios from 'axios'


export default defineComponent({
  name: 'Hello',
  components: {
    Category,
  },
  data() {
    return {
      selectedCategory: '',
    }
  },
  methods: {
    selectCategory(category) {
      if (this.meme.value !== undefined) return;
      const selectSection = document.querySelector('section.select');
      const resultSection = document.querySelector('section.result');

      selectSection.classList.remove('show');
      resultSection.classList.add('show');

      axios.get(`https://g.tenor.com/v1/search?q=${category}&key=LIVDSRZULELA&limit=50`)
           .then(res => {
              const result = res.data.results[Math.floor(Math.random() * 50)].media[0].tinygif.url
              const img = document.querySelector('.result-wrapper img')
              img.classList.add('show');
              img.src = result;

              this.selectedCategory = category;

              new BallMovingCanvas();
           })
    },
    goBackToSelect() {
      const img = document.querySelector('.result-wrapper img')
      img.classList.remove('show');
      img.src = '';


      const selectSection = document.querySelector('section.select');
      const resultSection = document.querySelector('section.result');

      selectSection.classList.add('show');
      resultSection.classList.remove('show');
    },
    CopyShareUrl() {
      const tooltip = document.querySelector('.tooltip');
      tooltip.classList.add('show');
      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 1000);

      const src = document.querySelector('.result-wrapper img').src
      var dummy   = document.createElement("input");
      var text    = src;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    }
  },
  setup() {
    const message = ref('Hello everyone.Please choose a keyword that fits your mood. Here\'s a meme for you.');
    const categories = ref([]);
    const meme = ref('');


    onMounted(async () => {
      const greetMessage = document.querySelector('.greet-message .message');
      const messages = message.value.split('');
      let index = 0;

      let interval = setInterval(() => {
        greetMessage.innerHTML += messages[index++];
        if (messages[index -1] === '.') greetMessage.innerHTML += '<br>'
        if (messages.length === index) {
          const button = document.querySelector('.greet-btn');
          button.classList.add('show');
          clearInterval(interval);
        }
      }, 50);

      getCategories();
    })

    const getCategories = async () => {
      const res = await axios.get('https://g.tenor.com/v1/categories?key=LIVDSRZULELA')

      if (!res.data.error) {
        res.data.tags.forEach((tag => {
          categories.value.push(tag)}))
      }
    }

    const handleClickstart = () => {
      const greetSection = document.querySelector('section.greet');
      const selectSection = document.querySelector('section.select');

      greetSection.classList.remove('show');
      selectSection.classList.add('show');
    };

    const handleClickCategoryItem = () => {
      const selectSection = document.querySelector('section.select');
      const resultSection = document.querySelector('section.result');

      selectSection.classList.remove('show');
      resultSection.classList.add('show');
    };


    return { message, categories, meme, handleClickstart };
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

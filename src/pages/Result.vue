<template>
  <div class="wrapper">
    <header>
      <router-link to="/select" class="btn">Back to Select</router-link>
      <h2>BOoYAH!</h2>
    </header>

    <div class="content">
      <div>
        <div class="title">
          <h1>It's for you!</h1>
          <h1>
            Is this the <span style="color: rgba(218, 0, 55, 1)">{{ category }}</span> meme what you wanted?
          </h1>
        </div>

        <img :src="meme.gifUrl" />
      </div>
      <div class="action">
        <button class="action-btn action-btn--copylink" @click="copyUrl">Copy Share URL</button>
        <div class="tooltip">Copied to Clipboard</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MemeUsecase from "@/usecases/MemeUsecase";

export default defineComponent({
  name: "Result",
  data() {
    return {
      category: "" as any,
      meme: {} as any,
    };
  },
  methods: {
    copyUrl() {
      const tooltip: any = document.querySelector(".tooltip");
      tooltip.classList.add("show");
      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 1000);

      const src = this.meme.gifUrl;
      var dummy = document.createElement("input");
      var text = src;

      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
  },
  async mounted() {
    this.category = this.$route.query.category;
    this.meme = await new MemeUsecase().get(this.category);
    console.log(this.meme.gifUrl);
  },
});
</script>

<style scoped lang="scss">
.action {
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

  &-btn {
    border: none;
    cursor: pointer;
    font-weight: bold;
    background: transparent;

    &.action-btn--copylink {
      color: #fff;
      font-size: 1.1rem;
      background-color: teal;
    }
  }
}
</style>

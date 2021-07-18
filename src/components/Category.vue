<template>
  <div class="category">
    <router-link :to="'/result?category=' + term">
      <div class="content">
        <img :src="gifUrl" />
      </div>
      <div class="title">
        <h3>{{ term }}</h3>
      </div>
    </router-link>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Category',
  props: {
    term: String,
    gifUrl: String,
  }
});
</script>

<style scoped lang="scss">
.category {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  & ~ & {
    margin: 10px;
  }
}
.title {
  margin-bottom: 0.2rem;
  h3 {
    margin: 0;
    font-weight: bold;
    color: #000;
  }
}
.content {
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

<template>
  <div class="category" v-on:click="$emit('select', title)">
    <div class="content">
      <img :src="image" />
    </div>
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Category',
  props: ['title', 'image', 'select']
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

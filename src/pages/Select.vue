<template>
  <div class="wrapper">
    <header>
      <router-link to="/" class="btn">Back to Home</router-link>
      <h2>Select a category</h2>
    </header>
    <div class="content">
      <Category v-for="(category, index) in categories" :key="index" :term="category.term" :gifUrl="category.gifUrl"></Category>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Category from "@/components/Category.vue";
import CategoryUsecase from "@/usecases/CategoryUsecase";
import { CategoryRepositoryImpl } from "@/repositories/CategoryRepository";

interface CategoryType {
  term: string;
  gifUrl: string;
}

export default defineComponent({
  name: "Select",
  components: { Category },
  data() {
    return {
      categories: [] as Array<CategoryType>,
    };
  },
  async mounted() {
    const data: any = await new CategoryUsecase(new CategoryRepositoryImpl()).getAll();
    data.forEach((item: any) => this.categories.push(item));
  },
});
</script>

<style lang="scss">
header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
  .btn {
    position: absolute;
    left: 0;
    font-size: 1rem;
  }
}
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 80%;
  overflow: scroll;
}
</style>

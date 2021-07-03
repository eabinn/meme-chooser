<template>
  <Hello></Hello>
</template>

<script lang="js">
import { defineComponent } from "vue";
import Hello from "@/components/Hello.vue";

export default defineComponent({
  name: "App",
  components: { Hello },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

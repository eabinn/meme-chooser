<template>
  <div class="wrapper">
    <router-link to="/select" class="btn">Select</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100vh;
}
.btn {
  text-decoration: none;
  background-color: #000;
  color: #fff;
  font-weight: bold;
  font-size: 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.3rem;
  transition: transform 0.4s ease;
  &:hover {
    transform: scale(1.2);
  }
}
</style>

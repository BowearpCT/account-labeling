<template>
  <div class="about">
    <Nav />
    <h1>This is an user page</h1>
    <b-button @click="goLabelling">labelling</b-button>
  </div>
</template>

<script>
import Nav from "../components/Nav";
export default {
  components: {
    Nav
  },
  methods: {
    goLabelling() {
      this.$router.push("/labelling");
    }
  }
};
</script>

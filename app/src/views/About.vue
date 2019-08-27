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
    async goLabelling() {
      await this.$store.dispatch("labels", { category: "type of profile" });
      setTimeout(() => {
        this.$router.push("/labelling");
      }, 1000);
    }
  }
};
</script>

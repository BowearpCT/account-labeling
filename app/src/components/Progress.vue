<template>
  <div>
    <!-- <router-link to="/assign">assign</router-link> -->
    <!-- <router-link to="/about">About</router-link> -->
    <b-button @click="assign">assign</b-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    assign() {
      this.$store.dispatch("fetcherUsers");
      this.$router.push("/assign");
    }
  }
};
</script>

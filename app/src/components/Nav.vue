<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand style="color:white;" href="#" @click="redirectDash">Source Labeling</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em style="color:white;">{{ user.username }}</em>
            </template>
            <b-dropdown-item style="color:white;" href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signout">logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    signout() {
      this.$store.dispatch("signOut");
      this.$router.push("/login");
    },
    redirectDash() {
      setTimeout(() => {
        this.$store.commit("clearCategory");
        this.$store.commit("clearLabels");
        this.$router.push("/dashboard");
      }, 500);
    }
  }
};
</script>

<style lang="scss">
.navbar {
  background-color: #101820;
  color: white;
}
</style>
<template>
  <div>
    <b-navbar toggleable="lg">
      <b-navbar-brand style="color:white;" href="#" @click="redirectDash"><b>Source Labelling</b></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a @click="goDashboard" style="color:white;" class="nav-link" href="#">Dashboard<span class="sr-only">(current)</span></a>
            </li>
            <li v-show="user.role==1" class="nav-item">
              <a @click="goSearch" style="color:white;" class="nav-link" href="#">Search</a>
            </li>
          </ul>
        </b-navbar-nav> 
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em ><b>{{ user.username }}</b></em>
            </template>
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
  data(){
    return {
    }
  },
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
    },
    goSearch(){
      this.$router.push("/search")
    },
    goDashboard(){
      this.$router.push("/dashboard")
    }
    
  }
};
</script>

<style lang="scss">
.navbar {
  background-color: #101820;
  color: white;
}
em{
  color:white;
}
</style>
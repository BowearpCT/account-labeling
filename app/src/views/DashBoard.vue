<template>
  <div class="assign">
    <Nav />
    <br />
    <br />
    <br />
    <b-container fluid>
      <b-row>
        <b-col offset-md="2" md="8">
          <b-row>
            <h3>Dash Board</h3>
          </b-row>
          <hr />
          <b-row v-show="assignments">
            <b-col v-for="(assignment, index) in assignments" :key="index" cols="6" md="4">
              <Progress v-bind:assignment="{assignment}"></Progress>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Nav.vue";
import Progress from "@/components/Progress.vue";
export default {
  data() {
    return {};
  },
  components: {
    Nav,
    Progress
  },
  computed: {
    assignments() {
      return this.$store.getters.assignments;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getAssignments();
  },
  methods: {
    getAssignments() {
      this.$store.dispatch("assignments");
    }
  }
};
</script>


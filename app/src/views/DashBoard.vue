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
            <h3>Dashboard</h3>
          </b-row>
          <b-row>
            <b-col md="3">
              <multiselect
                @select="userAssignments"
                v-model="value"
                deselect-label="remove this value"
                track-by="name"
                label="name"
                placeholder="Select user"
                :options="users"
                :searchable="false"
                :allow-empty="false"
              ></multiselect>
            </b-col>
            <b-col md="2">
              <b-col lg="4" class="pb-2">
                <b-button variant="outline-info" @click="goAssignment">add assignment</b-button>
              </b-col>
            </b-col>
          </b-row>
          <hr />
          <b-row v-show="assignments">
            <b-col
              v-for="(assignment, index) in assignments"
              :key="index"
              sm="12"
              md="6"
              lg="4"
              xl="4"
            >
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
import Multiselect from "vue-multiselect";
export default {
  data() {
    return {
      value: {}
    };
  },
  components: {
    Nav,
    Progress,
    Multiselect
  },
  computed: {
    assignments() {
      return this.$store.getters.assignments;
    },
    user() {
      return this.$store.getters.user;
    },
    users() {
      return this.$store.getters.users;
    }
  },
  created() {
    this.getusers();
    this.getAssignments();
  },
  methods: {
    getAssignments() {
      this.$store.dispatch("assignments");
    },
    getusers() {
      this.$store.dispatch("fetcherUsers");
    },
    goAssignment() {
      this.$router.push("/assign");
    },
    async userAssignments() {
      setTimeout(() => {
        this.$store.dispatch("assignments", this.value.id);
      }, 100);
    }
  }
};
</script>


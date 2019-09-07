<template>
  <div class="assign">
    <Nav />
    <br />
    <b-container fluid>
      <b-row align-h="start">
        <b-col offset="1" cols="10">
          <b-row>
            <b-col cols="5">
              <h1>assignment management</h1>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="5">
              <b-form-group></b-form-group>
            </b-col>
          </b-row>
          <b-row align-h="between">
            <b-col cols="3">
              <b-form-group>
                <multiselect
                  @select="userAssignments"
                  @remove="userAssignments"
                  v-model="value"
                  :options="users"
                  placeholder="Filter user"
                  label="name"
                  track-by="name"
                  :searchable="false"
                ></multiselect>
              </b-form-group>
            </b-col>
            <b-col cols="1">
              <b-form-group>
                <b-button variant="danger">+</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="10">
          <b-table head-variant="danger" striped hover :items="assignments"></b-table>
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
      fields: [
        {
          key: "last_name",
          sortable: true
        },
        {
          key: "first_name",
          sortable: false
        },
        {
          key: "age",
          label: "Person age",
          sortable: true,
          // Variant applies to the whole column, including the header and footer
          variant: "danger"
        }
      ],
      value: null
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
        this.$store.dispatch("assignments", this.value);
      }, 100);
    }
  }
};
</script>

<style lang="css">
</style>

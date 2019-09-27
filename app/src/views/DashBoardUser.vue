<template>
  <div class="assign">
    <Nav />
    <br />
    <br />
    <br />
    <b-container fluid>
      <b-row align-h="start">
        <b-col offset="1" cols="10">
          <b-row>
            <b-col>
              <h1>Assignment</h1>
            </b-col>
          </b-row>
          <hr />
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="10">
          <assignmentTable />
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
import assignmentTable from "@/components/assignmentTable.vue";
export default {
  data() {
    return {
      value: {},
      options: [],
      userId: {
        id: null
      },
      labelId: "",
      channel: ""
    };
  },
  components: {
    Nav,
    Progress,
    Multiselect,
    assignmentTable
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
      // this.$store.dispatch("assignments", this.user.id);
      this.userId.id = this.user.id;
      this.$store.dispatch("assignments", {
        userId: this.userId,
        labelId: this.labelId,
        channel: this.channel
      });
    },
    userAssignments() {
      setTimeout(() => {
        this.$store.dispatch("assignments", this.value.id);
      }, 100);
    }
  }
};
</script>


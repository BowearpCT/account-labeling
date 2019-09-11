<template>
  <div class="assign">
    <Nav />
    <br />
    <b-container fluid>
      <b-row align-h="start">
        <b-col offset="1" cols="10">
          <b-row>
            <b-col>
              <h1>Assignment Management</h1>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col>
              <b-form-group>
                <label>
                  <h6>category</h6>
                </label>
                <b-form-radio-group id="radio-group-2" v-model="labelId" name="radio-sub-component">
                  <b-form-radio value>all</b-form-radio>
                  <b-form-radio
                    v-for="(category, index) in categories"
                    :key="index"
                    :value="category.id"
                  >{{category.name}}</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <label>
                  <span>
                    <h6>channel</h6>
                  </span>
                </label>
                <b-form-radio-group
                  id="radio-group-2"
                  v-model="channel"
                  :options="channels"
                  name="radio-options-2"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row align-h="between">
            <b-col cols="11">
              <b-row align-h="start">
                <b-col cols="5"></b-col>
                <b-col cols="5"></b-col>
                <b-col cols="1"></b-col>
              </b-row>
              <b-row align-h="start">
                <b-col cols="3">
                  <b-form-group>
                    <multiselect
                      v-model="value"
                      :options="users"
                      placeholder="Filter user"
                      label="name"
                      track-by="name"
                      :searchable="false"
                    ></multiselect>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="1">
              <b-form-group>
                <b-button @click="goAssignment" style="background-color:#ba0020;">add</b-button>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="10">
          <tableComponent />
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
import tableComponent from "@/components/assignmentTable.vue";
export default {
  data() {
    return {
      channel: "",
      labelId: "",
      value: "",
      channels: [
        { text: "all", value: "" },
        { text: "facebook", value: "facebook" },
        { text: "instagram", value: "instagram" },
        { text: "twitter", value: "twitter" },
        { text: "youtube", value: "youtube" }
      ],
      fields: [
        {
          key: "id",
          sortable: true
        },
        {
          key: "category",
          sortable: true
        },
        {
          key: "channel",
          sortable: true
        },
        {
          key: "assignTo",
          label: "assign to",
          sortable: true
        },
        {
          key: "progress",
          label: "progress"
        },
        "actions"
      ]
    };
  },
  components: {
    Nav,
    Progress,
    Multiselect,
    tableComponent
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
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  watch: {
    value() {
      this.userAssignments();
    },
    labelId() {
      this.userAssignments();
    },
    channel() {
      this.userAssignments();
    }
  },
  created() {
    this.getusers();
    this.getAssignments();
    this.getCategories();
  },
  methods: {
    getCategories() {
      this.$store.dispatch("fetchCategories");
    },
    getAssignments() {
      this.$store.dispatch("assignments");
    },
    getusers() {
      this.$store.dispatch("fetcherUsers");
    },
    goAssignment() {
      this.$router.push("/assign");
    },
    userAssignments() {
      setTimeout(() => {
        this.$store.dispatch("assignments", {
          userId: this.value,
          labelId: this.labelId,
          channel: this.channel
        });
      }, 100);
    }
  }
};
</script>

<style lang="scss" >
h1,
h6 {
  text-align: left;
}
.form-group {
  text-align: left;
}
</style>

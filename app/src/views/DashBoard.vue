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
              <h3>Filter</h3>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group>
                <label>
                  <h6><b>category</b></h6>
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
                    <h6><b>channel</b></h6>
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
          <b-row>
            <b-col>
              <h6><b>user</b></h6>
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
                  <b-form-select v-model="value" class="mb-3">
                    <option value="">select all</option>
                    <option v-for="(user, index) in users" :key="index" :value="user" >{{user.name}}</option>
                  </b-form-select>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="1">
              <b-form-group>
                <b-button @click="goAssignment" size="lg" style="background-color:#335377; border-radius: 25px;">+</b-button>
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
      console.log(this.value)
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
    getusers() {
      this.$store.dispatch("fetcherUsers");
    },
    getCategories() {
      this.$store.dispatch("fetchCategories");
    },
    getAssignments() {
      this.$store.dispatch("assignments");
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
h1,h3,
h6 {
  text-align: left;
}
.form-group {
  text-align: left;
}

</style>

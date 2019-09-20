<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th v-for="(item, index) in fields" :key="index" scope="col">{{item}}</th>
          <th v-if="user.role==1">delete</th>
          <th v-else-if="user.role==2">go label</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(assignment, index) in assignments" :key="index">
          <th v-if="assignment.status == 'enable'" scope="row">{{assignment.id}}</th>
          <td v-if="assignment.status == 'enable'">{{assignment.assignTo}}</td>
          <td v-if="assignment.status == 'enable'">{{assignment.category}}</td>
          <td v-if="assignment.status == 'enable'">
            <tag :channel="assignment.channel"></tag>
          </td>
          <td v-if="assignment.status == 'enable'">{{assignment.progress}}</td>
          <td v-if="assignment.status == 'enable'">
            <button v-if="user.role==1" class="btn btn-sm" @click="showModal(assignment)">
              <img src="https://img.icons8.com/color/25/000000/delete-forever.png" />
            </button>
            <button v-else-if="user.role==2" class="btn btn-sm" @click="goLabelling(assignment)">
              <img src="https://img.icons8.com/officel/25/000000/to-do.png" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-modal ref="modal" hide-footer title="Warning!">
      <div class="d-block container">
        <h6>you want to delete assignment</h6>
      </div>
      <b-row align-h="between">
        <b-col>
          <b-button class="mt-3" @click="deleteAssignment" block variant="outline-danger">Confirm</b-button>
        </b-col>
        <b-col>
          <b-button
            class="mt-3"
            block
            @click="hideModal"
            variant="danger"
            style="background-color: #ba0020;"
          >Reject</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import tag from "./TagSocialmedia.vue"
export default {
  data() {
    return {
      fields: ["id", "assign to", "category", "channel", "progress"],
      selectedAssignment: null
    };
  },
  components:{
    tag
  },
  computed: {
    assignments() {
      return this.$store.getters.assignments;
    },
    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    async deleteAssignment() {
      console.log(this.selectedAssignment.id);
      await this.$store.dispatch(
        "deleteAssignment",
        this.selectedAssignment.id
      );
      window.location.reload(true);
    },
    goLabelling(value) {
      console.log(value);
      this.$store.commit("setIndex", value.startPoint)
      this.$store.commit("setTotal", value.total)
      this.$store.dispatch("getAcoountBooking", value.id);
      this.$store.dispatch("labels", value.category);
      setTimeout(() => {
        this.$router.push("/labelling");
        window.location.reload(true);
      }, 500);
    },
    showModal(value) {
      this.$refs["modal"].show();
      this.selectedAssignment = value;
    },
    hideModal() {
      this.$refs["modal"].hide();
    }
  }
};
</script>

<style lang="scss" scoped>
thead {
  background-color: white;
  color: black;
  padding: 2px;
  box-shadow: 0.5px 0.5px 0.5px 0.5px rgb(214, 212, 212);
}
</style>

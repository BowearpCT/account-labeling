<template>
  <div>
    <b-row>
      <b-col md="4">
        <h1>Labelling</h1>
      </b-col>
    </b-row>
    <hr />
    <b-form @submit.stop.prevent>
      <b-row>
        <b-col>
          <!-- <div
            class="fb-page"
            data-tabs="timeline"
            data-href="https://www.facebook.com/sompondofficial"
            data-width="380"
            data-hide-cover="false"
          ></div>-->
          <!-- <a
            class="twitter-timeline"
            href="https://twitter.com/TwitterDev?ref_src=twsrc%5Etfw"
          >Tweets by TwitterDev</a>-->
        </b-col>
        <b-col></b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="12">
          <b-button type="submit" @click="showModal" size="lg" variant="danger">submit</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-modal ref="my-modal" hide-footer title="your assignment details">
      <div class="d-block container">
        <h6>assign to : {{ userSelected ? userSelected.name : ""}}</h6>
        <h6>category : {{ category }}</h6>
        <h6>total : {{ numberOfAccout }}</h6>
        <h6>channel : {{channel}}</h6>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Reject</b-button>
      <b-button class="mt-2" variant="outline-info" block @click="assignment">Confirm</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: null,
      userSelected: null,
      numberOfAccout: "100",
      channel: null,
      category: null,
      index: null
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {
    assignment() {
      const assignment = {};
      assignment.userId = this.userSelected.id;
      assignment.category = this.category;
      assignment.channel = this.channel;
      assignment.total = this.numberOfAccout;
      this.$store.dispatch("assignment", assignment);
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    callIndex() {
      return this.userSelected;
    }
  }
};
</script>

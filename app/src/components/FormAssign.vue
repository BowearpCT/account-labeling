<template>
  <div>
    <b-row>
      <b-col >
        <h1>Assignment</h1>
      </b-col>
    </b-row>
    <hr />
    <b-form @submit.stop.prevent>
      <b-row align-h="start">
        <b-col cols="3">
          <b-form-group label="Assign to :"></b-form-group>
        </b-col>
        <b-col cols="3">
          <b-form-select
            id="input-username"
            v-model="$v.form.userSelected.$model"
            :state="$v.form.userSelected.$dirty ? !$v.form.userSelected.$error : null"
          >
            <template slot="first">
              <option :value="null" disabled>-- Please select user --</option>
            </template>
            <option v-for="person in users" :value="person" :key="person.id">{{ person.name }}</option>
          </b-form-select>
        </b-col>
      </b-row>
      <br />
      <b-row align-h="start">
        <b-col md="3">
          <b-form-group label="Category :"></b-form-group>
        </b-col>
        <b-col md="9">
          <b-form-radio-group
            id="radio-group-2"
            v-model="$v.form.category.$model"
            name="radio-sub-component"
            :state="$v.form.category.$dirty ? !$v.form.category.$error : null"
          >
            <b-form-radio v-for="(item, index) in categories" :key="index" :value="item.name">{{item.name}}</b-form-radio>
          </b-form-radio-group>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="3">
          <b-form-group
            id="fieldset-horizontal"
            label="numbers account :"
            label-for="input-username"
          ></b-form-group>
        </b-col>
        <b-col md="2">
          <b-input
            v-model="$v.form.numberOfAccout.$model"
            :state="$v.form.numberOfAccout.$dirty ? !$v.form.numberOfAccout.$error : null"
          ></b-input>
        </b-col>
        <b-col md="3">
          <b-form-group id="fieldset-horizontal" label="channel :" label-for="input-username"></b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-select
            v-model="$v.form.channel.$model"
            :state="$v.form.channel.$dirty ? !$v.form.channel.$error : null"
          >
            <option :value="null" disabled>select channel</option>
            <option value="twitter">twitter</option>
            <option value="instagram">instagram</option>
            <option value="facebook">facebook</option>
            <option value="youtube">youtube</option>
          </b-form-select>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="3">
          <b-form-group id="fieldset-horizontal" label="Filter :" label-for="input-horizontal"></b-form-group>
        </b-col>
        <b-col md="5">
          <b-form-input v-model="form.filters" placeholder="what things your filter"></b-form-input>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <b-form-group></b-form-group>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="12">
          <b-button
            type="submit"
            @click="showModal"
            size="lg"
            style="background-color :#ba0020; "
          >submit</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-modal ref="my-modal" hide-footer title="your assignment details">
      <div class="d-block container">
        <h6>assign to : {{ form.userSelected ? form.userSelected.name : ""}}</h6>
        <h6>category : {{ form.category }}</h6>
        <h6>total : {{ form.numberOfAccout }}</h6>
        <h6>channel : {{form.channel}}</h6>
      </div>
      <b-row align-h="between">
        <b-col>
          <b-button class="mt-3" block @click="hideModal" variant="outline-danger">Reject</b-button>
        </b-col>
        <b-col>
          <b-button
            class="mt-3"
            block
            @click="assignment"
            variant="danger"
            style="background-color: #ba0020;"
          >Confirm</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
const { validationMixin, default: Vuelidate } = require("vuelidate");
const { required, minLength } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        filters: null,
        userSelected: null,
        numberOfAccout: "100",
        channel: null,
        category: null
      }
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  validations: {
    form: {
      userSelected: {
        required
      },
      numberOfAccout: {
        required
      },
      channel: {
        required
      },
      category: {
        required
      }
    }
  },
  methods: {
    assignment() {
      const assignment = {};
      assignment.userId = this.form.userSelected.id;
      assignment.category = this.form.category;
      assignment.channel = this.form.channel;
      assignment.total = this.form.numberOfAccout;
      this.$store.dispatch("assignment", assignment);
    },
    showModal() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
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

<style lang="scss">
.btn {
  .btn-outline-danger {
    background-color: #ba0020;
  }
}
</style>
<template>
  <div>
    <b-row>
      <b-col md="4">
        <h1>Assignment</h1>
      </b-col>
    </b-row>
    <hr />
    <b-form @submit.stop.prevent>
      <b-row align-h="start">
        <b-col md="3">
          <b-form-group label="Assign to :"></b-form-group>
        </b-col>
        <b-col md="3">
          <b-form-select id="input-username" v-model="userSelected">
            <template slot="first">
              <option :value="null" disabled>-- Please select user --</option>
            </template>
            <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
          </b-form-select>
        </b-col>
      </b-row>
      <br />
      <b-row align-h="start">
        <b-col md="3">
          <b-form-group label="Category :"></b-form-group>
        </b-col>
        <b-col md="9">
          <b-form-radio-group id="radio-group-2" v-model="category" name="radio-sub-component">
            <b-form-radio value="type of profile">Type of profile</b-form-radio>
            <b-form-radio value="interest">Interest</b-form-radio>
            <b-form-radio value="third">This one is Disabled</b-form-radio>
            <b-form-radio :value="{ fourth: 4 }">This is the 4th radio</b-form-radio>
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
          <b-input v-model="numberOfAccout"></b-input>
        </b-col>
        <b-col md="3">
          <b-form-group id="fieldset-horizontal" label="channel :" label-for="input-username"></b-form-group>
        </b-col>
        <b-col md="2">
          <b-form-select v-model="channel">
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
          <b-form-input v-model="filters" placeholder="what things your filter"></b-form-input>
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
          <b-button type="submit" size="lg" variant="danger">submit</b-button>
        </b-col>
      </b-row>
    </b-form>
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
      category: null
    };
  },
  computed: {
    users() {
      return this.$store.getters.users;
    }
  },
  methods: {}
};
</script>

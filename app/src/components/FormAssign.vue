<template>
  <div>
    <b-row>
      <b-col md="4">
        <h1>Assignment</h1>
      </b-col>
    </b-row>
    <hr>
    <b-form @submit.stop.prevent>
      <b-row>
        <b-col md="3">
        <b-form-group
          id="fieldset-horizontal"
          label="Assign to :"
          label-for="input-username"
        >
        </b-form-group>
        </b-col>
        <b-col md="5">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-col>
        <b-col md="4">
          <b-form-select v-model="numberOfAccout"  class="mb-3">
            <option value="null">number of account</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </b-form-select>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="3">
          <b-form-group
            id="fieldset-horizontal"
            label="Category :"
            label-for="input-horizontal"
          >
          </b-form-group>
        </b-col>
        <b-col md="8">
          <b-form-group>
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="selected"
              :options="options"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col md="3">
          <b-form-group
            id="fieldset-horizontal"
            label="Filter :"
            label-for="input-horizontal"
          >
          </b-form-group>
        </b-col>
        <b-col md="5">
          <b-form-input >
          </b-form-input>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="9">
          <b-button type="submit" size="md" variant="danger">
            Login
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
      options: [
        { value: null, text: "Type of profile" },
        { value: 'a', text: "Interest" },
        { value: 'a', text: "Interest" },
        { value: 'a', text: "Interest" },
        { value: 'a', text: "Interest" },
      ],
      numberOfAccout: "",
    }
    
  },
  computed: {
    
  },
  methods: {

  }
};
</script>

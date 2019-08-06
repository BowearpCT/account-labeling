<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-img
          src="https://marketingmagazine.com.my/wp-content/uploads/2018/09/wisesight6.png"
          fluid
          alt=""
        >
        </b-img>
      </b-col>
    </b-row>
    <b-form @submit.stop.prevent>
      <b-row>
        <b-col>
          <b-form-group
            id="fieldset-horizontal"
            description=""
            label-align-md="left"
            label-cols-lg="3"
            label="username"
            label-for="input-horizontal"
          >
            <b-form-input
              type="text"
              id="input-horizontal"
              required
              v-model="username"
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="fieldset-horizontal"
            description=""
            label-align-md="left"
            label-cols-lg="3"
            label="password"
            label-for="input-horizontal"
          >
            <b-form-input
              id="input"
              type="password"
              required
              v-model="password"
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="9">
          <b-button type="submit" @click="signIn" size="md" variant="danger">
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
      username: "",
      password: ""
    };
  },
  computed: {
    jwtToken: function() {
      return this.$store.getters.jwtToken;
    }
  },
  methods: {
    signIn: async function() {
      this.$store.dispatch("signIn", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

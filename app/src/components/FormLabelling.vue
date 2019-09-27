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
        <b-col v-show="accounts">
          <b-card v-if="accounts[index].account.channel_id == 1" style="max-width: 540px;">
            <FacebookEmbed :accountId="accounts[index].account.account_id" />
          </b-card>
          <b-card v-else-if="accounts.account.channel_id == 2" style="max-width: 540px;">
            <TwitterEmbed :accountId="accounts[index].account.account_id" />
          </b-card>
        </b-col>
        <b-col>
          <b-row align-h="center">
            <h5>Main category : {{ category }}</h5>
          </b-row>
          <hr />
          <br />
          <b-row>
            <multiselect
              @remove="removeDescendents"
              @select="getAncestor"
              v-model="values"
              :options="labels"
              :multiple="true"
              :taggable="false"
              :close-on-select="false"
              :clear-on-select="true"
              :hide-selected="true"
              :preserve-search="true"
              placeholder="Pick some"
              label="name"
              track-by="name"
            ></multiselect>
          </b-row>
          <br />
          <b-row align-h="between">
            <b-col cols="auto">
              <!-- <b-button type="submit" size="md" @click="decreateIndex" variant="outline-danger">Back</b-button>&nbsp; -->
            </b-col>
            <b-col cols="auto">
              <b-button type="submit" size="md" @click="goNext" variant="danger">Save & Next</b-button> 
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <br />
    </b-form>
  </div>
</template>

<script>
import TwitterEmbed from "./InstagramEmbed";
import FacebookEmbed from "./FacebookEmbed";
import Multiselect from "vue-multiselect";
import { log } from "util";
const axios = require("axios");
export default {
  data() {
    return {
      values: [],
      options: null
    };
  },
  components: {
    TwitterEmbed,
    FacebookEmbed,
    Multiselect
  },
  computed: {
    category() {
      return this.$store.getters.category;
    },
    labels() {
      return this.$store.getters.labels;
    },
    accounts() {
      return this.$store.getters.accounts;
    },
    index() {
      return this.$store.getters.index;
    },
    total() {
      return this.$store.getters.total;
    }
  },
  watch: {},
  methods: {
    async getAncestor(value) {
      axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.jwtToken;
      const ancestors = await axios.get(
        "http://localhost:3000/api/label/ancestors/" + value.parent_id
      );
      // remove duplicates object in array
      this.values.push(...ancestors.data);
      const unique = this.values
        .map(e => e["name"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => this.values[e])
        .map(e => this.values[e]);
      // sort array by object id
      this.values = unique.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.values.forEach((value, index) => {
        if (value.parent_id == null) {
          this.values.splice(index, 1);
        }
      });
    },
    async removeDescendents(value) {
      axios.defaults.headers.common[
        "Authorization"
      ] = this.$store.getters.jwtToken;
      const descendents = await axios.get(
        "http://localhost:3000/api/label/descendents/id/" + value.id
      );
      descendents.data.forEach(descendent => {
        for (let i = 0; i < this.values.length; i++) {
          if (descendent.id == this.values[i].id) {
            this.values.splice(i, 1);
            break;
          }
        }
      });
    },
    async goNext(){
      await this.$store.dispatch("insertLabelling", {
        reservedId:this.accounts[this.index].id,
        labels: this.values
      });
      if (this.index >= this.total-1){
        this.$store.commit("clearTotal")
        this.$store.commit("resetIndex")
        this.$router.push("/user")
      }
      else{
        await this.increateIndex()
      }
    },
    increateIndex() {
      this.$store.commit("increateIndex");
      window.location.reload(true);
    },
    decreateIndex() {
      this.$store.commit("decreateIndex");
      window.location.reload(true);
    }
  }
};
</script>

<style >
</style>

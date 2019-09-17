<template>
  <div class="assign">
    <Nav />
    <br />
    <b-container fluid>
      <b-row align-h="start">
        <b-col offset="1" cols="10">
          <b-row>
            <b-col>
              <h1>Account List</h1><p>{{channel}}, {{likedSelected}}, {{search}}, {{filter}}</p>
            </b-col>
          </b-row>
          <hr>
          <b-row align-h="between">
            <b-col>
              <h3>Filter</h3>
            </b-col>
            <b-col cols="4">
                <input type="text" v-model="search" class="form-control" id="exampleInputEmail1" placeholder="search..." aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg">
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
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row >
            <b-col >
              <b-form-group> 
                <label>
                    <h6><b>Liked count</b></h6>
                </label>
                <b-form-radio-group
                  id="radio-group-3"
                  v-model="likedSelected"
                  :options="likedCount"
                  name="radio-options-3"
                >
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row v-show="categoryLabels"> 
            <b-col cols="3">
              <label ><b>{{categoryLabels[0].name}}</b></label>
              <multiselect v-model="filter.typeOfProfile"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="select labels" :multiple="true" :options="categoryLabels[0].labels" :searchable="true" :allow-empty="true">
              </multiselect>
            </b-col>
            <b-col cols="3">
              <label ><b>{{categoryLabels[1].name}}</b></label>
              <multiselect v-model="filter.topicByBusiness"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="select labels" :multiple="true" :options="categoryLabels[1].labels" :searchable="true" :allow-empty="true">
              </multiselect>
            </b-col>
            <b-col cols="3">
              <label ><b>{{categoryLabels[2].name}}</b></label>
              <multiselect v-model="filter.interest"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="select labels" :multiple="true" :options="categoryLabels[2].labels" :searchable="true" :allow-empty="true">
              </multiselect>
            </b-col>
            <b-col cols="3">
              <label ><b>{{categoryLabels[3].name}}</b></label>
              <multiselect v-model="filter.demographicOrTarget"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="select labels" :multiple="true" :options="categoryLabels[3].labels" :searchable="true" :allow-empty="true">
              </multiselect>
            </b-col>
          </b-row>
          <br>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="10">
          <AccountsTable />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
// @ is an alias to /src
import Nav from "../components/Nav.vue"
import AccountsTable from "../components/AccountsTable.vue"
import Multiselect from 'vue-multiselect'
export default {
  data() {
    return {
      filter:{
        typeOfProfile:[],
        topicByBusiness:[],
        interest:[],
        demographicOrTarget:[]
      },
      likedCount: [
        { text: "all", value: "" },
        { text: "> 10,000", value: "10000" },
        { text: "> 50,000", value: "50000" },
        { text: "> 100,000", value: "100000" },
        { text: "> 200,000", value: "200000" },
        { text: "> 500,000", value: "500000" },
        { text: "> 1,000,000", value: "1000000" },
        { text: "> 5,000,000", value: "5000000" },
        { text: "> 10,000,000", value: "10000000" },
      ],
      channels: [
        { text: "all", value: "" },
        { text: "facebook", value: "facebook" },
        { text: "instagram", value: "instagram" },
        { text: "twitter", value: "twitter" },
        { text: "youtube", value: "youtube" }
      ],
      choice :[
        "label",
        "account"
      ],
      channel:"",
      selected:null,
      likedSelected:"",
      search:""
    }
  },
  watch:{
    search(value){
      console.log("fetching")
    },
    typeOfProfile(){
      console.log(this.categoryLabels)
    }
  },
  components :{
    AccountsTable,
    Nav,
    Multiselect
  },
  computed:{
    categoryLabels(){
      return this.$store.getters.categoryLabels;
    },
    typeOfProfile(){
      return this.filter.typeOfProfile
    },
    topicByBusiness(){
      return this.filter.topicByBusiness
    },
    interest(){
      return this.filter.interest
    },
    demographicOrTarget(){
      return this.filter.demographicOrTarget
    }
  },
  created(){
    this.fetchCategoryLabels();
  },
  methods:{
    fetchCategoryLabels() {
      this.$store.dispatch("fetchLabelsCategory")
    }
  }
}
</script>

<style lang="scss" >
input {
  margin: 5px;
}
</style>

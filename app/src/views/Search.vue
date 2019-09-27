<template>
  <div class="assign">
    <Nav />
    <br />
    <b-container fluid>
      <b-row align-h="start">
        <b-col offset="1" cols="10">
          <b-row>
            <b-col>
              <h3>Account List</h3>
            </b-col>
          </b-row>
          <hr>
          <b-row>
            <b-col>
              <b-form-group>
                <label>
                    <h6><b>Channel</b></h6>
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
          <!-- <b-row >
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
          </b-row> -->
          <b-row>
            <b-col cols="6">
              <b-form-group> 
                <label>
                  <h6><b>Liked count</b></h6>
                </label>
                <b-row>
                  <b-col cols="3">
                    <b-form-input type="number" v-model="minLikedCount" placeholder="Min"></b-form-input>
                  </b-col>
                  <img src="https://img.icons8.com/material/24/000000/minus--v3.png">
                  <b-col cols="3">
                    <b-form-input type="number" v-model="maxLikedCount" placeholder="Max"></b-form-input>
                  </b-col>
                </b-row>
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
              <multiselect @remove="fetchAccountsFilter" v-model="filter.interest"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="select labels" :multiple="true" :options="categoryLabels[2].labels" :searchable="true" :allow-empty="true">
              </multiselect>
            </b-col>
            <b-col cols="3">
              <label ><b>{{categoryLabels[3].name}}</b></label>
              <multiselect @remove="fetchAccountsFilter" v-model="filter.demographicOrTarget"  deselect-label="Can't remove this value" track-by="name" label="name" placeholder="select labels" :multiple="true" :options="categoryLabels[3].labels" :searchable="true" :allow-empty="true">
              </multiselect>
            </b-col>
          </b-row>
          <br>
          <b-row align-h="start">
            <b-col cols="4">
                <b-form-input v-model="search" id="`type-text`" type="text" placeholder="search...">
                </b-form-input>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-col cols="12">
              <AccountsTable :channel="channel" :minLiked="minLikedCount" :maxLiked="maxLikedCount" :like="likedSelected"/>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
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
        { text: "all", value: 0 },
        { text: "> 10,000", value: 10000 },
        { text: "> 50,000", value: 50000 },
        { text: "> 100,000", value: 100000 },
        { text: "> 200,000", value: 200000 },
        { text: "> 500,000", value: 500000 },
        { text: "> 1,000,000", value: 1000000 },
        { text: "> 5,000,000", value: 5000000 },
        { text: "> 10,000,000", value: 10000000 },
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
      likedSelected:0,
      search:"",
      selectedLabels: [],
      nextRequestId: 1,
      minLikedCount:null,
      maxLikedCount:null
    }
  },
  watch:{
    search(value){ 
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.fetchAccountsFilter()
      }, 1000);
        
    },
    typeOfProfile(){
      this.fetchAccountsFilter()
    },
    topicByBusiness(){
      this.fetchAccountsFilter()
    },
    interest(){
      this.fetchAccountsFilter()
    },
    demographicOrTarget(){
      this.fetchAccountsFilter()
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
      return this.filter.typeOfProfile;
    },
    topicByBusiness(){
      return this.filter.topicByBusiness;
    },
    interest(){
      return this.filter.interest;
    },
    demographicOrTarget(){
      return this.filter.demographicOrTarget;
    } 
  },
  created(){
    this.fetchCategoryLabels();
  },
  methods:{
    fetchAccountsFilter(){
      this.selectedLabels = [...this.typeOfProfile, ...this.topicByBusiness, ...this.interest, ...this.demographicOrTarget]
      const payload = {
        labels: {
          typeOfProfile : this.typeOfProfile,
          topicByBusiness : this.topicByBusiness,
          interest : this.interest,
          demographicOrTarget : this.demographicOrTarget
        },
        search : this.search 
      }
      console.log(payload)
      this.$store.dispatch("fetchAccountsFilter", payload);
    },
    fetchCategoryLabels() {
      this.$store.dispatch("fetchLabelsCategory")
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 3px; 
}
input[type="text"],input[type="number"] {
  margin-bottom: 0.15rem;
  margin-top: 0.15rem;
  border: 1px solid #e8e9e8;
  border-radius : 5px;
  font-family: inherit;
  font-size: 15px;
  padding: 20px 10px;
  line-height: 28px; 
}
input::placeholder {
  color: #b1b1b1
}

</style>

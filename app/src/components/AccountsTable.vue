<template>
  <div>
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th v-for="(item, index) in fields" :key="index" scope="col">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(account, index) in accountLabelling" :key="index" v-show="CheckFilter(account.account.channel.channel_name, account.account.like_count)">
          <td>{{account.account.account_id}}</td>
          <td>{{account.account.account_name}}</td>
          <td>
            <tagSocial :channel="account.account.channel.channel_name"></tagSocial>
          </td>
          <td>{{account.account.like_count}}</td>
          <td >
            <tagLabel
            v-for="(accountLabellings, index) in account.account_labellings"
            :key="index" :labelName="accountLabellings.label.name"
            :level="accountLabellings.label.category_group"></tagLabel>
          </td>
        </tr>
      </tbody>
      
    </table>
  </div>
</template>
<script>
import tagSocial from "../components/TagSocialmedia.vue"
import tagLabel from "../components/Label.vue"
export default {
  data() {
    return{
      fields: ["Account id", "Account name", "Channel", "Liked count", "Labels"],
    }
  },
  created(){
    this.fetchAccounts();
  },
  components: {
    tagSocial,
    tagLabel
  },
  props:{
    channel:String,
    like:Number,
    minLiked: String,
    maxLiked: String
  },
  computed:{
    accountLabelling(){
      return this.$store.getters.accountLabelling;
    }
  },
  methods:{
    fetchAccounts(){
      this.$store.dispatch("fetchAccounts")
    },
    CheckFilter(accountChannel, accountLike) {
      let render = true
      if(this.channel && this.minLiked && this.maxLiked){
        if(accountLike < this.minLiked || accountLike > this.maxLiked || this.channel != accountChannel) render = false
      }
      else if(this.minLiked && this.maxLiked){
        if(accountLike < this.minLiked || accountLike > this.maxLiked) render = false
      }
      else if(this.minLiked) {
        if(accountLike < this.minLiked) render = false;
      }
      else if(this.maxLiked) {
        if(accountLike > this.minLiked) render = false;
      }
      return render
    }
  }
}
</script>
<style lang="scss" scope>

</style>